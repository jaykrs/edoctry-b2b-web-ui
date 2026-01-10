"use client";
import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";
import { Pencil, EyeIcon, PencilIcon } from "@/icons/index";
import { RipleLoader } from '../ui/loading/ripleloader';
import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableRow, TableBody } from "../ui/table";
import Select from "../form/Select";


type VendorItemType = {
  id: number;
  attributes: {
    name?: string;
    category?: string;
    type?: string;
    warranty?: string;
    expirydt?: string;
    manual?: string;
    page?: string;
    cost?: string;
    origin?: string;
    [key: string]: any;
  };
};

export default function VenderItem() {
  const [vendorItem, setVendorItem] = useState<VendorItemType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  type OptionType = { label: string; value: string };
  const [options, setOptions] = useState<OptionType[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    warranty: "",
    expirydt: "",
    manual: "",
    page: "",
    cost: "",
    origin: "",
  });


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

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log("Fetching vendortype with JWT:", jwt);
    fetch(`${apiUrl}/api/templates?filters[template][$eq]=vendoritemtype`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
    )
      .then((res) => res.json())
      .then((data) => {
        const vendortype = data.data?.[0]?.attributes?.json || [];

        const formattedOptions = vendortype.map((item: any) =>
          item.value && item.label
            ? item
            : { label: item, value: item.toLowerCase() }
        );

        setOptions(formattedOptions);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    fetch(`${apiUrl}/api/templates?filters[template][$eq]=vendoritemcategory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
    )
      .then((res) => res.json())
      .then((data) => {
        const vendorcategory = data.data?.[0]?.attributes?.json || [];

        const formattedcategory = vendorcategory.map((item: any) =>
          item.value && item.label
            ? item
            : { label: item, value: item.toLowerCase() }
        );

        setCategoryOptions(formattedcategory);
      })
      .catch((err) => console.error(err));
  }, []);


  const handleSave = async () => {
    const jwt = localStorage.getItem("jwt");
    const staffDataString = localStorage.getItem("staffData");
    const staffData = staffDataString ? JSON.parse(staffDataString) : null;
    const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;
    console.log("Saving formData: ", formData);
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
        setFormData({
          name: "",
          category: "",
          type: "",
          warranty: "",
          expirydt: "",
          manual: "",
          page: "",
          cost: "",
          origin: "",

        });
        setIsEditable(false);
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

  useEffect(() => {
    if (showModal) {
      if (!editingItemId) setIsEditable(true);
    }
  }, [showModal, editingItemId]);

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
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Vendor Items"
          icon="📦"
          buttonprops={{
            buttonText: '+',
            title: 'Add Items',
            content: 'Here you can add items to the system.',
            onClick: () => {
              setFormData({
                name: "",
                category: "",
                type: "",
                warranty: "",
                expirydt: "",
                manual: "",
                page: "",
                cost: "",
                origin: "",
              });
              setEditingItemId(null);
              setIsEditable(true);
              setShowModal(true);
            }
          }}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
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
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Cost
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Origin
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Warranty & Expiry Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Edit
                  </TableCell>
                </TableRow>
              </TableHeader>
              {/* table body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {vendorItem.map((item) => {
                  const VenderItem = item.attributes || {};
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="px-5 py-6 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-lg">
                            <img
                              src={`https://ui-avatars.com/api/?name=${VenderItem.name}&background=random`}
                              alt={VenderItem.name}
                              className=""
                            />
                          </div>
                          <div>
                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {VenderItem.name}
                            </span>
                            <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                              {VenderItem.type}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className=" px-4 py-3 mt-2 text-gray-500 text-start  text-theme-sm dark:text-gray-400">
                        {VenderItem.category}
                      </TableCell>
                      <TableCell className=" px-4 py-3 mt-2 text-gray-500 text-start  text-theme-sm dark:text-gray-400">
                        {VenderItem.cost}
                      </TableCell>
                      <TableCell className=" px-4 py-3 mt-2 text-gray-500 text-start  text-theme-sm dark:text-gray-400">
                        <span className="text-blue-600 font font-bold">
                          {VenderItem.origin}
                        </span>
                      </TableCell>
                      <TableCell className="flex flex-col px-4 py-3 mt-2 text-gray-500 text-start  text-theme-sm dark:text-gray-400">
                        <span className="text-blue-600 font font-bold">
                          Warranty : {VenderItem.warranty}
                        </span>
                        <span className="font-bold">Exp : {VenderItem.expirydt} </span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => {
                            setFormData({
                              name: VenderItem.name || "",
                              category: VenderItem.category || "",
                              type: VenderItem.type || "",
                              warranty: VenderItem.warranty || "",
                              expirydt: VenderItem.expirydt || "",
                              manual: VenderItem.manual || "",
                              page: VenderItem.page || "",
                              cost: VenderItem.cost || "",
                              origin: VenderItem.origin || "",
                            });
                            setEditingItemId(item.id);
                            setIsEditable(false);
                            setShowModal(true);
                          }}
                          className="ps-6 flex justify-end text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                          <PencilIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto">
            {/* Gradient Header */}
            <div className="flex flex-col items-center justify-center min-h-[250px] bg-[#DDE6FA] px-4 rounded-3xl">
              <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                <h2 className="text-2xl font-semibold mb-2 text-gray-500">
                  {editingItemId ? "Edit Item Details ?" : "Add Item Details ?"}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  {editingItemId ? "Update item info to keep inventory accurate." : "Keep your item details up to date and categorized properly."}
                </p>
                <div className="flex items-center justify-center max-w-md mx-auto bg-white rounded-full p-1 shadow-md">
                  <input
                    type="text"
                    placeholder="youremail@address.com"
                    className="flex-grow px-4 py-2 rounded-full text-gray-700 outline-none"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition">
                    ➜
                  </button>
                </div>
              </div>
            </div>

            {/* Edit/Save Top Right */}
            <div className="flex justify-end items-center mt-6">
              {editingItemId !== null && !isEditable ? (
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
                  placeholder="Item Name"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.name}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Type</label>
                <select
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.category}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Category</h3>
                <input
                  type="text"
                  placeholder="Item Category"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.category}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div> */}
              {/* Type Single-Select */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Type</label>
                <select
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.type}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="">Select type</option>
                  {options.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Warranty */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Warranty</h3>
                <input
                  type="text"
                  placeholder="Item Warranty"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.warranty}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                />
              </div>
              {/* Expiry Date */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Expiry Date</h3>
                <input
                  type="date"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.expirydt}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, expirydt: e.target.value })}
                />
              </div>
              {/* Manual */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Manual</h3>
                <input
                  type="text"
                  placeholder="Item Manual"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.manual}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, manual: e.target.value })}
                />
              </div>
              {/* Page */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Page</h3>
                <input
                  type="text"
                  placeholder="Item Page"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.page}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                />
              </div>
              {/* Cost */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Cost</h3>
                <input
                  type="text"
                  placeholder="Item Cost"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.cost}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                />
              </div>
              {/* Origin */}
              <div>
                <h3 className="text-gray-700 text-base font-bold pb-2">Origin</h3>
                <input
                  type="text"
                  placeholder="Item Origin"
                  className={`w-full border-2 ${!isEditable ? 'bg-gray-100' : 'bg-white'} rounded-xl p-2 mb-3`}
                  value={formData.origin}
                  disabled={!isEditable}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
              </div>

            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingItemId(null);
                  setIsEditable(false);
                  setFormData({
                    name: "",
                    category: "",
                    type: "",
                    warranty: "",
                    expirydt: "",
                    manual: "",
                    page: "",
                    cost: "",
                    origin: "",

                  });
                }}
                className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl text-center"
              >
                Cancel
              </button>
              {editingItemId && !isEditable ? (
                <button
                  onClick={() => setIsEditable(true)}
                  className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl text-center"

                >
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSave();
                    setIsEditable(false);
                  }}
                  className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl text-center"

                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div >
      )
      }

    </>
  );
}
