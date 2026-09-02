"use client";

import React, { useState } from "react";
import { apiUrl } from "@/utils/config";

interface FeeInvoiceProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  feeStructure?: any;
}

export default function FeeInvoice({
  onNext,
  onBack,
  data,
  feeStructure,
}: FeeInvoiceProps) {
  const [vendoruuid, setVendoruuid] = useState(
    data?.vendoruuid || ""
  );

  const [invoiceNumber, setInvoiceNumber] = useState(
    data?.invoiceNumber || ""
  );

  const [billingPeriod, setBillingPeriod] = useState(
    data?.billingPeriod || ""
  );

  const [dueDate, setDueDate] = useState(
    data?.dueDate || ""
  );

  const [subTotal, setSubTotal] = useState(
    data?.subTotal !== undefined
      ? String(data.subTotal)
      : ""
  );

  const [discountTotal, setDiscountTotal] = useState(
    data?.discountTotal !== undefined
      ? String(data.discountTotal)
      : "0"
  );

  const [lateFee, setLateFee] = useState(
    data?.lateFee !== undefined
      ? String(data.lateFee)
      : "0"
  );

  const [amountPaid, setAmountPaid] = useState(
    data?.amountPaid !== undefined
      ? String(data.amountPaid)
      : "0"
  );

  const [status, setStatus] = useState(
    data?.status || "UNPAID"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculatedNetAmount =
    (Number(subTotal) || 0) -
    (Number(discountTotal) || 0) +
    (Number(lateFee) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!vendoruuid.trim()) {
      setError("Vendor UUID is required.");
      return;
    }

    if (!invoiceNumber.trim()) {
      setError("Invoice Number is required.");
      return;
    }

    if (!billingPeriod.trim()) {
      setError("Billing Period is required.");
      return;
    }

    if (!dueDate) {
      setError("Due Date is required.");
      return;
    }

    if (!subTotal.trim()) {
      setError("Sub Total is required.");
      return;
    }

    if (calculatedNetAmount < 0) {
      setError("Net Amount cannot be negative.");
      return;
    }

    if (!feeStructure?.id) {
      setError(
        "Fee Structure is missing. Please go back to Step 2."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${apiUrl}/api/fee-invoices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              vendoruuid: vendoruuid.trim(),
              invoiceNumber: invoiceNumber.trim(),
              billingPeriod: billingPeriod.trim(),
              dueDate,
              subTotal: Number(subTotal),
              discountTotal: Number(discountTotal) || 0,
              lateFee: Number(lateFee) || 0,
              netAmount: calculatedNetAmount,
              amountPaid: Number(amountPaid) || 0,
              status,
              fee_structure: feeStructure.id,
            },
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      console.log("Fee Invoice created:", result);

      onNext(result?.data);
    } catch (err: any) {
      console.error(
        "Fee Invoice API Error:",
        err
      );

      setError(
        err?.message ||
          "Failed to create Fee Invoice."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          Invoice
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Create a student fee invoice.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Vendor UUID */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Vendor UUID
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              value={vendoruuid}
              onChange={(e) =>
                setVendoruuid(e.target.value)
              }
              placeholder="Enter Vendor UUID"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Invoice Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Invoice Number
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) =>
                setInvoiceNumber(e.target.value)
              }
              placeholder="e.g. INV-2026-001"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Billing Period */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Billing Period
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              value={billingPeriod}
              onChange={(e) =>
                setBillingPeriod(e.target.value)
              }
              placeholder="e.g. July 2026"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Due Date
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Sub Total */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Sub Total
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={subTotal}
              onChange={(e) =>
                setSubTotal(e.target.value)
              }
              placeholder="Enter sub total"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Discount Total
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={discountTotal}
              onChange={(e) =>
                setDiscountTotal(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Late Fee */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Late Fee
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={lateFee}
              onChange={(e) =>
                setLateFee(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Amount Paid */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount Paid
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={amountPaid}
              onChange={(e) =>
                setAmountPaid(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="UNPAID">UNPAID</option>
              <option value="PARTIALLY_PAID">
                PARTIALLY_PAID
              </option>
              <option value="PAID">PAID</option>
              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>
          </div>

          {/* Fee Structure */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fee Structure
            </label>

            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
              {feeStructure?.attributes?.name ||
                feeStructure?.name ||
                "Fee Structure not available"}
            </div>
          </div>

          {/* Net Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Net Amount
            </label>

            <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
              {calculatedNetAmount.toFixed(2)}
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Sub Total - Discount + Late Fee
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save & Next"}
          </button>
        </div>
      </form>
    </div>
  );
}