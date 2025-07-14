"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";
import { Pencil, EyeIcon } from "@/icons/index";

export default function VenderItem() {
  const [vendorItem, setVendorItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "" });

  const vendorItemFetch = async () => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (vendorid && jwt) {
        const res = await fetch(
          `${apiUrl}/api/vendoritems?filters[vendoruuid][$eq]=${vendorid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await res.json();
        setVendorItem(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch vendor item list:", error);
    }
  };

  const handleSave = async () => {
    const jwt = localStorage.getItem("jwt");
    const staffDataString = localStorage.getItem("staffData");
    const staffData = staffDataString ? JSON.parse(staffDataString) : null;
    const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;

    const method = editingItemId ? "PUT" : "POST";
    const endpoint = editingItemId
      ? `${apiUrl}/api/vendoritems/${editingItemId}`
      : `${apiUrl}/api/vendoritems`;

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

      if (res.ok) {
        setShowModal(false);
        setEditingItemId(null);
        setFormData({ name: "", category: "" });
        vendorItemFetch();
      } else {
        console.error("Failed to save item.");
      }
    } catch (error) {
      console.error("Error while saving item:", error);
    }
  };

  useEffect(() => {
    vendorItemFetch();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-10 bg-gradient-to-b from-[#EEEDF4] to-[#DBDAE5] rounded-t-2xl">
        <h1 className="text-4xl uppercase text-gray-700 pb-2 font-bold">
          <span className="text-[#2143BE] border-b-4 border-red-500">All</span> Items
        </h1>
        <button
          onClick={() => {
            setFormData({ name: "", category: "" });
            setEditingItemId(null);
            setShowModal(true);
          }}
          className="bg-[#2143BE] text-white text-2xl px-4 py-2 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
        >
          <Pencil />
        </button>
      </div>

      <ul className="space-y-4 p-4 pt-4">
        {vendorItem.length > 0 ? (
          vendorItem.map((item) => {
            const VenderItem = item.attributes || {};
            return (
              <li
                key={item.id}
                className="flex justify-between items-center border-b border-[#2143BE] py-5 px-4 shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300 rounded-2xl"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${VenderItem.name}&background=random`}
                    alt={VenderItem.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{VenderItem.name}</p>
                    <p className="text-sm text-gray-500">{VenderItem.category}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        name: VenderItem.name || "",
                        category: VenderItem.category || "",
                      });
                      setEditingItemId(item.id);
                      setShowModal(true);
                    }}
                    className="bg-[#2143BE] text-white px-3 py-1 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
                  >
                    <EyeIcon />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <p>No items found</p>
        )}
      </ul>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingItemId ? "Edit Item" : "Add Item"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Category"
              className="w-full p-2 border rounded mb-2"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                {editingItemId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
