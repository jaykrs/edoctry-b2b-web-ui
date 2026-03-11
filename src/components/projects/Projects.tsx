"use client";
import React, { useEffect, useState } from "react";
import { PencilIcon, DocsIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";
import { Phone, RefreshCw } from "lucide-react";
import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableRow, TableBody } from "../ui/table";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnLink,
  BtnBulletList,
  BtnNumberedList,
  BtnUndo,
  BtnRedo
} from "react-simple-wysiwyg";


interface UpdateLog {
  date: string;
  log: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  budget: string;
  owner: string;
  assets: string;
  status: string;
  updates: UpdateLog[];
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdates, setSelectedUpdates] = useState<UpdateLog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const [newUpdate, setNewUpdate] = useState({
    date: "",
    log: "",
    status: "",
  });


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    owner: "",
    assets: "",
    status: "",
  });

  useEffect(() => {
    if (showUpdateModal || showModal) {
      document.body.classList.add("hide-app-layout");
    } else {
      document.body.classList.remove("hide-app-layout");
    }
    return () => document.body.classList.remove("hide-app-layout");
  }, [showUpdateModal, showModal]);

  useEffect(() => {
    fetchProjectsList();
  }, []);

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const fetchProjectsList = async () => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;
      if (!vendorid || !jwt) return;

      const res = await fetch(
        `${apiUrl}/api/projects?filters[vendorId][$eq]=${vendorid}`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const data = await res.json();

      const list: Project[] = data.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        budget: item.attributes.budget,
        owner: item.attributes.owner,
        assets: item.attributes.assets,
        status: item.attributes.status,
        updates: item.attributes.jsondata || [],
      }));

      setProjects(list);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const openAddModal = () => {
    setEditingProjectId(null);
    setIsEditable(true);
    setFormData({
      name: "",
      description: "",
      budget: "",
      owner: "",
      assets: "",
      status: "",
    });
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProjectId(project.id);
    setIsEditable(false);
    setFormData({
      name: project.name,
      description: Array.isArray(project.description)
        ? project.description
          .map((block: any) =>
            block.children?.map((child: any) => child.text).join("")
          )
          .join("\n")
        : "",
      budget: project.budget,
      owner: project.owner,
      assets: project.assets,
      status: project.status,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;

      const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
      const vendorId = staffData?.data?.[0]?.attributes?.vendoruuid;

      const payload = {
        name: formData.name,

        description: formData.description
          ? [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: formData.description,
                },
              ],
            },
          ]
          : [],

        budget: formData.budget,
        owner: formData.owner,
        assets: formData.assets,
        vendorId,
        status: formData.status || "pending",
      };

      const url =
        editingProjectId === null
          ? `${apiUrl}/api/projects`
          : `${apiUrl}/api/projects/${editingProjectId}`;

      const method = editingProjectId === null ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ data: payload }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.log("Strapi error:", error);
        return;
      }

      setShowModal(false);
      setEditingProjectId(null);
      setIsEditable(false);
      fetchProjectsList();
    } catch (err) {
      console.error("Save error:", err);
    }
  };


  const handleSaveUpdate = async () => {
    try {
      if (!activeProjectId) return;

      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;

      if (!newUpdate.date || !newUpdate.log) {
        alert("Date and Update Notes are required");
        return;
      }

      const updatedLogs = [
        ...selectedUpdates,
        {
          date: newUpdate.date,
          log: newUpdate.log,
        },
      ];

      const res = await fetch(
        `${apiUrl}/api/projects/${activeProjectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              jsondata: updatedLogs,          
              status: newUpdate.status || "pending", 
            },
          }),
        }
      );

      if (!res.ok) return;

      fetchProjectsList();
      setSelectedUpdates(updatedLogs);
      setNewUpdate({ date: "", log: "", status: "" });

    } catch (err) {
      console.error(err);
    }
  };




  return (
    <div>
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="All Projects"
          icon="📁"
          buttonprops={{
            buttonText: "+",
            title: "Add Project",
            onClick: openAddModal,
            content: "Here you can Add projects.",
          }}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>

              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Name
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Owner
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Assets
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Budget
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Updates
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    <PencilIcon />
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {projects.map((project) => (
                  <TableRow key={project.id}>

                    {/* Name */}
                    <TableCell className="px-5 py-6 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-lg">
                          <img
                            src={`https://ui-avatars.com/api/?name=${project.name}&background=random`}
                            alt={project.name}
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {project.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <span className="text-xs">{project.status}</span>
                    </TableCell>

                    {/* Owner */}
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <span className="font-bold text-blue-600">{project.owner}</span>
                    </TableCell>

                    {/* Assets */}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.assets}
                    </TableCell>

                    {/* Budget */}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.budget}
                    </TableCell>

                    {/* Updates Button */}
                    <TableCell>
                      <button
                        onClick={() => {
                          setSelectedUpdates(project.updates);
                          setActiveProjectId(project.id);

                          setNewUpdate({
                            date: getTodayDate(),
                            log: "",
                            status: project.status || "pending",
                          });

                          setShowUpdateModal(true);
                        }}
                        className="ps-6 flex justify-end text-green-600 hover:text-green-800"
                      >
                        <Phone size={14} />
                      </button>
                    </TableCell>

                    {/* Edit Button */}
                    <TableCell>
                      <button
                        onClick={() => openEditModal(project)}
                        className="ps-6 flex justify-end text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        <PencilIcon />
                      </button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* PROJECT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">

          {/* Modal Container */}
          <div className="bg-[#ffffff] rounded-2xl shadow w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            {/* Inner Padding Wrapper */}
            <div className="p-6">

              {/* EDIT / SAVE ICON */}
              <div className="flex justify-end items-center mt-6">
                {editingProjectId !== null && !isEditable ? (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="flex justify-center items-center w-20 px-4 py-2 bg-[#2143BE] text-white hover:bg-[#4E6CDA] rounded-2xl text-center"
                  >
                    <PencilIcon />
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="hidden justify-center items-center w-20 px-4 py-2 bg-[#4E6CDA] text-white hover:bg-[#2143BE] rounded-2xl text-center"
                  >
                    <DocsIcon />
                  </button>
                )}
              </div>

              {/* FORM */}
              <div className="bg-[#DDE6FA] p-6 md:p-10 rounded-3xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                {/* NAME */}
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">
                    Project Name
                  </h3>
                  <input
                    type="text"
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                      } rounded-xl p-2 mb-3`}
                    value={formData.name}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                {/* OWNER */}
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">
                    Owner
                  </h3>
                  <input
                    type="text"
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                      } rounded-xl p-2 mb-3`}
                    value={formData.owner}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setFormData({ ...formData, owner: e.target.value })
                    }
                  />
                </div>

                {/* BUDGET */}
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">
                    Budget
                  </h3>
                  <input
                    type="text"
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                      } rounded-xl p-2 mb-3`}
                    value={formData.budget}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                  />
                </div>

                {/* ASSETS */}
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">
                    Assets
                  </h3>
                  <input
                    type="text"
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                      } rounded-xl p-2 mb-3`}
                    value={formData.assets}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setFormData({ ...formData, assets: e.target.value })
                    }
                  />
                </div>

                {/* STATUS */}
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">
                    Status
                  </h3>
                  <select
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                      } rounded-xl p-2 mb-3`}
                    value={formData.status}
                    disabled={!isEditable}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="initial">Initial</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="hold">Hold</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                  <h3 className="text-gray-700 text-base font-bold pb-2">
                    Description
                  </h3>

                  <EditorProvider>
                    <div className={`border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl mb-3`}>
                      <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnLink />
                        <BtnBulletList />
                        <BtnNumberedList />
                        <BtnUndo />
                        <BtnRedo />
                      </Toolbar>

                      <Editor
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="min-h-[150px] px-3 py-2"
                        disabled={!isEditable}
                      />
                    </div>
                  </EditorProvider>
                </div>

              </div>

              {/* FOOTER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingProjectId(null);
                    setIsEditable(false);
                  }}
                  className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl"
                >
                  Cancel
                </button>

                {editingProjectId !== null && !isEditable ? (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl"
                  >
                    Save
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* UPDATE MODAL */}
      {showUpdateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto p-4"
          onClick={() => setShowUpdateModal(false)}
        >

          {/* Modal Container */}
          <div
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header (Fixed) */}
            <div className="flex justify-between items-center px-6 py-4 border-b shrink-0">
              <h2 className="text-lg font-semibold text-gray-700">
                Project Updates
              </h2>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => fetchProjectsList()}
                  className="text-gray-500 hover:text-blue-600"
                  title="Refresh"
                >
                  <RefreshCw size={16} />
                </button>

                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-gray-500 hover:text-red-500"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body Scroll Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-y-auto">

              {/* LEFT SIDE */}
              <div className="border-r p-5 flex flex-col">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                  Previous Updates
                </h3>

                <div className="flex-1 overflow-y-auto pr-2">
                  {selectedUpdates.length === 0 ? (
                    <div className="text-sm text-gray-400">
                      No updates found
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedUpdates.map((item, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-xl bg-gray-100"
                        >
                          <div className="text-xs text-gray-500">
                            {item.date}
                          </div>
                          <div className="text-sm text-gray-700">
                            {item.log}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="p-5">
                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                  Add New Update
                </h3>

                <div className="space-y-4">

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-xs text-gray-500 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full border rounded-xl px-3 py-2 text-sm"
                        value={newUpdate.date}
                        onChange={(e) =>
                          setNewUpdate({ ...newUpdate, date: e.target.value })
                        }
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-xs text-gray-500 mb-1">
                        Status
                      </label>
                      <select
                        className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none"
                        value={newUpdate.status}
                        onChange={(e) =>
                          setNewUpdate({ ...newUpdate, status: e.target.value })
                        }
                      >
                        <option value="">Choose here</option>
                        <option value="initial">Initial</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="hold">Hold</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Update Notes
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Enter update details..."
                      className="w-full border rounded-xl px-3 py-2 text-sm"
                      value={newUpdate.log}
                      onChange={(e) =>
                        setNewUpdate({ ...newUpdate, log: e.target.value })
                      }
                    />
                  </div>

                  <button
                    onClick={handleSaveUpdate}
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                  >
                    Save Update
                  </button>

                </div>
              </div>

            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default Projects;
