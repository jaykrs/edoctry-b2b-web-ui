"use client";
import React, { useEffect, useState } from "react";
import { DocsIcon, Pencil } from "@/icons/index";
import { apiUrl } from "@/utils/config";

interface Order {
    id: number;
    customeremail: string;
    courseid: number;
    sourceip: string | null;
    amount: number;
    payment_status: boolean;
    transactionid: string | null;
    payment_method: string | null;
    remarks: string | null;
    createdAt: string;
    updatedAt: string;
    course_logo: string;
    course_title: string;
    oderid: string;
    country: string;
    state: string;
    address: string;
    instructor: string;
}

const initialForm: Omit<Order, "id"> = {
    customeremail: "",
    courseid: 0,
    sourceip: "",
    amount: 0,
    payment_status: false,
    transactionid: "",
    payment_method: "",
    remarks: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    course_logo: "",
    course_title: "",
    oderid: "",
    country: "",
    state: "",
    address: "",
    instructor: "",
};

function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editOrderId, setEditOrderId] = useState<number | null>(null);
    const [formData, setFormData] = useState(initialForm);

    const jwt = typeof window !== "undefined" ? localStorage.getItem("jwt") : "";

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/orders`, {
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
            setOrders(formatted);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    const handleSubmit = async () => {
        const url = editOrderId
            ? `${apiUrl}/api/orders/${editOrderId}`
            : `${apiUrl}/api/orders`;
        const method = editOrderId ? "PUT" : "POST";

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
            if (res.ok) {
                fetchOrders();
                setShowModal(false);
                setFormData(initialForm);
                setEditOrderId(null);
            } else {
                console.error(result);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const openEdit = (order: Order) => {
        setFormData({ ...order });
        setEditOrderId(order.id);
        setShowModal(true);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // ✅ Toggle body class to hide global header/footer
    useEffect(() => {
        if (showModal) {
            document.body.classList.add("hide-app-layout");
        } else {
            document.body.classList.remove("hide-app-layout");
        }
        return () => document.body.classList.remove("hide-app-layout");
    }, [showModal]);

    return (
        <div className="p-8 bg-gradient-to-b from-[#EEEDF6] to-[#C0BDC8] rounded-2xl">
            <div className="flex justify-between items-center bg-[#DDE6FA] rounded-2xl p-4 mb-6">
                <h2 className="text-2xl font-bold text-[#2143BE] uppercase font-mono">Orders</h2>
                <button
                    onClick={() => {
                        setEditOrderId(null);
                        setFormData(initialForm);
                        setShowModal(true);
                    }}
                    className="bg-[#2143BE] text-white text-2xl px-4 py-2 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
                >
                    <Pencil />
                </button>
            </div>

            {/* Order list */}
            <div className="space-y-4 overflow-x-auto h-[400px] pr-2">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-gradient-to-b from-[#EEEDF4] to-[#DBDAE5] rounded-2xl shadow-md flex items-center justify-between px-6 py-4 hover:shadow-lg"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14">
                                <img
                                    src={
                                        order.course_logo
                                            ? order.course_logo
                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customeremail)}&background=random&color=fff`
                                    }
                                    alt={order.customeremail}
                                    className="rounded-xl object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-800 text-sm">{order.customeremail}</div>
                                <div className="text-xs text-gray-500">{order.course_title}</div>
                                <div className="text-xs text-gray-500">{order.instructor}</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-12 text-sm text-gray-600">
                            <div>{order.oderid}</div>
                            <div>{order.amount}</div>
                            <div className="text-black font-medium">{order.payment_method}</div>
                            <div>
                                <span
                                    className={`w-3 h-3 rounded-full inline-block ${order.payment_status ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => openEdit(order)}
                            className="ml-4 bg-gray-50 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            <DocsIcon />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-80 z-[9999] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto relative">
                        {/* <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black"
                        >
                            ×
                        </button> */}
                        <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4  rounded-3xl">
                            <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                                <h2 className="text-2xl font-semibold mb-2">{editOrderId ? "Edit Order" : "Add Order"}</h2>
                                <p className="text-sm text-blue-100 mb-6">
                                    {editOrderId ? "Update Order Details to keep your Profile Accurate" : "Stay organized by keeping all order information in one place."}
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
                                if (key === "payment_status") {
                                    return (
                                        <div
                                            key={key}
                                            className="flex items-center space-x-2 w-full col-span-1 md:col-span-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={!!value}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({ ...prev, [key]: e.target.checked }))
                                                }
                                            />
                                            <label className="text-gray-700 font-medium">{key}</label>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={key} className="flex flex-col w-full">
                                        <label className="text-gray-700 text-base font-bold pb-2 mb-1 capitalize">{key.replace(/_/g, " ")}</label>
                                        <input
                                            type="text"
                                            placeholder={key}
                                            value={value || ""}
                                            onChange={(e) =>
                                                setFormData((prev) => ({ ...prev, [key]: e.target.value }))
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
                                {editOrderId ? "Update Order" : "Add Order"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderPage;
