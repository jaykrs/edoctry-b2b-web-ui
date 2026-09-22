"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiUrl } from "@/utils/config";

interface FeeInvoiceData {
  invoiceNumber?: string;
  billingPeriod?: string;
  dueDate?: string;
  subTotal?: number | string;
  discountTotal?: number | string;
  lateFee?: number | string;
  netAmount?: number | string;
  amountPaid?: number | string;
  status?: string;
}

export default function EditFeeInvoicePage() {
  const params = useParams();
  const router = useRouter();

  const invoiceId = params?.id;

  const [formData, setFormData] = useState<FeeInvoiceData>({
    invoiceNumber: "",
    billingPeriod: "",
    dueDate: "",
    subTotal: "",
    discountTotal: "",
    lateFee: "",
    netAmount: "",
    amountPaid: "",
    status: "DRAFT",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     FETCH INVOICE
  ========================================================= */
  useEffect(() => {
    if (!invoiceId) return;

    const fetchInvoice = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${apiUrl}/api/fee-invoices/${invoiceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        console.log("Edit Fee Invoice API Response:", result);

        const data = result?.data;
        const attributes = data?.attributes || data || {};

        setFormData({
          invoiceNumber: attributes.invoiceNumber || "",
          billingPeriod: attributes.billingPeriod || "",
          dueDate: attributes.dueDate || "",
          subTotal: attributes.subTotal ?? "",
          discountTotal: attributes.discountTotal ?? "",
          lateFee: attributes.lateFee ?? "",
          netAmount: attributes.netAmount ?? "",
          amountPaid: attributes.amountPaid ?? "",
          status: attributes.status || "DRAFT",
        });
      } catch (err) {
        console.error("Error fetching fee invoice:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch fee invoice"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  /* =========================================================
     UPDATE INVOICE
  ========================================================= */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!invoiceId) {
      setError("Invoice ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        data: {
          invoiceNumber: formData.invoiceNumber,
          billingPeriod: formData.billingPeriod,
          dueDate: formData.dueDate,
          subTotal:
            formData.subTotal === ""
              ? 0
              : Number(formData.subTotal),
          discountTotal:
            formData.discountTotal === ""
              ? 0
              : Number(formData.discountTotal),
          lateFee:
            formData.lateFee === ""
              ? 0
              : Number(formData.lateFee),
          netAmount:
            formData.netAmount === ""
              ? 0
              : Number(formData.netAmount),
          amountPaid:
            formData.amountPaid === ""
              ? 0
              : Number(formData.amountPaid),
          status: formData.status,
        },
      };

      console.log("Update Fee Invoice Payload:", payload);

      const response = await fetch(
        `${apiUrl}/api/fee-invoices/${invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      console.log("Update Fee Invoice Response:", result);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      setSuccess("Fee Invoice updated successfully.");

      setTimeout(() => {
        router.push("/admin/fee-invoice");
      }, 1000);
    } catch (err) {
      console.error("Error updating fee invoice:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update fee invoice"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */
  if (loading) {
    return (
      <div className="w-full px-4 py-10">
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading fee invoice...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* =====================================================
          TOP DARK HEADER
      ===================================================== */}
      <div className="w-full border-b border-white/10 bg-[#0f172a]">
        <div className="flex min-h-[54px] items-center justify-between px-6">
          <h1 className="text-xl font-medium text-white">
            Fee Invoice
          </h1>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">
              Home
            </span>

            <span className="text-gray-500">
              ›
            </span>

            <span className="text-gray-400">
              Fee Invoice
            </span>

            <span className="text-gray-500">
              ›
            </span>

            <span className="text-white">
              Edit
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="w-full px-3 pb-8 pt-5 sm:px-5 lg:px-6">
        {/* ===================================================
            HERO
        =================================================== */}
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-white/10
            bg-gradient-to-r
            from-slate-900
            via-purple-200
            to-slate-700
            px-6
            py-7
            shadow-sm
            sm:px-8
          "
        >
          <div className="pointer-events-none absolute inset-0 bg-white/10" />

          <div className="relative flex items-center gap-4">
            <span className="text-3xl">
              🎓
            </span>

            <div>
              <h2
                className="
                  text-2xl
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-600
                  sm:text-3xl
                "
              >
                Edit Fee Invoice
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update fee invoice details
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            ERROR
        =================================================== */}
        {error && (
          <div
            className="
              mt-5
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* ===================================================
            SUCCESS
        =================================================== */}
        {success && (
          <div
            className="
              mt-5
              rounded-lg
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              text-green-600
            "
          >
            {success}
          </div>
        )}

        {/* ===================================================
            FORM
        =================================================== */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-5
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-7
          "
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Invoice Number */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Invoice Number
              </label>

              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber || ""}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Billing Period */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Billing Period
              </label>

              <input
                type="text"
                name="billingPeriod"
                value={formData.billingPeriod || ""}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate || ""}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Sub Total */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Sub Total
              </label>

              <input
                type="number"
                name="subTotal"
                value={formData.subTotal ?? ""}
                onChange={handleChange}
                step="0.01"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Discount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Discount
              </label>

              <input
                type="number"
                name="discountTotal"
                value={formData.discountTotal ?? ""}
                onChange={handleChange}
                step="0.01"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Late Fee */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Late Fee
              </label>

              <input
                type="number"
                name="lateFee"
                value={formData.lateFee ?? ""}
                onChange={handleChange}
                step="0.01"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Net Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Net Amount
              </label>

              <input
                type="number"
                name="netAmount"
                value={formData.netAmount ?? ""}
                onChange={handleChange}
                step="0.01"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Amount Paid
              </label>

              <input
                type="number"
                name="amountPaid"
                value={formData.amountPaid ?? ""}
                onChange={handleChange}
                step="0.01"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status || "DRAFT"}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              >
                <option value="DRAFT">
                  DRAFT
                </option>

                <option value="UNPAID">
                  UNPAID
                </option>

                <option value="PARTIALLY_PAID">
                  PARTIALLY PAID
                </option>

                <option value="PAID">
                  PAID
                </option>

                <option value="CANCELLED">
                  CANCELLED
                </option>
              </select>
            </div>
          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}
          <div
            className="
              mt-7
              flex
              flex-col
              gap-3
              border-t
              border-gray-200
              pt-5
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={() => router.push("/admin/fee-invoice")}
              disabled={saving}
              className="
                rounded-lg
                border
                border-gray-300
                px-5
                py-2.5
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                rounded-lg
                bg-blue-600
                px-6
                py-2.5
                text-sm
                font-medium
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving
                ? "Updating..."
                : "Update Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}