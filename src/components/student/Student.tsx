"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, EyeIcon, DocsIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
    active: boolean;
    address: string;
    biography: string;
    courses: string;
    dob: string;
    email: string;
    phone: string;
    qualification: string;
    remarks: string;
    skills: string;
    smedia: string;
    paymentSummery: string;
    subscribeDomain: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

export default function Student() {
  const [studentList, setStudentList] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    website: "",
    avatar: "",
    gstin: "",
    active: true,
    address: "",
    biography: "",
    courses: "",
    dob: "",
    email: "",
    phone: "",
    qualification: "",
    remarks: "",
    skills: "",
    smedia: "",
    paymentSummery: "",
    subscribeDomain: "",
  });

  useEffect(() => {
    fetchStudentList();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("hide-app-layout");
    } else {
      document.body.classList.remove("hide-app-layout");
    }
    return () => document.body.classList.remove("hide-app-layout");
  }, [showModal]);

  const fetchStudentList = async () => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (vendorid && jwt) {
        const res = await fetch(
          `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await res.json();
        const tableData: Order[] = data.data.map((item: any, index: number) => ({
          id: item.id || index + 1,
          user: {
            image: item.attributes.avatar || "/images/user/user-22.jpg",
            name: item.attributes.name || "N/A",
            role: item.attributes.role || "Student",
            active: item.attributes.active || false,
            address: item.attributes.address || "",
            biography: item.attributes.biography || "",
            courses: item.attributes.courses || "",
            dob: item.attributes.dob || "",
            email: item.attributes.email || "",
            phone: item.attributes.phone || "",
            qualification: item.attributes.qualification || "",
            remarks: item.attributes.remarks || "",
            skills: item.attributes.skills || "",
            smedia: item.attributes.smedia || "",
            paymentSummery: item.attributes.paymentSummery || "",
            subscribeDomain: item.attributes.subscribeDomain || "",
          },
          projectName: item.attributes.website || "N/A",
          team: {
            images: [item.attributes.avatar || "/images/user/user-22.jpg"],
          },
          status: item.attributes.active ? "Active" : "Inactive",
          budget: item.attributes.gstin || "0.0K",
        }));

        setStudentList(tableData);
      }
    } catch (error) {
      console.error("Failed to fetch student list:", error);
    }
  };

  const openAddModal = () => {
    setEditingStudentId(null);
    setIsEditable(true);
    setFormData({
      name: "",
      role: "",
      website: "",
      avatar: "",
      gstin: "",
      active: true,
      address: "",
      biography: "",
      courses: "",
      dob: "",
      email: "",
      phone: "",
      qualification: "",
      remarks: "",
      skills: "",
      smedia: "",
      paymentSummery: "",
      subscribeDomain: "",
    });
    setShowModal(true);
  };

  const openEditModal = (student: Order) => {
    setEditingStudentId(student.id);
    setIsEditable(false);
    setFormData({
      name: student.user.name,
      role: student.user.role,
      website: student.projectName,
      avatar: student.user.image,
      gstin: student.budget,
      active: student.user.active,
      address: student.user.address,
      biography: student.user.biography,
      courses: student.user.courses,
      dob: student.user.dob,
      email: student.user.email,
      phone: student.user.phone,
      qualification: student.user.qualification,
      remarks: student.user.remarks,
      skills: student.user.skills,
      smedia: student.user.smedia,
      paymentSummery: student.user.paymentSummery,
      subscribeDomain: student.user.subscribeDomain,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;

      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;
      if (!vendoruuid) return;

      const url =
        editingStudentId === null
          ? `${apiUrl}/api/students`
          : `${apiUrl}/api/students/${editingStudentId}`;

      const method = editingStudentId === null ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            role: formData.role,
            website: formData.website,
            avatar: formData.avatar,
            gstin: formData.gstin,
            active: formData.active,
            vendoruuid,
            address: formData.address,
            biography: formData.biography,
            courses: formData.courses,
            dob: formData.dob,
            email: formData.email,
            phone: formData.phone,
            qualification: formData.qualification,
            remarks: formData.remarks,
            skills: formData.skills,
            smedia: formData.smedia,
            paymentSummery: formData.paymentSummery,
            subscribeDomain: formData.subscribeDomain,
          },
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setEditingStudentId(null);
        fetchStudentList();
      } else {
        console.error("Save failed");
      }
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  return (
    <div className="">
      {!showModal && (
        <div className="flex justify-between items-center p-10 bg-gradient-to-b from-[#EEEDF4] to-[#DBDAE5] rounded-t-2xl">
          <h1 className="text-4xl uppercase text-gray-700 pb-2 font-bold ">
            <span className="text-[#2143BE] border-b-4 border-red-500">All</span> Students
          </h1>
          <button
            onClick={openAddModal}
            className="bg-[#2143BE] text-white text-2xl px-4 py-2 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
          >
            <Pencil />
          </button>
        </div>
      )}

      {/* Student List */}
      <ul className="space-y-4  p-4 pt-4">
        {studentList.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center border-b border-[#2143BE] py-5 px-4 shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300 rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${student.user.name}&background=random`}
                width={40}
                height={40}
                alt={student.user.name}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{student.user.name}</p>
                <p className="text-sm text-gray-500">{student.user.role}</p>
              </div>
            </div>
            {/* all data for future use */}
            {/* <div>
              <p>{student.user.active ? "Active" : "Inactive"}</p>
              <p className="text-sm text-gray-500">{student.user.address ? student.user.address : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.biography ? student.user.biography : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.courses ? student.user.courses : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.dob ? student.user.dob : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.email ? student.user.email : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.phone ? student.user.phone : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.qualification ? student.user.qualification : "N/A"}</p>
              <p className="text-sm text-gray-500">{student.user.remarks ? student.user.remarks : "N/A"}</p>

            </div> */}
            {/* end */}
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(student)}
                className="bg-[#2143BE] text-white px-3 py-1 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
              >
                <EyeIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto   ">
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4  rounded-3xl">
              <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                <h2 className="text-2xl font-semibold mb-2">{editingStudentId ? "Edit Student Information ?" : "Add Student Details ?"}</h2>
                <p className="text-sm text-blue-100 mb-6">
                  {editingStudentId ? "Update Student Details to keep your Profile Accurate" : "Stay organized by keeping all student information in one place."}

                </p>

                <div className="flex items-center justify-center max-w-md mx-auto bg-white rounded-full p-1 shadow-md">
                  <input
                    type="email"
                    placeholder="youremail@address.com"
                    className="flex-grow px-4 py-2 rounded-full text-gray-700 outline-none"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition">
                    ➜
                  </button>
                </div>
              </div>
            </div>
            {/* end */}
            <div className="flex justify-end items-center mt-6">
              {editingStudentId !== null && !isEditable ? (
                <button
                  onClick={() => setIsEditable(true)}
                  className="flex justify-center items-center w-20 px-4 py-2 bg-[#2143BE] text-white hover:bg-[#4E6CDA] rounded-2xl text-center"
                >
                  <Pencil /> 
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="flex justify-center items-center w-20 px-4 py-2 bg-[#4E6CDA] text-white hover:bg-[#2143BE] rounded-2xl text-center"
                >
                  <DocsIcon />
                </button>

              )}
            </div>

            {/* form div */}
            <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Name */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Name</h3>
                <input
                  type="text"
                  placeholder="Name"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.name}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Email</h3>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.email}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Vendor UUID - Readonly */}
              {/* <div>
    <h3 className="text-gray-700 text-base font-bold pb-2">Vendor UUID</h3>
    <input
      type="text"
      readOnly
      className="w-full border-2 bg-gray-200 rounded-xl p-2 mb-3"
      value={formData.vendoruuid}
    />
  </div> */}

              {/* Phone */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Phone</h3>
                <input
                  type="tel"
                  placeholder="Phone"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.phone}
                  disabled={!isEditable}

                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Skills</h3>
                <input
                  type="text"
                  placeholder="Skills (comma separated)"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.skills}
                  disabled={!isEditable}

                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>

              {/* Qualification */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Qualification</h3>
                <input
                  type="text"
                  placeholder="Qualification"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.qualification}
                  disabled={!isEditable}

                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                />
              </div>

              {/* Avatar */}
              {/* <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Avatar URL</h3>
                <input
                  type="text"
                  placeholder="Avatar"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
              </div> */}

              {/* Active */}
              <div className="flex items-center mt-8">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={formData.active}
                  disabled={!isEditable}

                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
                <label className="text-gray-700">Active</label>
              </div>

              {/* Remarks */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Remarks</h3>
                <input
                  type="text"
                  placeholder="Remarks"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.remarks}
                  disabled={!isEditable}

                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>

              {/* Address */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Address</h3>
                <textarea
                  placeholder="Address"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.address}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Social Media</h3>
                <input
                  type="text"
                  placeholder="Social media links"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.smedia}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, smedia: e.target.value })}
                />
              </div>

              {/* Payment Summary */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Payment Summary</h3>
                <textarea
                  placeholder="Payment summary"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.paymentSummery}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, paymentSummery: e.target.value })}
                />
              </div>

              {/* Courses */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Courses</h3>
                <input
                  type="text"
                  placeholder="Courses"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.courses}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                />
              </div>

              {/* Subscribe Domain */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Subscribe Domain</h3>
                <input
                  type="text"
                  placeholder="Subscribed Domain"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.subscribeDomain}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, subscribeDomain: e.target.value })}
                />
              </div>

              {/* DOB */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Date of Birth</h3>
                <input
                  type="date"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.dob}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>

              {/* Biography */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Biography</h3>
                <textarea
                  placeholder="Biography"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.biography}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                />
              </div>
            </div>




            {/* form end */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">


              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingStudentId(null);
                  setIsEditable(false);
                }}
                className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl text-center"
              >
                Cancel
              </button>
              {editingStudentId !== null && !isEditable ? (
                <button
                  onClick={() => setIsEditable(true)}
                  className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl text-center"
                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-2xl text-center"
                >
                  Save
                </button>

              )}
            </div>


          </div>
        </div>
      )}
    </div>
  );
}
