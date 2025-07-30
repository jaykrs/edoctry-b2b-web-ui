"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";
import { Pencil, EyeIcon, GoDown } from "@/icons/index";

function VendorStaff() {
  type VendorStaffType = {
    id: number;
    attributes: {
      name?: string;
      staffType?: string;
      email?: string;
      phone?: string;
      vendoruuid?: string;
      skills?: string;
      address?: string;
      smedia?: string;
      certification?: string;
      qualification?: string;
      avatar?: string;
      active?: boolean;
      payroll?: string;
      feedback?: any[];
      bankDetails?: string;
      rating?: string;
      biography?: string;
      // Add other fields as needed
    };
  };

  const [vendor, setVendor] = useState<VendorStaffType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
const [formData, setFormData] = useState<{
  name: string;
  staffType: string;
  email: string;
  phone: string;
  vendoruuid: string;
  skills: string;
  address: string;
  smedia: string;
  certification: string;
  qualification: string;
  avatar: string;
  active: boolean;
  payroll: string;
  feedback: string[];
  bankDetails: string;
  rating: string;
  biography: string;
}>({
  name: "",
  staffType: "",
  email: "",
  phone: "",
  vendoruuid: "",
  skills: "",
  address: "",
  smedia: "",
  certification: "",
  qualification: "",
  avatar: "",
  active: false,
  payroll: "",
  feedback: [],
  bankDetails: "",
  rating: "",
  biography: "",
});


  const vendorStaff = async () => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (vendorid && jwt) {
        const res = await fetch(
          `${apiUrl}/api/vendostaffs?filters[vendoruuid][$eq]=${vendorid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await res.json();
        setVendor(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch vendor staff list:", error);
    }
  };

  const openEditModal = (staff: any) => {
    setFormData({
      name: staff.name || "",
      staffType: staff.staffType || "",
      email: staff.email || "",
      phone: staff.phone || "",
      vendoruuid: staff.vendoruuid || "",
      skills: staff.skills || "",
      address: staff.address || "",
      smedia: staff.smedia || "",
      certification: staff.certification || "",
      qualification: staff.qualification || "",
      avatar: staff.avatar || "",
      active: staff.active || false,
      payroll: staff.payroll || "",
      feedback: staff.feedback || [],
      bankDetails: staff.bankDetails || "",
      rating: staff.rating || "",
      biography: staff.biography || "",
    });
    setEditingStaffId(staff.id);
    setIsEditable(false);
    setShowModal(true);
  };

  const handleSave = async () => {
    const jwt = localStorage.getItem("jwt");
    const staffDataString = localStorage.getItem("staffData");
    const staffData = staffDataString ? JSON.parse(staffDataString) : null;
    const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;

    const method = editingStaffId ? "PUT" : "POST";
    const endpoint = editingStaffId
      ? `${apiUrl}/api/vendostaffs/${editingStaffId}`
      : `${apiUrl}/api/vendostaffs`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            ...formData,
            vendoruuid,
          },
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setShowModal(false);
        setEditingStaffId(null);
        setFormData({
          name: "",
          staffType: "",
          email: "",
          phone: "",
          vendoruuid: "",
          skills: "",
          address: "",
          smedia: "",
          certification: "",
          qualification: "",
          avatar: "",
          active: false,
          payroll: "",
          feedback: [],
          bankDetails: "",
          rating: "",
          biography: "",
        });
        setIsEditable(false);
        vendorStaff();
      } else {
        console.error("Save failed", result);
      }
    } catch (err) {
      console.error("Save error", err);
    }
  };

  useEffect(() => {
    vendorStaff();
  }, []);

  useEffect(() => {
    if (showModal && !editingStaffId) {
      setIsEditable(true);
    }
  }, [showModal, editingStaffId]);

    useEffect(() => {
      if (showModal) {
        document.body.classList.add("hide-app-layout");
      } else {
        document.body.classList.remove("hide-app-layout");
      }
      return () => document.body.classList.remove("hide-app-layout");
    }, [showModal]);

  return (
    <>
      <div className="flex justify-between items-center p-10 bg-gradient-to-brounded-t-2xl">
        <h1 className="text-4xl uppercase text-gray-700 pb-2 font-bold">
          <span className="text-[#2143BE] border-b-4 border-red-500">All</span> Staff
        </h1>
        <button
          onClick={() => {
            setFormData({
              name: "",
              staffType: "",
              email: "",
              phone: "",
              vendoruuid: "",
              skills: "",
              address: "",
              smedia: "",
              certification: "",
              qualification: "",
              avatar: "",
              active: false,
              payroll: "",
              feedback: [],
              bankDetails: "",
              rating: "",
              biography: "",
            });
            setEditingStaffId(null);
            setIsEditable(true);
            setShowModal(true);
          }}
          className="bg-[#2143BE] text-white text-2xl px-4 py-2 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
        >
          <Pencil />
        </button>
      </div>

      <ul className="space-y-4 p-4 pt-4">
        {vendor.length > 0 ? (
          vendor.map((vendorStaff) => {
            const staff = vendorStaff.attributes || {};
            return (
              <li
                key={vendorStaff.id}
                className="flex justify-between items-center border-b border-[#2143BE] py-5 px-4 shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300 rounded-2xl"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${staff.name}&background=random`}
                    alt={staff.name}
                    width={40}
                    height={40}
                    className="rounded-full dark:opacity-50"
                  />
                  <div>
                    <p className="font-semibold dark:text-gray-400">{staff.name}</p>
                    <p className="text-sm text-gray-500">{staff.staffType}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      openEditModal({
                        ...staff,
                        id: vendorStaff.id,
                      })
                    }
                    className="bg-[#2143BE] text-white px-3 py-1 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
                  >
                    <EyeIcon />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>No staff found</p>
        )}
      </ul>

{showModal && (
  <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex items-center justify-center z-50">
    <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto">
      {/* Header with gradient */}
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4 rounded-3xl">
        <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
          <h2 className="text-2xl font-semibold mb-2">
            {editingStaffId ? "Edit Staff Details ?" : "Add Staff Details ?"}
          </h2>
          <p className="text-sm text-blue-100 mb-6">
            {editingStaffId ? "Update staff information to keep records accurate." : "Keep your staff info updated and organized."}
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

      {/* Edit/Save button top right */}
      <div className="flex justify-end items-center mt-6">
        {editingStaffId !== null && !isEditable ? (
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
            💾
          </button>
        )}
      </div>

      {/* Form section */}
      <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Name */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Name</h3>
          <input
            type="text"
            placeholder="Name"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.name}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Staff Type */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Staff Type</h3>
          <input
            type="text"
            placeholder="Staff Type"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.staffType}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, staffType: e.target.value })}
          />
        </div>

        {/* Email */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Email</h3>
          <input
            type="email"
            placeholder="Email"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
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
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.phone}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        {/* Vendor UUID */}
        {/* <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Vendor UUID</h3>
          <input
            type="text"
            placeholder="Vendor UUID"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.vendoruuid}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, vendoruuid: e.target.value })}
          />
        </div> */}
        {/* Skills */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Skills</h3>
          <input
            type="text"
            placeholder="Skills"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.skills}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </div>
        {/* Address */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Address</h3>
          <input
            type="text"
            placeholder="Address"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
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
            placeholder="Social Media"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.smedia}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, smedia: e.target.value })}
          />
        </div>
        {/* Certification */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Certification</h3>
          <input
            type="text"
            placeholder="Certification"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.certification}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
          />
        </div>
        {/* Qualification */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Qualification</h3>
          <input
            type="text"
            placeholder="Qualification"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.qualification}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
          />
          </div>
        {/* Avatar */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Avatar</h3>
          <input
            type="text"
            placeholder="Avatar"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.avatar}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />
          </div>
        {/* Active */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Active</h3>
          <input
            type="checkbox"
            className="mr-2"
            checked={formData.active}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          />
          </div>
        {/* Payroll */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Payroll</h3>
          <input
            type="text"
            placeholder="Payroll"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.payroll}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, payroll: e.target.value })}
          />
          </div>
        {/* Feedback */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Feedback</h3>
          <textarea
            placeholder="Feedback"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.feedback}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value.split('\n') })}
          />
          </div>
        {/* Bank Details */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Bank Details</h3>
          <input
            type="text"
            placeholder="Bank Details"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.bankDetails}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, bankDetails: e.target.value })}
          />
          </div>
        {/* Rating */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Rating</h3>
          <input
            type="text"
            placeholder="Rating"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.rating}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          />
          </div>
        {/* Biography */}
        <div>
          <h3 className="text-gray-700 text-base font-bold pb-2">Biography</h3>
          <textarea
            placeholder="Biography"
            className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
            value={formData.biography}
            disabled={!isEditable}
            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
          />
          </div>

        </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
        <button
          onClick={() => {
            setShowModal(false);
            setEditingStaffId(null);
            setIsEditable(false);
            setFormData({
              name: "",
              staffType: "",
              email: "",
              phone: "",
              vendoruuid: "",
              skills: "",
              address: "",
              smedia: "",
              certification: "",
              qualification: "",
              avatar: "",
              active: false,
              payroll: "",
              feedback: [],
              bankDetails: "",
              rating: "",
              biography: "",
            });
          }}
          className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl text-center"
        >
          Cancel
        </button>
        {editingStaffId && !isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="w-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl text-center"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={() => {
              handleSave();
              setIsEditable(false);
            }}
            className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-2xl text-center"
          >
            Save
          </button>
        )}
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default VendorStaff;