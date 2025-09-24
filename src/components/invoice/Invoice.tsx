"use client";
import React, { useEffect, useState } from "react";
import { DocsIcon, Pencil, EyeIcon, DownloadIcon, PencilIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";
import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableRow, TableBody } from "../ui/table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



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
            const res = await fetch(`${apiUrl}/api/invoices`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            });
            const data = await res.json();
            console.log("Fetched Invoices:", data);
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
            ? `${apiUrl}/api/invoices/${editInvoiceId}`
            : `${apiUrl}/api/invoices`;
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

    const generatePDF = (invoice: any) => {
        const doc = new jsPDF();

        // ---- LocalStorage se data fetch karo ----
        const staffDataStr = localStorage.getItem("staffData");
        let vendorName = "Name not provided";
        let vendorEmail = "Email not provided";
        let vendorPhone = "Phone not provided";
        let vendorAddress = "Address not provided";
        let vendorWebsite = "Website not provided";


        if (staffDataStr) {
            try {
                const staffData = JSON.parse(staffDataStr);
                if (staffData.data && staffData.data.length > 0) {
                    const vendor = staffData.data[0].attributes;
                    vendorName = vendor.name || vendorName;
                    vendorEmail = vendor.email || vendorEmail;
                    vendorPhone = vendor.phone || vendorPhone;
                    vendorAddress = vendor.address || vendorAddress;
                    vendorWebsite = vendor.website || vendorWebsite;
                }
            } catch (err) {
                console.error("Error parsing staffData from localStorage", err);
            }
        }

        // -------- Header --------
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`${vendorName}`, 14, 20);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Address: ${vendorAddress}`, 14, 26);
        doc.text(`Phone: ${vendorPhone}   Email: ${vendorEmail}`, 14, 32);
        doc.text(`Website: ${vendorWebsite}`, 14, 38);

        doc.setFontSize(22);
        doc.setTextColor(200, 70, 40);
        doc.text("Invoice", 170, 20);

        doc.setTextColor(0, 0, 0);


        // -------- Invoice Info --------
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`Invoice Number: ${invoice.id || "01234"}`, 14, 50);
        doc.text("BILL TO:", 120, 50);

        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${invoice.invoicedate}`, 14, 60);
        doc.text(`Due Date: ${invoice.paiddate}`, 14, 66);

        doc.text(`${invoice.customeremail}`, 120, 60);
        doc.text("Ginyard International Co.", 120, 66);

        // -------- Table (Description of Services) --------
        autoTable(doc, {
            startY: 80,
            head: [["Item", "Description", "Quantity", "Unit Price", "Total"]],
            body: [
                [
                    "001",
                    invoice.invoicedescription,
                    "1",
                    `₹${invoice.invoiceamount}`,
                    `₹${invoice.invoiceamount}`,
                ],
            ],
            theme: "grid",
            styles: { fontSize: 10 },
            headStyles: { fillColor: [255, 153, 51] }, // orange header
        });

        // -------- Totals --------
        // ---- Totals Section ----
        let finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFont("helvetica", "bold");
        doc.text(`Subtotal: ₹${invoice.invoiceamount || 0}`, 150, finalY);
        doc.text(`Tax: ₹${invoice.invoicetax || 0}`, 150, finalY + 6);
        doc.text(`Discount: ₹${invoice.inovicediscount || 0}`, 150, finalY + 12);
        doc.text(`Total Amount Due: ₹${invoice.invoicetotal || 0}`, 150, finalY + 18);

        // ---- Footer ----
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        let vendorFooterName = "Vendor name not provided";
        let vendorFooterAddress = "Vendor address not provided";
        let vendorBankDetails = "Bank details not provided";

        if (staffDataStr) {
            try {
                const staffData = JSON.parse(staffDataStr);
                if (staffData.data && staffData.data.length > 0) {
                    const vendor = staffData.data[0].attributes;
                    vendorFooterName = vendor.name || vendorFooterName;
                    vendorFooterAddress = vendor.address || vendorFooterAddress;
                    vendorBankDetails = vendor.bankDetails || vendorBankDetails;
                }
            } catch (err) {
                console.error("Error parsing staffData from localStorage", err);
            }
        }

        doc.text("Please make checks payable to:", 14, finalY + 20);
        doc.setFont("helvetica", "bold");
        doc.text(vendorFooterName, 14, finalY + 26);
        doc.setFont("helvetica", "normal");
        doc.text(vendorFooterAddress, 14, finalY + 32);
        doc.text(vendorBankDetails, 14, finalY + 42);

        doc.setFont("helvetica", "bold");
        doc.text(`Thank you for choosing ${vendorFooterName}!`, 120, finalY + 48);

        // -------- Save --------
        doc.save(`Invoice_${invoice.id}.pdf`);
    };


    return (
        <div>
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="Invoices"
                    icon="🧾"
                    buttonprops={{
                        buttonText: '+',
                        title: 'Add Invoices',
                        content: 'Here you can add invoices to the system.',
                        onClick: () => {
                            setEditInvoiceId(null);
                            setFormData(initialForm);
                            setShowModal(true);
                        }
                    }}
                />
            </div>
            {/* <div className="flex justify-between items-center bg-[#DDE6FA] rounded-2xl p-4 mb-6">
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
            </div> */}


            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table >
                            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                                <TableRow>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Invoices Details
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Invoice Date
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Amount
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Tax
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Paid Date
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Discount
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Total
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        Paid
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        <DownloadIcon />
                                    </TableCell>
                                    <TableCell
                                        isHeader
                                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                    >
                                        <PencilIcon />
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="px-5 py-4 whitespace-nowrap">
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
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {invoice.invoicedate}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {invoice.invoiceamount}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {invoice.invoicetax}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {invoice.paiddate}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {invoice.inovicediscount}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                            {invoice.invoicetotal}
                                        </TableCell>
                                        <TableCell className="px-5 py-4 whitespace-nowrap">
                                            <span
                                                className={`w-3 h-3 rounded-full inline-block ${invoice.paidstatus ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            />
                                        </TableCell>
                                        <TableCell className="px-5 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => generatePDF(invoice)}
                                                className="bg-gray-50 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                                            >
                                                <DownloadIcon />
                                            </button>
                                        </TableCell>
                                        <TableCell className="px-5 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => openEdit(invoice)}
                                                className="bg-gray-50 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                                            >
                                                <DocsIcon />
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
                <div className="fixed inset-0 bg-gray-300 bg-opacity-80 z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
                        >
                            ×
                        </button>

                        <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4 rounded-3xl">
                            <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                                <h2 className="text-2xl font-semibold text-gray-500 mb-2">{editInvoiceId ? "Edit Invoice" : "Add Invoice"}</h2>
                                <p className="text-sm text-gray-700 mb-6">
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
                                            value={typeof value === "boolean" ? String(value) : value ?? ""}
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
                                className="w-full px-4 py-2 bg-[#1E40AF] text-white hover:bg-[#274bc1] rounded-2xl text-center"

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
