"use client";

import React, { useState } from "react";
import { apiUrl } from "@/utils/config";

interface FeePaymentProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  invoice?: any;
}

export default function FeePayment({
  onNext,
  onBack,
  data,
  invoice,
}: FeePaymentProps) {

  // =====================================================
  // FORM DATA
  // =====================================================

  const [receiptNumber, setReceiptNumber] =
    useState(
      data?.attributes?.receiptNumber ||
        data?.receiptNumber ||
        ""
    );

  const [amount, setAmount] =
    useState(
      data?.attributes?.amount !== undefined
        ? String(data.attributes.amount)
        : data?.amount !== undefined
        ? String(data.amount)
        : ""
    );

  const [paymentMode, setPaymentMode] =
    useState(
      data?.attributes?.paymentMode ||
        data?.paymentMode ||
        ""
    );

  const [gatewayRef, setGatewayRef] =
    useState(
      data?.attributes?.gatewayRef ||
        data?.gatewayRef ||
        ""
    );

  const [paymentDate, setPaymentDate] =
    useState(
      data?.attributes?.paymentDate ||
        data?.paymentDate ||
        ""
    );

  const [remarks, setRemarks] =
    useState(
      data?.attributes?.remarks ||
        data?.remarks ||
        ""
    );

  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // =====================================================
  // GET INVOICE ID
  // =====================================================

  const invoiceId =
    invoice?.id ||
    invoice?.data?.id;

  // =====================================================
  // GET INVOICE NUMBER
  // =====================================================

  const invoiceNumber =
    invoice?.attributes?.invoiceNumber ||
    invoice?.invoiceNumber ||
    invoice?.data?.attributes
      ?.invoiceNumber ||
    invoice?.data?.invoiceNumber ||
    "";

  // =====================================================
  // HANDLE SUBMIT
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    // -----------------------------------------------
    // RESET MESSAGES
    // -----------------------------------------------

    setError("");
    setSuccess("");

    // -----------------------------------------------
    // DEBUG
    // -----------------------------------------------

    console.log(
      "===================================="
    );

    console.log(
      "FEE PAYMENT SUBMIT STARTED"
    );

    console.log(
      "Invoice Object:",
      invoice
    );

    console.log(
      "Invoice ID:",
      invoiceId
    );

    console.log(
      "Invoice Number:",
      invoiceNumber
    );

    console.log(
      "Receipt Number:",
      receiptNumber
    );

    console.log(
      "Amount:",
      amount
    );

    console.log(
      "Payment Mode:",
      paymentMode
    );

    console.log(
      "Payment Date:",
      paymentDate
    );

    console.log(
      "===================================="
    );

    // =================================================
    // VALIDATION
    // =================================================

    if (!receiptNumber.trim()) {
      setError(
        "Receipt Number is required."
      );
      return;
    }

    if (!amount.trim()) {
      setError(
        "Amount is required."
      );
      return;
    }

    if (Number(amount) <= 0) {
      setError(
        "Amount must be greater than 0."
      );
      return;
    }

    if (!paymentMode) {
      setError(
        "Payment Mode is required."
      );
      return;
    }

    if (!paymentDate) {
      setError(
        "Payment Date is required."
      );
      return;
    }

    if (!invoiceId) {
      setError(
        "Fee Invoice is missing. Please go back to Step 4 and save the invoice first."
      );
      return;
    }

    // =================================================
    // API
    // =================================================

    try {

      setLoading(true);

      const token =
        localStorage.getItem("jwt");

      // -----------------------------------------------
      // HEADERS
      // -----------------------------------------------

      const headers: HeadersInit = {
        "Content-Type":
          "application/json",

        Accept:
          "application/json",

        ...(token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {}),
      };

      // -----------------------------------------------
      // PAYLOAD
      // -----------------------------------------------

      const payload = {
        data: {
          receiptNumber:
            receiptNumber.trim(),

          amount:
            Number(amount),

          paymentMode:
            paymentMode,

          gatewayRef:
            gatewayRef.trim() || null,

          paymentDate:
            paymentDate,

          remarks:
            remarks.trim() || null,

          fee_invoice:
            invoiceId,
        },
      };

      console.log(
        "Fee Payment Payload:",
        payload
      );

      // =================================================
      // POST
      // =================================================

      const response =
        await fetch(
          `${apiUrl}/api/fee-payments`,
          {
            method: "POST",
            headers,
            body:
              JSON.stringify(payload),
          }
        );

      // =================================================
      // RESPONSE
      // =================================================

      const result =
        await response.json();

      console.log(
        "Fee Payment API Response:",
        result
      );

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {

        const errorMessage =
          result?.error?.message ||
          result?.message ||
          `HTTP Error: ${response.status}`;

        console.error(
          "Fee Payment API Error:",
          errorMessage
        );

        throw new Error(
          errorMessage
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "===================================="
      );

      console.log(
        "FEE PAYMENT CREATED SUCCESSFULLY"
      );

      console.log(
        "Created Payment:",
        result?.data
      );

      console.log(
        "===================================="
      );

      // -----------------------------------------------
      // SUCCESS MESSAGE
      // -----------------------------------------------

      setSuccess(
        "Fee Payment saved successfully! Redirecting..."
      );

      // -----------------------------------------------
      // SEND DATA TO PARENT
      // -----------------------------------------------

      setTimeout(() => {

        onNext(
          result?.data
        );

      }, 1000);

    } catch (err) {

      console.error(
        "Fee Payment Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create Fee Payment."
      );

    } finally {

      setLoading(false);

    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <h2 className="text-xl font-semibold text-gray-800">
          Fee Payment
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Record the payment against the created fee invoice.
        </p>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* =================================================
              RECEIPT NUMBER
          ================================================= */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">

              Receipt Number

              <span className="ml-1 text-red-500">
                *
              </span>

            </label>

            <input
              type="text"
              value={receiptNumber}
              onChange={(e) =>
                setReceiptNumber(
                  e.target.value
                )
              }
              placeholder="e.g. REC-2026-001"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>

          {/* =================================================
              AMOUNT
          ================================================= */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">

              Amount

              <span className="ml-1 text-red-500">
                *
              </span>

            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              placeholder="Enter payment amount"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>

          {/* =================================================
              PAYMENT MODE
          ================================================= */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">

              Payment Mode

              <span className="ml-1 text-red-500">
                *
              </span>

            </label>

            <select
              value={paymentMode}
              onChange={(e) =>
                setPaymentMode(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >

              <option value="">
                Select Payment Mode
              </option>

              <option value="CASH">
                CASH
              </option>

              <option value="ONLINE">
                ONLINE
              </option>

              <option value="CARD">
                CARD
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="BANK_TRANSFER">
                BANK TRANSFER
              </option>

              <option value="CHEQUE">
                CHEQUE
              </option>

            </select>

          </div>

          {/* =================================================
              GATEWAY REFERENCE
          ================================================= */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Gateway Reference
            </label>

            <input
              type="text"
              value={gatewayRef}
              onChange={(e) =>
                setGatewayRef(
                  e.target.value
                )
              }
              placeholder="Optional"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>

          {/* =================================================
              PAYMENT DATE
          ================================================= */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">

              Payment Date

              <span className="ml-1 text-red-500">
                *
              </span>

            </label>

            <input
              type="date"
              value={paymentDate}
              onChange={(e) =>
                setPaymentDate(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>

          {/* =================================================
              FEE INVOICE
          ================================================= */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fee Invoice
            </label>

            <div className="min-h-[42px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">

              {invoiceNumber ||
                "Invoice not available"}

            </div>

          </div>

          {/* =================================================
              REMARKS
          ================================================= */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Remarks
            </label>

            <textarea
              value={remarks}
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
              rows={4}
              placeholder="Enter remarks"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

          </div>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

            {error}

          </div>

        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (

          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">

            {success}

          </div>

        )}

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="mt-8 flex justify-between border-t pt-6">

          {/* BACK */}

          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {/* SAVE */}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading
              ? "Saving..."
              : "Save Payment"}

          </button>

        </div>

      </form>

    </div>
  );
}