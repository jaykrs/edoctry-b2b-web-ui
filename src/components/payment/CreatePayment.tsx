"use client";

import React, { useState } from "react";
import { apiUrl } from "@/utils/config";
import { useRouter } from "next/navigation";

export default function CreatePayment() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    vendorId: "",
    invoiceid: "",
    studentid: "",
    customerid: "",
    from: "",
    product: "",
    price: "",
    tax: "",
    method: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${apiUrl}/api/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            data: formData,
          }),
        }
      );

      const errorData = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        console.log(
          "PAYMENT CREATE ERROR:",
          errorData
        );

        throw new Error(
          errorData?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      console.log(
        "Payment Created Successfully:",
        errorData
      );

      alert("Payment created successfully!");

      router.push("/admin/payment");
    } catch (err) {
      console.error("Create Payment Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Header */}
        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Payment
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create a new payment record.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Vendor ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Vendor ID
              </label>

              <input
                type="text"
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                placeholder="Enter vendor ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Invoice ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Invoice ID
              </label>

              <input
                type="text"
                name="invoiceid"
                value={formData.invoiceid}
                onChange={handleChange}
                placeholder="Enter invoice ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Student ID
              </label>

              <input
                type="text"
                name="studentid"
                value={formData.studentid}
                onChange={handleChange}
                placeholder="Enter student ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Customer ID */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Customer ID
              </label>

              <input
                type="text"
                name="customerid"
                value={formData.customerid}
                onChange={handleChange}
                placeholder="Enter customer ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* From */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                From
              </label>

              <select
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">
                  Select source
                </option>

                <option value="student">
                  Student
                </option>

                <option value="customer">
                  Customer
                </option>

                <option value="vendor">
                  Vendor
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* Product */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product
              </label>

              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter product"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Tax */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tax
              </label>

              <input
                type="text"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                placeholder="Enter tax"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Payment Method
              </label>

              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">
                  Select payment method
                </option>

                <option value="online">
                  Online
                </option>

                <option value="offline">
                  Offline
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                <option value="">
                  Select status
                </option>

                <option value="unpaid">
                  Unpaid
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="process">
                  Process
                </option>
              </select>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={() =>
                router.push("/admin/payment")
              }
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Payment"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}