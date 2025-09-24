"use client"
import React, { useEffect, useState } from 'react'
import { apiUrl } from '@/utils/config';
import TextHeading from '../ui/textheader/TextHeader';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { PencilIcon } from '@/icons';
import { DocsIcon, Pencil } from '@/icons';

interface Complaint {
    id: number;
    ticketname: string;
    ticketdesc: string;
    reporteremail: string;
    reporterphone: string;
    status: string;
    createdate: string;
    ticketcomment: string;
    closed: boolean;
}

function Support() {
    const [complaintData, setComplaintData] = useState<Complaint[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState<any>({
        ticketname: "",
        ticketdesc: "",
        reporteremail: "",
        reporterphone: "",
        status: "",
        ticketcomment: "",
        closed: false,
    });

    useEffect(() => {
        fetchComplaintList();
    }, []);

    const fetchComplaintList = async () => {
        try {
            const staffDataString = localStorage.getItem("staffData");
            const staffData = staffDataString ? JSON.parse(staffDataString) : null;
            const jwt = localStorage.getItem("jwt");
            const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

            if (vendorid && jwt) {
                const res = await fetch(
                    `${apiUrl}/api/vendorsupports?filters[vendoruuid][$eq]=${vendorid}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                );

                const data = await res.json();
                const complaintList: Complaint[] = data.data.map((item: any) => ({
                    id: item.id,
                    ticketname: item.attributes.ticketname || "N/A",
                    ticketdesc: item.attributes.ticketdesc || "N/A",
                    reporteremail: item.attributes.reporteremail || "N/A",
                    reporterphone: item.attributes.reporterphone || "N/A",
                    status: item.attributes.status || "N/A",
                    createdate: item.attributes.createdate || "N/A",
                    ticketcomment: item.attributes.ticketcomment || "N/A",
                    closed: item.attributes.closed ?? false,
                }));

                setComplaintData(complaintList);
            }
        } catch (error) {
            console.error("Failed to fetch complaint list:", error);
        }
    };

    // Handle Save (Add or Update)
    const handleSave = async () => {
        try {
            const staffDataString = localStorage.getItem("staffData");
            const staffData = staffDataString ? JSON.parse(staffDataString) : null;
            const jwt = localStorage.getItem("jwt");
            const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

            if (!vendorid || !jwt) return alert("Vendor ID or JWT missing!");

            let apiUrlEndpoint = "";
            let method: "POST" | "PUT" = "POST";

            if (editingStudentId) {
                apiUrlEndpoint = `${apiUrl}/api/vendorsupports/${editingStudentId}`;
                method = "PUT";
            } else {
                apiUrlEndpoint = `${apiUrl}/api/vendorsupports`;
                method = "POST";
            }

            const payload = {
                data: {
                    ...formData,
                    vendoruuid: vendorid,
                },
            };

            const res = await fetch(apiUrlEndpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("Save Response:", data);

            if (editingStudentId) {
                setComplaintData((prev) =>
                    prev.map((item) =>
                        item.id === editingStudentId ? { ...item, ...formData } : item
                    )
                );
            } else {
                setComplaintData((prev) => [
                    ...prev,
                    {
                        id: data.data.id,
                        ...formData,
                    },
                ]);
            }

            setShowModal(false);
            setEditingStudentId(null);
            setIsEditable(false);
        } catch (error) {
            console.error("Failed to save complaint:", error);
            alert("Error saving complaint.");
        }
    };

    // Handle Edit button
    const handleEdit = (complaint: Complaint) => {
        setEditingStudentId(complaint.id);
        setFormData({ ...complaint });
        setIsEditable(false);
        setShowModal(true);
    };

    // Handle Add button
    const handleAdd = () => {
        setEditingStudentId(null);
        setFormData({
            ticketname: "",
            ticketdesc: "",
            reporteremail: "",
            reporterphone: "",
            status: "",
            ticketcomment: "",
            closed: false,
        });
        setIsEditable(true);
        setShowModal(true);
    };
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("hide-app-layout");
        } else {
            document.body.classList.remove("hide-app-layout");
        }
        return () => document.body.classList.remove("hide-app-layout");
    }, [showModal]);

    return (
        <div>
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="Support"
                    icon="🎧"
                    buttonprops={{
                        buttonText: '+',
                        title: 'Support',
                        content: 'Here you can manage support tickets.',
                        onClick: handleAdd,
                    }}
                />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Ticket Name</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email & Phone</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Ticket Description</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Create Date</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Ticket Comment</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Closed</TableCell>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Edit</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {complaintData.map((complaint) => (
                                    <TableRow
                                        key={complaint.id}
                                        className={`  ${complaint.closed
                                            ? "bg-gray-200 text-gray-400 pointer-events-none opacity-70"
                                            : "bg-green-50 text-gray-800"
                                            }`}
                                    >
                                        <TableCell className="px-5 py-6 sm:px-6 text-start">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 overflow-hidden rounded-lg">
                                                    <img src={`https://ui-avatars.com/api/?name=${complaint.ticketname}&background=random`} alt={complaint.ticketname} />
                                                </div>
                                                <div>
                                                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">{complaint.ticketname}</span>
                                                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">{complaint.status}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex flex-col px-4 py-3 mt-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            <span className="text-blue-600 font font-bold">{complaint.reporteremail}</span>
                                            <span className="font-bold">{complaint.reporterphone}</span>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{complaint.ticketdesc}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{complaint.createdate}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{complaint.ticketcomment}</TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            <span className={`w-3 h-3 rounded-full inline-block ${complaint.closed ? "bg-red-500" : "bg-green-500"}`} />
                                        </TableCell>
                                        <TableCell>
                                            <button className="ps-6 flex justify-end text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" onClick={() => handleEdit(complaint)}>
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
                <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto">
                        <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4 rounded-3xl">
                            <div className="bg-[#DDE6FA] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                                <h2 className="text-2xl font-semibold mb-2 text-gray-500">
                                    {editingStudentId ? "Edit Support Ticket ?" : "Add Support Ticket ?"}
                                </h2>
                                <p className="text-sm text-gray-700 mb-6">
                                    {editingStudentId
                                        ? "Update ticket details to keep your support system accurate"
                                        : "Add new ticket information to manage support efficiently."}
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

                        {/* Form */}
                        <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {/* Ticket Name */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Ticket Name</h3>
                                <input
                                    type="text"
                                    placeholder="Ticket Name"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100 rounded-xl p-2 mb-3" : "bg-white rounded-xl p-2 mb-3"
                                        }`}
                                    value={formData.ticketname}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, ticketname: e.target.value })}
                                />
                            </div>
                            {/* create Date */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Ticket Date</h3>
                                <input
                                    type="date"
                                    className="w-full border-2 bg-white rounded-xl p-2 mb-3"
                                    value={formData.createdate}
                                    onChange={(e) => setFormData({ ...formData, createdate: e.target.value })}
                                />
                            </div>

                            {/* Ticket Description */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Ticket Description</h3>
                                <textarea
                                    placeholder="Ticket Description"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100 rounded-xl p-2 mb-3" : "bg-white rounded-xl p-2 mb-3"
                                        }`}
                                    value={formData.ticketdesc}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, ticketdesc: e.target.value })}
                                />
                            </div>

                            {/* Reporter Email */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Reporter Email</h3>
                                <input
                                    type="email"
                                    placeholder="Reporter Email"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100 rounded-xl p-2 mb-3" : "bg-white rounded-xl p-2 mb-3"
                                        }`}
                                    value={formData.reporteremail}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, reporteremail: e.target.value })}
                                />
                            </div>

                            {/* Reporter Phone */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Reporter Phone</h3>
                                <input
                                    type="tel"
                                    placeholder="Reporter Phone"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100 rounded-xl p-2 mb-3" : "bg-white rounded-xl p-2 mb-3"
                                        }`}
                                    value={formData.reporterphone}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, reporterphone: e.target.value })}
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Status</h3>
                                <input
                                    type="text"
                                    placeholder="Status"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100 rounded-xl p-2 mb-3" : "bg-white rounded-xl p-2 mb-3"
                                        }`}
                                    value={formData.status}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                />
                            </div>

                            {/* Ticket Comment */}
                            <div>
                                <h3 className="text-gray-700 text-base font-bold pb-2">Ticket Comment</h3>
                                <textarea
                                    placeholder="Ticket Comment"
                                    className={`w-full border-2 ${!isEditable ? "bg-gray-100 rounded-xl p-2 mb-3" : "bg-white rounded-xl p-2 mb-3"
                                        }`}
                                    value={formData.ticketcomment}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, ticketcomment: e.target.value })}
                                />
                            </div>

                            {/* Closed */}
                            <div className="flex items-center mt-8">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={formData.closed}
                                    disabled={!isEditable}
                                    onChange={(e) => setFormData({ ...formData, closed: e.target.checked })}
                                />
                                <label className="text-gray-700">Closed</label>
                            </div>
                        </div>

                        {/* Modal Buttons */}
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
    )
}

export default Support;
