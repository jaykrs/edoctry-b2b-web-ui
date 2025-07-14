"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";
import { Pencil, EyeIcon, GoDown } from "@/icons/index";

function VendorStaff() {
  const [vendor, setVendor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    staffType: "",
    email: "",
    phone: "",
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

  const openEditModal = (staff : any) => {
    setFormData({
      name: staff.name || "",
      staffType: staff.staffType || "",
      email: staff.email || "",
      phone: staff.phone || "",
    });
    setEditingStaffId(staff.id);
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
        setFormData({ name: "", staffType: "", email: "", phone: "" });
        vendorStaff(); // refresh
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

  return (
    <>
      <div className="flex justify-between items-center p-10 bg-gradient-to-b from-[#EEEDF4] to-[#DBDAE5] rounded-t-2xl">
        <h1 className="text-4xl uppercase text-gray-700 pb-2 font-bold">
          <span className="text-[#2143BE] border-b-4 border-red-500">All</span> Staff
        </h1>
        <button
          onClick={() => {
            setFormData({ name: "", staffType: "", email: "", phone: "" });
            setEditingStaffId(null);
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
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{staff.name}</p>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingStaffId ? "Edit Staff" : "Add Staff"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-2"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Staff Type"
              className="w-full p-2 border rounded mb-2"
              value={formData.staffType}
              onChange={(e) =>
                setFormData({ ...formData, staffType: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-2 border rounded mb-2"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editingStaffId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VendorStaff;
