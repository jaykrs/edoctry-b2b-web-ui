"use client";
import React, { useEffect, useState } from "react";
import { PencilIcon, DocsIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";
import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableRow, TableBody } from "../ui/table";

interface Task {
    id: number;
    name: string;
    description: any;
    status: string;
    assignee: string;
    startdt: string;
    days: number;
    enddt: string;
    assets: string;
    projectid: string;
    comments: any;
}

function Tasks() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [isEditable, setIsEditable] = useState(true);
    const [projectsList, setProjectsList] = useState<any[]>([]);
    const [staffList, setStaffList] = useState<any[]>([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedComments, setSelectedComments] = useState<any[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
    const [newComment, setNewComment] = useState({
        date: "",
        log: "",
    });
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "",
        assignee: "",
        startdt: "",
        days: "",
        enddt: "",
        assets: "",
        projectid: "",
        comments: "",
    });

    useEffect(() => {
        fetchTasks();
        fetchProjectsDropdown();
        fetchStaffDropdown();
    }, []);


    const getVendorData = () => {
        const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
        const vendorId = staffData?.data?.[0]?.attributes?.vendoruuid;
        const jwt = localStorage.getItem("jwt");
        return { vendorId, jwt };
    };

    const fetchProjectsDropdown = async () => {
        const { vendorId, jwt } = getVendorData();
        if (!vendorId || !jwt) return;

        const res = await fetch(
            `${apiUrl}/api/projects?filters[vendorId][$eq]=${vendorId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );

        const data = await res.json();

        setProjectsList(data.data);
    };

    const fetchStaffDropdown = async () => {
        const { vendorId, jwt } = getVendorData();
        if (!vendorId || !jwt) return;

        const res = await fetch(
            `${apiUrl}/api/vendostaffs?filters[vendoruuid][$eq]=${vendorId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );

        const data = await res.json();
        console.log("Fetched Staff List:", data);
        setStaffList(data.data);
    };

    // GET WITH VENDOR FILTER
    const fetchTasks = async () => {
        const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
        const vendorId = staffData?.data?.[0]?.attributes?.vendoruuid;
        const jwt = localStorage.getItem("jwt");
        if (!vendorId || !jwt) return;

        const res = await fetch(
            `${apiUrl}/api/tasks?filters[vendorId][$eq]=${vendorId}`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );

        const data = await res.json();

        const list = data.data.map((item: any) => ({
            id: item.id,
            ...item.attributes,
        }));

        setTasks(list);
    };

    // BLOCKS FORMATTER
    const convertToBlocks = (text: string) => {
        if (!text) return [];
        return [
            {
                type: "paragraph",
                children: [
                    {
                        type: "text",
                        text,
                    },
                ],
            },
        ];
    };

    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };


    const parseBlocksToArray = (blocks: any) => {

        if (!Array.isArray(blocks)) return [];

        const arr: any[] = [];

        for (let i = 0; i < blocks.length; i += 2) {

            arr.push({
                log: blocks[i]?.children?.[0]?.text || "",
                date: blocks[i + 1]?.children?.[0]?.text || ""
            });

        }

        return arr;
    };


    const convertArrayToBlocks = (arr: any[]) => {

        const blocks: any[] = [];

        arr.forEach(item => {

            blocks.push({
                type: "paragraph",
                children: [
                    { type: "text", text: item.log }
                ]
            });

            blocks.push({
                type: "paragraph",
                children: [
                    { type: "text", text: item.date }
                ]
            });

        });

        return blocks;

    };
    // comments
    const handleSaveComment = async () => {

        const jwt = localStorage.getItem("jwt");
        if (!jwt || !activeTaskId) return;

        if (!newComment.log || !newComment.date) {
            alert("Required");
            return;
        }

        const existingArray = [...selectedComments];

        existingArray.push({
            log: newComment.log,
            date: newComment.date
        });

        const blocksData = convertArrayToBlocks(existingArray);

        await fetch(`${apiUrl}/api/tasks/${activeTaskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                data: {
                    comments: blocksData
                }
            })
        });

        fetchTasks();

        setSelectedComments(existingArray);

        setNewComment({
            date: "",
            log: ""
        });

    };
    // SAVE
    const handleSave = async () => {
        const jwt = localStorage.getItem("jwt");
        const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
        const vendorId = staffData?.data?.[0]?.attributes?.vendoruuid;
        if (!jwt || !vendorId) return;

        const payload = {
            name: formData.name,
            description: convertToBlocks(formData.description),
            comments: convertToBlocks(formData.comments),
            status: formData.status,
            assignee: formData.assignee,
            startdt: formData.startdt,
            days: formData.days ? Number(formData.days) : 0,
            enddt: formData.enddt,
            assets: formData.assets,
            projectid: formData.projectid ? formData.projectid.toString() : "",
            vendorId: vendorId.toString(),
        };

        const url =
            editingTaskId === null
                ? `${apiUrl}/api/tasks`
                : `${apiUrl}/api/tasks/${editingTaskId}`;

        const method = editingTaskId === null ? "POST" : "PUT";

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: payload }),
        });

        setShowModal(false);
        setEditingTaskId(null);
        fetchTasks();
    };

    return (
        <div>

            {/* HEADER */}
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="All Tasks"
                    icon="📝"
                    buttonprops={{
                        buttonText: "+",
                        title: "Add Task",
                        onClick: () => {
                            setEditingTaskId(null);
                            setIsEditable(true);
                            setFormData({
                                name: "",
                                description: "",
                                status: "",
                                assignee: "",
                                startdt: "",
                                days: "",
                                enddt: "",
                                assets: "",
                                projectid: "",
                                comments: "",
                            });
                            setShowModal(true);
                        },
                    }}
                />
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>

                            {/* Table Header */}
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Name & Assignee
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Status
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Start / Days
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Project ID
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        End Date
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
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>

                                        {/* Name + Assignee */}
                                        <TableCell className="px-5 py-6 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-lg">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${task.name}&background=random`}
                                                        alt={task.name}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {task.name}
                                                    </span>
                                                    <span className="block text-xs text-gray-500">
                                                        {task.assignee}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <span className="text-xs">{task.status}</span>
                                        </TableCell>

                                        {/* Start Date + Days */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <span className="block">{task.startdt}</span>
                                            <span className="text-xs text-gray-400">
                                                {task.days} days
                                            </span>
                                        </TableCell>

                                        {/* Project ID */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {task.projectid}
                                        </TableCell>

                                        {/* End Date */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {task.enddt}
                                        </TableCell>
                                        {/* Comments */}
                                        <TableCell>

                                            <button
                                                onClick={() => {

                                                    setActiveTaskId(task.id);

                                                    const parsed = parseBlocksToArray(task.comments);

                                                    setSelectedComments(parsed);

                                                    setNewComment({
                                                        date: getTodayDate(),
                                                        log: ""
                                                    });

                                                    setShowUpdateModal(true);

                                                }}
                                                className="ps-6 flex justify-end text-green-600 hover:text-green-800"
                                            >
                                                💬
                                            </button>

                                        </TableCell>
                                        {/* Edit Button */}
                                        <TableCell>
                                            <button
                                                onClick={() => {
                                                    setEditingTaskId(task.id);
                                                    setIsEditable(true);
                                                    setFormData({
                                                        name: task.name || "",
                                                        status: task.status || "",
                                                        assignee: task.assignee || "",
                                                        startdt: task.startdt || "",
                                                        days: task.days ? task.days.toString() : "",   
                                                        enddt: task.enddt || "",
                                                        assets: task.assets || "",
                                                        projectid: task.projectid || "",
                                                        description:
                                                            task.description?.[0]?.children?.[0]?.text || "",
                                                        comments:
                                                            task.comments?.[0]?.children?.[0]?.text || "",
                                                    });

                                                    setShowModal(true);
                                                }}
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

            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">

                    {/* Modal Container */}
                    <div className="bg-[#ffffff] rounded-2xl shadow w-full max-w-4xl max-h-[90vh] overflow-y-auto">

                        <div className="p-6">

                            {/* EDIT / SAVE ICON */}
                            <div className="flex justify-end items-center mt-6">
                                {editingTaskId !== null && !isEditable ? (
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
                                        Task Name
                                    </h3>
                                    <input
                                        type="text"
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.name}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                </div>

                                {/* ASSIGNEE */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Assignee
                                    </h3>

                                    <select
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.assignee}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, assignee: e.target.value })
                                        }
                                    >
                                        <option value="">Select Assignee</option>

                                        {Array.isArray(staffList) &&
                                            staffList.map((staff: any) => (
                                                <option key={staff.id} value={staff.attributes?.name}>
                                                    {staff.attributes?.name}
                                                </option>
                                            ))}

                                    </select>
                                </div>


                                {/* START DATE */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Start Date
                                    </h3>
                                    <input
                                        type="date"
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.startdt}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, startdt: e.target.value })
                                        }
                                    />
                                </div>

                                {/* DAYS */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Days
                                    </h3>
                                    <input
                                        type="number"
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.days}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, days: e.target.value })
                                        }
                                    />
                                </div>

                                {/* END DATE */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        End Date
                                    </h3>
                                    <input
                                        type="date"
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.enddt}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, enddt: e.target.value })
                                        }
                                    />
                                </div>

                                {/* PROJECT */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Project
                                    </h3>

                                    <select
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.projectid}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, projectid: e.target.value })
                                        }
                                    >
                                        <option value="">Select Project</option>

                                        {projectsList.map((project: any) => (
                                            <option key={project.id} value={project.id.toString()}>
                                                {project.attributes.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                {/* STATUS */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Status
                                    </h3>
                                    <select
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.status}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, status: e.target.value })
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="ongoing">TO-DO</option>
                                        <option value="ongoing">ongoing</option>
                                        <option value="completed">completed</option>
                                        <option value="pending">pending</option>
                                        <option value="hold">hold</option>
                                        <option value="cancelled">cancelled</option>
                                    </select>
                                </div>

                                {/* ASSETS */}
                                <div>
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Assets
                                    </h3>
                                    <input
                                        type="text"
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.assets}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, assets: e.target.value })
                                        }
                                    />
                                </div>

                                {/* DESCRIPTION (Rich Text) */}
                                <div className="md:col-span-2">
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Description
                                    </h3>

                                    <textarea
                                        rows={4}
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.description}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                    />
                                </div>

                                {/* COMMENTS (Rich Text) */}
                                <div className="md:col-span-2">
                                    <h3 className="text-gray-700 text-base font-bold pb-2">
                                        Comments
                                    </h3>

                                    <textarea
                                        rows={4}
                                        className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                                        value={formData.comments}
                                        disabled={!isEditable}
                                        onChange={(e) =>
                                            setFormData({ ...formData, comments: e.target.value })
                                        }
                                    />
                                </div>

                            </div>

                            {/* FOOTER */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingTaskId(null);
                                        setIsEditable(false);
                                    }}
                                    className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl"
                                >
                                    Cancel
                                </button>

                                {editingTaskId !== null && !isEditable ? (
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
            {showUpdateModal && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-auto p-4"
                    onClick={() => setShowUpdateModal(false)}
                >

                    <div
                        className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] shadow-xl flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}

                        <div className="flex justify-between items-center px-6 py-4 border-b">

                            <h2 className="text-lg font-semibold text-gray-700">
                                Task Updates
                            </h2>

                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>


                        {/* Body */}

                        <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-y-auto">


                            {/* LEFT */}

                            <div className="border-r p-5">

                                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                                    Previous Updates
                                </h3>

                                {selectedComments.length === 0 ? (

                                    <div className="text-sm text-gray-400">
                                        No updates
                                    </div>

                                ) :

                                    (

                                        <div className="space-y-4">

                                            {selectedComments.map((item, index) => (

                                                <div
                                                    key={index}
                                                    className="p-3 rounded-xl bg-gray-100"
                                                >

                                                    <div className="text-sm text-gray-700">
                                                        {item.log}
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        {item.date}
                                                    </div>

                                                </div>

                                            ))}

                                        </div>

                                    )}

                            </div>



                            {/* RIGHT */}


                            <div className="p-5">

                                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                                    Add New Update
                                </h3>


                                <div className="space-y-4">


                                    <div>

                                        <label className="text-xs text-gray-500">
                                            Date
                                        </label>

                                        <input
                                            type="date"
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                            value={newComment.date}
                                            onChange={(e) =>
                                                setNewComment({ ...newComment, date: e.target.value })
                                            }
                                        />

                                    </div>


                                    <div>

                                        <label className="text-xs text-gray-500">
                                            Update Notes
                                        </label>

                                        <textarea
                                            rows={5}
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                            value={newComment.log}
                                            onChange={(e) =>
                                                setNewComment({ ...newComment, log: e.target.value })
                                            }
                                        />

                                    </div>


                                    <button
                                        onClick={handleSaveComment}
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

export default Tasks;
