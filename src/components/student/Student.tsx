"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, EyeIcon, DocsIcon, PencilIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";
import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableRow, TableBody } from "../ui/table";
import Badge from "../ui/badge/Badge";

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
    alternatephone: string;
    idnumber: string;
    idtype: string;
    lockerdetails: string;
    monthfee: string;
    parentdetails: string;
    regfee: string;
    registrationdt: string;
    reregistrationdt: string;
    shifttime: string;
    studentid: string;
    seatdetails: string;
    dam: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

export default function Student() {
  const [tableData, setTableData] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
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
    alternatephone: "",
    idnumber: "",
    idtype: "",
    lockerdetails: "",
    monthfee: "",
    parentdetails: "",
    regfee: "",
    registrationdt: "",
    reregistrationdt: "",
    shifttime: "",
    studentid: "",
    seatdetails: "",
    dam: "",
  });

  useEffect(() => {
    fetchStudentList(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("hide-app-layout");
    } else {
      document.body.classList.remove("hide-app-layout");
    }
    return () => document.body.classList.remove("hide-app-layout");
  }, [showModal]);

  const extractPlainText = (richText: any) => {
    if (Array.isArray(richText)) {
      return richText.map(block =>
        block.children.map((child: any) => child.text).join('')
      ).join('\n');
    }
    return richText;
  };


  const fetchStudentList = async (page = 1) => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (vendorid && jwt) {
        const res = await fetch(
          `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}&pagination[page]=${page}&pagination[pageSize]=25`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await res.json();

        setPageCount(data.meta.pagination.pageCount);
        setCurrentPage(data.meta.pagination.page);
        const studentList: Order[] = data.data.map((item: any, index: number) => ({
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
            alternatephone: item.attributes.alternatephone || "",
            idnumber: item.attributes.idnumber || "",
            idtype: item.attributes.idtype || "",
            lockerdetails: item.attributes.lockerdetails || "",
            monthfee: item.attributes.monthfee || "",
            parentdetails: item.attributes.parentdetails || "",
            regfee: item.attributes.regfee || "",
            registrationdt: item.attributes.registrationdt || "",
            reregistrationdt: item.attributes.reregistrationdt || "",
            shifttime: item.attributes.shifttime || "",
            studentid: item.attributes.studentid || "",
            seatdetails: item.attributes.seatdetails || "",
            dam: item.attributes.dam || "",
          },
          projectName: item.attributes.website || "N/A",
          team: {
            images: [item.attributes.avatar || "/images/user/user-22.jpg"],
          },
          status: item.attributes.active ? "Active" : "Inactive",
          budget: item.attributes.gstin || "0.0K",
        }));

        setTableData(studentList);
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
      alternatephone: "",
      idnumber: "",
      idtype: "",
      lockerdetails: "",
      monthfee: "",
      parentdetails: "",
      regfee: "",
      registrationdt: "",
      reregistrationdt: "",
      shifttime: "",
      studentid: "",
      seatdetails: "",
      dam: "",
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
      alternatephone: student.user.alternatephone,
      idnumber: student.user.idnumber,
      idtype: student.user.idtype,
      lockerdetails: student.user.lockerdetails,
      monthfee: student.user.monthfee,
      parentdetails: student.user.parentdetails,
      regfee: student.user.regfee,
      registrationdt: student.user.registrationdt,
      reregistrationdt: student.user.reregistrationdt,
      shifttime: student.user.shifttime,
      studentid: student.user.studentid,
      seatdetails: student.user.seatdetails,
      dam: student.user.dam,
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

      const finalReRegistrationDate =
        formData.reregistrationdt && formData.reregistrationdt.trim() !== ""
          ? formData.reregistrationdt
          : formData.registrationdt;


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
            alternatephone: formData.alternatephone,
            idnumber: formData.idnumber,
            idtype: formData.idtype,
            lockerdetails: formData.lockerdetails,
            monthfee: formData.monthfee,
            parentdetails: formData.parentdetails,
            regfee: formData.regfee,
            registrationdt: formData.registrationdt,
            reregistrationdt: finalReRegistrationDate,
            shifttime: formData.shifttime,
            studentid: formData.studentid,
            seatdetails: formData.seatdetails,
            dam: formData.dam,
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
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="All Students"
          icon="🎓"
          buttonprops={{
            buttonText: '+',
            title: 'Add Students',
            content: 'Here you can enroll students in the system.',
            onClick: openAddModal
          }}
        />
      </div>
      {/* {!showModal && (
        <div className="flex justify-between items-center p-10 rounded-t-2xl">
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
      )} */}



      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email & Phone
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Skill & Qualification
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Courses
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Address
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                    Registration Date & Locker Details
                  </TableCell>

                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                    ID Type & ID Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                  >
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                    Reg Fee, Month Fee & Shift Time
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Edit
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-5 py-6 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="min-w-10 min-h-10  rounded-lg">
                          <img
                            src={`https://ui-avatars.com/api/?name=${order.user.name}&background=random`}
                            alt={order.user.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.user.name}
                          </span>
                          <span >
                            {order.user.studentid || "-"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex flex-col px-4 py-3 mt-2 text-gray-500 text-start  text-theme-sm dark:text-gray-400">
                      <span className="text-blue-600 font font-bold">
                        {order.user.email}
                      </span>
                      <span className="font-bold">{order.user.phone}</span>

                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex flex-col">
                        <span className="text-blue-600 font font-bold">{extractPlainText(order.user.skills).split(' ').slice(0, 3).join(' ') + (extractPlainText(order.user.skills).split(' ').length > 3 ? '...' : '')}</span>
                        <span>{extractPlainText(order.user.qualification)}</span>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <span>{order.user.courses}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <span>{order.user.address}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      <div className="flex flex-col">
                        <span>
                          {order.user.registrationdt || "-"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {order.user.lockerdetails || "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {order.user.idtype || "-"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {order.user.idnumber || "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-theme-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${order.user.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {order.user.active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      <div className="flex flex-col">
                        <span>Reg Fee: {order.user.regfee || "-"}</span>
                        <span>Month Fee: {order.user.monthfee || "-"}</span>
                        <span className="text-xs text-gray-400">
                          {order.user.shifttime || "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => openEditModal(order)}
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
          <div className="flex justify-center items-center mt-8">
            <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-2xl border">

              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all 
        ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`}
              >
                ←
              </button>

              {/* Page Numbers */}
              {Array.from({ length: pageCount }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all
            ${currentPage === page
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700"}`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all
        ${currentPage === pageCount
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`}
              >
                →
              </button>

            </div>
          </div>
        </div>
      </div>



      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto   ">

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
                  className=" hidden justify-center items-center w-20 px-4 py-2 bg-[#4E6CDA] text-white hover:bg-[#2143BE] rounded-2xl text-center"
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
                <textarea
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
              {/* Alternate Phone */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Alternate Phone</h3>
                <input
                  type="tel"
                  placeholder="Alternate Phone"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.alternatephone}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, alternatephone: e.target.value })}
                />
              </div>
              {/* Student Id */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Student ID</h3>
                <input
                  type="text"
                  placeholder="Student ID"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.studentid}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, studentid: e.target.value })}
                />
              </div>
              {/* Idtype */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">ID Type</h3>
                <input
                  type="text"
                  placeholder="Adhar / PAN / etc"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.idtype}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, idtype: e.target.value })}
                />
              </div>
              {/* Id number */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">ID Number</h3>
                <input
                  type="text"
                  placeholder="ID Number"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.idnumber}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, idnumber: e.target.value })}
                />
              </div>
              {/* Locker Details */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Locker Details</h3>
                <input
                  type="text"
                  placeholder="Locker Details"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.lockerdetails}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, lockerdetails: e.target.value })}
                />
              </div>
              {/* Registration fee*/}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Registration Fee</h3>
                <input
                  type="text"
                  placeholder="Registration Fee"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.regfee}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, regfee: e.target.value })}
                />
              </div>
              {/* Monthly Fee */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Monthly Fee</h3>
                <input
                  type="text"
                  placeholder="Monthly Fee"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.monthfee}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, monthfee: e.target.value })}
                />
              </div>
              {/* Registration date */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Registration Date</h3>
                <input
                  type="date"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.registrationdt}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, registrationdt: e.target.value })}
                />
              </div>
              {/* Re-Registration Date */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Re-Registration Date</h3>
                <input
                  type="date"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.reregistrationdt}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, reregistrationdt: e.target.value })}
                />
              </div>
              {/* Swift Time */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Shift Time</h3>
                <input
                  type="text"
                  placeholder="Shift Time"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.shifttime}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, shifttime: e.target.value })}
                />
              </div>
              {/* Seat No */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Seat No</h3>
                <input
                  type="text"
                  placeholder="Seat Number"
                  className={`w-full border-2 ${!isEditable
                    ? "bg-gray-100 rounded-xl p-2 mb-3"
                    : "bg-white rounded-xl p-2 mb-3"
                    }`}
                  value={formData.seatdetails}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setFormData({ ...formData, seatdetails: e.target.value })
                  }
                />
              </div>
              {/* Parent Details */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Parent Details</h3>
                <textarea
                  placeholder="Parent Details"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100 rounded-xl p-2 mb-3' : 'bg-white rounded-xl p-2 mb-3'}`}
                  value={formData.parentdetails}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, parentdetails: e.target.value })}
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
              {/* Dam (Extra Links) */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">
                  Dam (Comma Separated Links)
                </h3>
                <textarea
                  placeholder="https://google.com, https://github.com/user"
                  className={`w-full border-2 ${!isEditable
                    ? "bg-gray-100 rounded-xl p-2 mb-3"
                    : "bg-white rounded-xl p-2 mb-3"
                    }`}
                  value={formData.dam}
                  disabled={!isEditable}
                  onChange={(e) =>
                    setFormData({ ...formData, dam: e.target.value })
                  }
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
                  className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl text-center"

                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl text-center"

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
