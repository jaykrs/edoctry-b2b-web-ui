"use client";

import React, { useEffect, useState } from "react";
import { DocsIcon, Pencil, EyeIcon } from "@/icons/index";

interface Invoice {
    id: number;
    customeremail: string;
    course: string;
    invoicedate: string;
    invoiceamount: number;
    invoicetax: number;
    invoicetotal: number;
    inovicediscount: number;
    invoicedescription: string;
    paidstatus: boolean;
    paiddate: string;
    transactionid: string;
}

const initialForm: Omit<Invoice, "id"> = {
    customeremail: "",
    course: "",
    invoicedate: "",
    invoiceamount: 0,
    invoicetax: 0,
    invoicetotal: 0,
    inovicediscount: 0,
    invoicedescription: "",
    paidstatus: false,
    paiddate: "",
    transactionid: "",
};

function Invoice() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editInvoiceId, setEditInvoiceId] = useState<number | null>(null);
    const [formData, setFormData] = useState(initialForm);

    const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : "";

    const fetchInvoices = async () => {
        try {
            const res = await fetch("https://api.edoctry.com/api/invoices", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const data = await res.json();
            const formatted = data.data.map((item: any) => ({
                id: item.id,
                ...item.attributes,
            }));
            setInvoices(formatted);
        } catch (err) {
            console.error("Error fetching invoices:", err);
        }
    };

    const handleSubmit = async () => {
        const url = editInvoiceId
            ? `https://api.edoctry.com/api/invoices/${editInvoiceId}`
            : "https://api.edoctry.com/api/invoices";
        const method = editInvoiceId ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({ data: formData }),
            });

            const result = await res.json();
            if (res.status === 403) {
                console.error("🔒 Forbidden: You are not authorized to perform this action.");
                return;
            }
            if (res.status === 400) {
                console.error("❌ Bad Request:", result);
                return;
            }
            if (res.ok) {
                fetchInvoices();
                setShowModal(false);
                setFormData(initialForm);
                setEditInvoiceId(null);
            } else {
                console.error(result);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const openEdit = (invoice: Invoice) => {
        setFormData({ ...invoice });
        setEditInvoiceId(invoice.id);
        setShowModal(true);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("hide-app-layout");
        } else {
            document.body.classList.remove("hide-app-layout");
        }
        return () => document.body.classList.remove("hide-app-layout");
    }, [showModal]);

    return (
        <div className="bg-gradient-to-b from-[#EEEDF6] to-[#C0BDC8] shadow-md rounded-2xl p-8">
            <div className="flex justify-between items-center bg-[#DDE6FA] rounded-2xl p-4 mb-6">
                <h2 className="text-2xl font-bold text-[#2143BE] uppercase font-mono">Invoices</h2>
                <button
                    onClick={() => {
                        setEditInvoiceId(null);
                        setFormData(initialForm);
                        setShowModal(true);
                    }}
                    className="bg-[#2143BE] text-white text-2xl px-4 py-2 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
                >
                    <Pencil />
                </button>
            </div>

            <div className="space-y-4 overflow-x-auto h-[400px] pr-2">
                {invoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="min-w-[1024px] bg-gradient-to-b from-[#EEEDF4] to-[#DBDAE5] rounded-2xl shadow-md flex items-center justify-between px-6 py-4 hover:shadow-lg"
                    >
                        {/* Avatar + Info */}
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(invoice.customeremail)}&background=random&color=fff`}
                                    alt={invoice.customeremail}
                                    className="rounded-xl object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800 text-sm">
                                    {invoice.customeremail}
                                </div>
                                <div className="text-xs text-gray-500">{invoice.course}</div>
                                <div className="text-xs text-gray-500">{invoice.invoicedescription}</div>
                            </div>
                        </div>

                        {/* Date + Amounts */}
                        <div className="flex items-center space-x-12 text-sm text-gray-600">
                            <div>{invoice.invoicedate}</div>
                            <div>{invoice.invoiceamount}</div>
                            <div className="text-black font-medium">{invoice.invoicetotal}</div>
                            <div>
                                <span
                                    className={`w-3 h-3 rounded-full inline-block ${invoice.paidstatus ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center space-x-2 ml-4">
                            <button
                                onClick={() => openEdit(invoice)}
                                className="bg-gray-50 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                            >
                                <EyeIcon />
                            </button>
                            <button
                                onClick={() => openEdit(invoice)}
                                className="bg-gray-50 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                            >
                                <DocsIcon />
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-80 z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
                        >
                            ×
                        </button>

                        <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4  rounded-3xl">
                            <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                                <h2 className="text-2xl font-semibold mb-2">{editInvoiceId ? "Edit Invoice" : "Add Invoice"}</h2>
                                <p className="text-sm text-blue-100 mb-6">
                                    {editInvoiceId ? "Update Invoice Details to keep your Profile Accurate" : "Stay organized by keeping all invoice information in one place."}
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


                        <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {Object.entries(formData).map(([key, value]) => {
                                if (key === "paidstatus") {
                                    return (
                                        <div key={key} className="flex items-center space-x-2 col-span-2">
                                            <input
                                                type="checkbox"
                                                checked={!!value}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.checked }))}
                                            />
                                            <label>{key}</label>
                                        </div>
                                    );
                                }

                                const isNumberField = [
                                    "invoiceamount",
                                    "invoicetax",
                                    "invoicetotal",
                                    "inovicediscount",
                                ].includes(key);

                                return (
                                    <div>
                                        <label className="text-gray-700 text-base font-bold pb-2 mb-1 capitalize">{key.replace(/_/g, " ")}</label>
                                        <input
                                            key={key}
                                            type={isNumberField ? "number" : "text"}
                                            placeholder={key}
                                            value={value ?? ""}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    [key]: isNumberField ? parseFloat(e.target.value) || 0 : e.target.value,
                                                }))
                                            }
                                            className="w-full border-2 bg-white rounded-xl p-2 mb-3"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
                                                        <button
                                onClick={() => {
                                    setShowModal(false);
                                }}
                                className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl text-center"
                            >
                                Cancel
                            </button>
                        <button
                            onClick={handleSubmit}
                                className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-2xl text-center"
                        >
                            {editInvoiceId ? "Update Invoice" : "Add Invoice"}
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Invoice;
