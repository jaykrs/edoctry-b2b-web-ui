"use client";
import React, { useEffect, useState } from "react";
import { Pencil, EyeIcon, DocsIcon, PencilIcon, ChatIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";
import { Phone, RefreshCcw, RefreshCw } from "lucide-react";

import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableRow, TableBody } from "../ui/table";


interface CallLog {
    date: string;
    log: string;
}
interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    address: string;
    status: string;
    requirement: string;
    callog: CallLog[];
}


function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [showCallLogModal, setShowCallLogModal] = useState(false);
    const [selectedCallLogs, setSelectedCallLogs] = useState<CallLog[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
    const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
    const [newCallLog, setNewCallLog] = useState({
        date: "",
        log: "",
        status: "",
    });

    const [activeCustomerId, setActiveCustomerId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        status: "",
        requirement: "",
    });


    useEffect(() => {
        if (showCallLogModal) {
            document.body.classList.add("hide-app-layout");
        } else {
            document.body.classList.remove("hide-app-layout");
        }
        return () => document.body.classList.remove("hide-app-layout");
    }, [showCallLogModal]);

    useEffect(() => {
        fetchCustomersList();
    }, []);

    // add cutomer

    const openAddCustomerModal = () => {
        setEditingCustomerId(null);     // 👈 ADD MODE
        setIsEditable(true);
        setFormData({
            name: "",
            email: "",
            phone: "",
            city: "",
            address: "",
            status: "",
            requirement: "",
        });
        setShowModal(true);
    };

    // edit customer

    const openEditCustomerModal = (customer: Customer) => {
        setEditingCustomerId(customer.id);   // 👈 EDIT MODE
        setIsEditable(false);                // pehle readonly
        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            city: customer.city,
            address: customer.address,
            status: customer.status,
            requirement: customer.requirement,
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
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                address: formData.address,
                requirement: formData.requirement,
                status: formData.status || "lead",
                vendorId: vendorId,
            };

            const url =
                editingCustomerId === null
                    ? `${apiUrl}/api/customers`
                    : `${apiUrl}/api/customers/${editingCustomerId}`;

            const method = editingCustomerId === null ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: payload, // 👈 ALWAYS wrapped in data
                }),
            });

            if (!res.ok) {
                console.error("Save failed");
                return;
            }

            setShowModal(false);
            setEditingCustomerId(null);
            setIsEditable(false);
            fetchCustomersList();
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    // call log update
    const handleSaveCallLog = async () => {
        try {
            if (!activeCustomerId) return;

            const jwt = localStorage.getItem("jwt");
            if (!jwt) return;

            if (!newCallLog.date || !newCallLog.log) {
                alert("Date and Call Notes are required");
                return;
            }

            // Existing logs + new log
            const updatedCallLogs = [
                ...selectedCallLogs,
                {
                    date: newCallLog.date,
                    log: newCallLog.log,
                },
            ];

            const payload = {
                callog: updatedCallLogs,
                status: newCallLog.status || "lead",
            };

            const res = await fetch(
                `${apiUrl}/api/customers/${activeCustomerId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({ data: payload }),
                }
            );

            const result = await res.json();

            if (!res.ok) {
                console.error("Call log save failed:", result);
                return;
            }

            // UI refresh
            fetchCustomersList();
            setSelectedCallLogs(updatedCallLogs);
            setNewCallLog({ date: "", log: "", status: "" });

        } catch (err) {
            console.error("Save call log error:", err);
        }
    };


    const fetchCustomersList = async () => {
        try {
            const staffDataString = localStorage.getItem("staffData");
            const staffData = staffDataString ? JSON.parse(staffDataString) : null;
            const jwt = localStorage.getItem("jwt");
            const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

            if (!vendorid || !jwt) return;

            const res = await fetch(
                `${apiUrl}/api/customers?filters[vendorId][$eq]=${vendorid}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            const data = await res.json();

            const list: Customer[] = data.data.map((item: any) => ({
                id: item.id,
                name: item.attributes.name,
                email: item.attributes.email,
                phone: item.attributes.phone,
                city: item.attributes.city,
                address: item.attributes.address,
                status: item.attributes.status,
                requirement: item.attributes.requirement,
                callog: item.attributes.callog || [],
            }));

            setCustomers(list);
        } catch (error) {
            console.error("Failed to fetch customer list:", error);
        }
    };

    const getTodayDate = () => {
        return new Date().toISOString().split("T")[0];
    };

    return (
        <div>
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="All Customer"
                    icon="📋"
                    buttonprops={{
                        buttonText: '+',
                        title: 'Add Customers',
                        onClick: openAddCustomerModal,
                        content: 'Here you can Add customers.',

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
                                        Email & Phone
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        City
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Requirement
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Address
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Call log
                                    </TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        <PencilIcon />
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {customers.map((customer) => (
                                    <TableRow key={customer.id}>

                                        {/* Name */}
                                        <TableCell className="px-5 py-6 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-lg">
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${customer.name}&background=random`}
                                                        alt={customer.name}
                                                    />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                        {customer.name}
                                                    </span>
                                                    <span className="text-xs">{customer.status}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Email & Phone */}
                                        <TableCell className="flex flex-col px-4 py-3 mt-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <span className="text-blue-600 font font-bold">
                                                {customer.email}
                                            </span>
                                            <span className="font-bold">{customer.phone}</span>
                                        </TableCell>

                                        {/* City & Status */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-blue-600">{customer.city}</span>
                                            </div>
                                        </TableCell>

                                        {/* Requirement */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {customer.requirement}
                                        </TableCell>

                                        {/* Address */}
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {customer.address}
                                        </TableCell>
                                        {/* Call log */}
                                        <TableCell>
                                            <button
                                                onClick={() => {
                                                    setSelectedCallLogs(customer.callog);
                                                    setActiveCustomerId(customer.id);

                                                    setNewCallLog({
                                                        date: getTodayDate(),
                                                        log: "",
                                                        status: customer.status || "lead",
                                                    });

                                                    setShowCallLogModal(true);
                                                }}
                                                className="ps-6 flex justify-end text-green-600 hover:text-green-800"
                                            >
                                                <Phone size={14} />
                                            </button>

                                        </TableCell>

                                        <TableCell>
                                            <button
                                                onClick={() => openEditCustomerModal(customer)}
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
            {/*  Call Log Modal */}
            {showCallLogModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setShowCallLogModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl w-[90%] max-w-4xl h-[70vh] shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-700">Call Logs</h2>

                            <div className="flex items-center gap-3">
                                {/* Refresh */}
                                <button
                                    onClick={() => {
                                        fetchCustomersList(); // same existing function
                                    }}
                                    className="text-gray-500 hover:text-blue-600"
                                    title="Refresh"
                                >
                                    <RefreshCw size={16} />
                                </button>

                                {/* Close */}
                                <button
                                    onClick={() => setShowCallLogModal(false)}
                                    className="text-gray-500 hover:text-red-500"
                                    title="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="grid grid-cols-1 md:grid-cols-2 h-full">

                            {/* LEFT: Existing Call Logs */}
                            <div className="border-r p-5 flex flex-col overflow-hidden pb-20">
                                {/* Fixed header */}
                                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                                    Previous Calls
                                </h3>

                                {/* Scroll area */}
                                <div className="flex-1 overflow-y-auto pr-2 ">
                                    {selectedCallLogs.length === 0 ? (
                                        <div className="text-sm text-gray-400">
                                            No call logs found
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {selectedCallLogs.map((item, index) => (
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

                            {/* RIGHT: Add Call Log UI (still UI only) */}
                            <div className="p-5">
                                <h3 className="text-sm font-semibold text-gray-600 mb-4">
                                    Add New Call Log
                                </h3>

                                <div className="space-y-4">

                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-xs text-gray-500 mb-1">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full border rounded-xl px-3 py-2 text-sm"
                                                value={newCallLog.date}
                                                onChange={(e) =>
                                                    setNewCallLog({ ...newCallLog, date: e.target.value })
                                                }
                                            />
                                        </div>

                                        <div className="w-1/2">
                                            <label className="block text-xs text-gray-500 mb-1">
                                                Status
                                            </label>
                                            <select
                                                className="w-full border rounded-xl px-3 py-2 text-sm bg-white focus:outline-none"
                                                value={newCallLog.status}
                                                onChange={(e) =>
                                                    setNewCallLog({ ...newCallLog, status: e.target.value })
                                                }
                                            >
                                                <option value="">Choose here</option>
                                                <option value="lead">lead</option>
                                                <option value="proposal">proposal</option>
                                                <option value="rejected">rejected</option>
                                                <option value="opportunity">opportunity</option>
                                                <option value="customer">customer</option>
                                                <option value="other">other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">
                                            Call Notes
                                        </label>
                                        <textarea
                                            rows={5}
                                            placeholder="Enter call details..."
                                            className="w-full border rounded-xl px-3 py-2 text-sm"
                                            value={newCallLog.log}
                                            onChange={(e) =>
                                                setNewCallLog({ ...newCallLog, log: e.target.value })
                                            }
                                        />
                                    </div>

                                    <button
                                        onClick={handleSaveCallLog}
                                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
                                    >
                                        Save Call Log
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto">

                        {/* TOP INFO SECTION */}
                        <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4 rounded-3xl">
                            <div className="text-gray-500 rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                                <h2 className="text-2xl font-semibold mb-2">
                                    {editingCustomerId ? "Edit Student Information ?" : "Add Student Details ?"}
                                </h2>
                                <p className="text-sm text-gray-700 mb-6">
                                    {editingCustomerId
                                        ? "Update Student Details to keep your Profile Accurate"
                                        : "Stay organized by keeping all student information in one place."}
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

                        {/* EDIT / SAVE ICON */}
                        <div className="flex justify-end items-center mt-6">
                            {editingCustomerId !== null && !isEditable ? (
                                <button
                                    onClick={() => setIsEditable(true)}
                                    className="flex justify-center items-center w-20 px-4 py-2 bg-[#2143BE] text-white hover:bg-[#4E6CDA] rounded-2xl text-center"
                                >
                                    <Pencil />
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
                        <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                            {/* NAME */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Name</h3>
                                <input
                                    type="text"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                                        } rounded-xl p-2 mb-3`}
                                    value={formData.name}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Email</h3>
                                <input
                                    type="email"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                                        } rounded-xl p-2 mb-3`}
                                    value={formData.email}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            {/* PHONE */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Phone</h3>
                                <input
                                    type="tel"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                                        } rounded-xl p-2 mb-3`}
                                    value={formData.phone}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            {/* CITY */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">City</h3>
                                <input
                                    type="text"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                                        } rounded-xl p-2 mb-3`}
                                    value={formData.city}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>

                            {/* REQUIREMENT */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Requirement</h3>
                                <input
                                    type="text"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                                        } rounded-xl p-2 mb-3`}
                                    value={formData.requirement}
                                    disabled={!isEditable}
                                    onChange={(e) =>
                                        setFormData({ ...formData, requirement: e.target.value })
                                    }
                                />
                            </div>

                            {/* ADDRESS */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Address</h3>
                                <textarea
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"
                                        } rounded-xl p-2 mb-3`}
                                    value={formData.address}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setEditingCustomerId(null);
                                    setIsEditable(false);
                                }}
                                className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl"
                            >
                                Cancel
                            </button>

                            {editingCustomerId !== null && !isEditable ? (
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
            )}

        </div>
    )
}

export default Customers