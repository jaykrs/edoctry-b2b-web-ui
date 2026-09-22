"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/utils/config";

type Props = {
  onNext?: (data?: any) => void;
  onBack?: () => void;
  data?: any;
  invoice?: any;
};

export default function FeePayment({
  onNext,
  onBack,
  data,
  invoice,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [receiptNumber, setReceiptNumber] = useState(
    data?.receiptNumber || `REC-${Date.now()}`
  );

  const [amount, setAmount] = useState(
    Number(data?.amount || 0)
  );

  const [paymentMode, setPaymentMode] = useState(
    data?.paymentMode || ""
  );

  const [gatewayRef, setGatewayRef] = useState(
    data?.gatewayRef || ""
  );

  const [paymentDate, setPaymentDate] = useState(
    data?.paymentDate
      ? String(data.paymentDate).slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );

  const [remarks, setRemarks] = useState(
    data?.remarks || ""
  );

  const [invoiceDetails, setInvoiceDetails] =
    useState<any>(invoice || null);

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("jwt") || "";
  };

  const getRelationId = (value: any): number | null => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }

    if (typeof value === "object") {
      if (value.id !== undefined) {
        return getRelationId(value.id);
      }

      if (value.data?.id !== undefined) {
        return getRelationId(value.data.id);
      }
    }

    return null;
  };

  const invoiceId = useMemo(() => {
    return getRelationId(
      invoice?.id ||
        invoice?.data?.id
    );
  }, [invoice]);

  const invoiceNetAmount = useMemo(() => {
    return Number(
      invoice?.netAmount ||
        invoice?.attributes?.netAmount ||
        0
    );
  }, [invoice]);

  const invoiceAmountPaid = useMemo(() => {
    return Number(
      invoice?.amountPaid ||
        invoice?.attributes?.amountPaid ||
        0
    );
  }, [invoice]);

  const invoiceBalance = useMemo(() => {
    return Math.max(
      invoiceNetAmount - invoiceAmountPaid,
      0
    );
  }, [
    invoiceNetAmount,
    invoiceAmountPaid,
  ]);

  useEffect(() => {
    if (!invoiceId) return;

    const fetchInvoice = async () => {
      try {
        const token = getToken();

        const response = await fetch(
          `${apiUrl}/api/fee-invoices/${invoiceId}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (result?.data) {
          setInvoiceDetails(result.data);

          const attributes =
            result.data?.attributes ||
            result.data;

          const currentBalance = Math.max(
            Number(attributes?.netAmount || 0) -
              Number(attributes?.amountPaid || 0),
            0
          );

          if (!data?.amount && currentBalance > 0) {
            setAmount(currentBalance);
          }
        }
      } catch (err) {
        console.error(
          "Fee Invoice fetch error:",
          err
        );
      }
    };

    fetchInvoice();
  }, [invoiceId, data?.amount]);

  const currentNetAmount = useMemo(() => {
    return Number(
      invoiceDetails?.attributes?.netAmount ||
        invoiceDetails?.netAmount ||
        invoiceNetAmount ||
        0
    );
  }, [
    invoiceDetails,
    invoiceNetAmount,
  ]);

  const currentAmountPaid = useMemo(() => {
    return Number(
      invoiceDetails?.attributes?.amountPaid ||
        invoiceDetails?.amountPaid ||
        invoiceAmountPaid ||
        0
    );
  }, [
    invoiceDetails,
    invoiceAmountPaid,
  ]);

  const currentBalanceDue = useMemo(() => {
    return Math.max(
      currentNetAmount - currentAmountPaid,
      0
    );
  }, [
    currentNetAmount,
    currentAmountPaid,
  ]);

  const remainingAfterPayment = useMemo(() => {
    return Math.max(
      currentBalanceDue - amount,
      0
    );
  }, [
    currentBalanceDue,
    amount,
  ]);

  const getInvoiceStatus = (
    paidAmount: number,
    netAmount: number
  ) => {
    if (paidAmount <= 0) {
      return "UNPAID";
    }

    if (
      netAmount > 0 &&
      paidAmount >= netAmount
    ) {
      return "PAID";
    }

    return "PARTIALLY_PAID";
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      if (!invoiceId) {
        setError(
          "Fee Invoice is missing. Please create the invoice first."
        );
        return;
      }

      if (!receiptNumber.trim()) {
        setError("Receipt number is required.");
        return;
      }

      if (!amount || amount <= 0) {
        setError(
          "Payment amount must be greater than 0."
        );
        return;
      }

      if (amount > currentBalanceDue) {
        setError(
          `Payment amount cannot be greater than balance due ₹${currentBalanceDue.toFixed(
            2
          )}.`
        );
        return;
      }

      if (!paymentMode) {
        setError("Please select payment mode.");
        return;
      }

      if (!paymentDate) {
        setError("Payment date is required.");
        return;
      }

      setSaving(true);

      const token = getToken();

      // ---------------------------------------------
      // 1. CREATE PAYMENT
      // ---------------------------------------------

      const paymentPayload = {
        receiptNumber: receiptNumber.trim(),
        amount: Number(amount),
        paymentMode,
        gatewayRef:
          gatewayRef.trim() || undefined,
        paymentDate,
        remarks: remarks.trim() || undefined,
        fee_invoice: Number(invoiceId),
      };

      const existingPaymentId = getRelationId(
        data?.id ||
          data?.data?.id
      );

      const paymentUrl = existingPaymentId
        ? `${apiUrl}/api/fee-payments/${existingPaymentId}`
        : `${apiUrl}/api/fee-payments`;

      const paymentMethod = existingPaymentId
        ? "PUT"
        : "POST";

      const paymentResponse = await fetch(
        paymentUrl,
        {
          method: paymentMethod,
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            data: paymentPayload,
          }),
        }
      );

      const paymentResult =
        await paymentResponse.json();

      if (!paymentResponse.ok) {
        console.error(
          "Fee Payment API Error:",
          paymentResult
        );

        throw new Error(
          paymentResult?.error?.message ||
            `HTTP Error: ${paymentResponse.status}`
        );
      }

      const savedPayment =
        paymentResult?.data ||
        paymentResult;

      // ---------------------------------------------
      // 2. CALCULATE NEW INVOICE AMOUNT
      // ---------------------------------------------

      const newAmountPaid =
        currentAmountPaid + Number(amount);

      const newStatus = getInvoiceStatus(
        newAmountPaid,
        currentNetAmount
      );

      // ---------------------------------------------
      // 3. UPDATE FEE INVOICE
      // ---------------------------------------------

      const invoiceUpdatePayload = {
        amountPaid: Number(newAmountPaid),
        status: newStatus,
      };

      const invoiceResponse = await fetch(
        `${apiUrl}/api/fee-invoices/${invoiceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            data: invoiceUpdatePayload,
          }),
        }
      );

      const invoiceUpdateResult =
        await invoiceResponse.json();

      if (!invoiceResponse.ok) {
        console.error(
          "Fee Invoice update error:",
          invoiceUpdateResult
        );

        throw new Error(
          invoiceUpdateResult?.error?.message ||
            `Invoice update failed: ${invoiceResponse.status}`
        );
      }

      // ---------------------------------------------
      // 4. FINAL DATA FOR WORKFLOW
      // ---------------------------------------------

      const updatedInvoice =
        invoiceUpdateResult?.data ||
        invoiceDetails ||
        invoice;

      const finalPaymentData = {
        ...savedPayment,

        id:
          savedPayment?.id ||
          savedPayment?.data?.id,

        receiptNumber:
          savedPayment?.receiptNumber ||
          paymentPayload.receiptNumber,

        amount: Number(amount),

        paymentMode:
          savedPayment?.paymentMode ||
          paymentPayload.paymentMode,

        gatewayRef:
          savedPayment?.gatewayRef ||
          paymentPayload.gatewayRef ||
          "",

        paymentDate:
          savedPayment?.paymentDate ||
          paymentPayload.paymentDate,

        remarks:
          savedPayment?.remarks ||
          paymentPayload.remarks ||
          "",

        fee_invoice: Number(invoiceId),

        invoice: {
          ...(updatedInvoice || {}),
          id: Number(invoiceId),
          amountPaid: Number(newAmountPaid),
          status: newStatus,
          balanceDue: Number(
            Math.max(
              currentNetAmount - newAmountPaid,
              0
            )
          ),
        },
      };

      setSuccess(
        "Payment saved successfully and invoice updated."
      );

      console.log(
        "PAYMENT SAVED:",
        finalPaymentData
      );

      console.log(
        "INVOICE UPDATED:",
        {
          invoiceId,
          amountPaid: newAmountPaid,
          netAmount: currentNetAmount,
          balanceDue: Math.max(
            currentNetAmount - newAmountPaid,
            0
          ),
          status: newStatus,
        }
      );

      if (typeof onNext === "function") {
        onNext(finalPaymentData);
      }
    } catch (err: any) {
      console.error(
        "Fee Payment save error:",
        err
      );

      setError(
        err?.message ||
          "Failed to save payment."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
      {/* ------------------------------------------- */}
      {/* HEADER */}
      {/* ------------------------------------------- */}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          New Payment
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Record payment against the selected fee invoice.
        </p>
      </div>

      {/* ------------------------------------------- */}
      {/* MESSAGES */}
      {/* ------------------------------------------- */}

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* INVOICE SUMMARY */}
      {/* ------------------------------------------- */}

      <div className="mb-6 rounded-xl border bg-gray-50 p-5">
        <h3 className="mb-4 text-base font-semibold text-gray-800">
          Invoice Summary
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs text-gray-500">
              Net Amount
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              ₹ {currentNetAmount.toFixed(2)}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs text-gray-500">
              Already Paid
            </p>

            <p className="mt-1 text-xl font-bold text-green-600">
              ₹ {currentAmountPaid.toFixed(2)}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs text-gray-500">
              Balance Due
            </p>

            <p className="mt-1 text-xl font-bold text-orange-600">
              ₹ {currentBalanceDue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* PAYMENT FORM */}
      {/* ------------------------------------------- */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Receipt Number */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Receipt Number{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={receiptNumber}
            onChange={(e) =>
              setReceiptNumber(e.target.value)
            }
            placeholder="Receipt number"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Amount */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Payment Amount{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            min="0"
            max={currentBalanceDue}
            value={amount}
            onChange={(e) =>
              setAmount(
                Number(e.target.value) || 0
              )
            }
            placeholder="Enter payment amount"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            Maximum payable: ₹{" "}
            {currentBalanceDue.toFixed(2)}
          </p>
        </div>

        {/* Payment Mode */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Payment Mode{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={paymentMode}
            onChange={(e) =>
              setPaymentMode(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              Select Payment Mode
            </option>

            <option value="CASH">
              Cash
            </option>

            <option value="CARD">
              Card
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="BANK_TRANSFER">
              Bank Transfer
            </option>

            <option value="CHEQUE">
              Cheque
            </option>

            <option value="ONLINE">
              Online
            </option>
          </select>
        </div>

        {/* Gateway Reference */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Gateway Reference
          </label>

          <input
            type="text"
            value={gatewayRef}
            onChange={(e) =>
              setGatewayRef(e.target.value)
            }
            placeholder="Optional gateway/reference ID"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Payment Date */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Payment Date{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={paymentDate}
            onChange={(e) =>
              setPaymentDate(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {/* Remarks */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Remarks
          </label>

          <input
            type="text"
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Optional remarks"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* AFTER PAYMENT PREVIEW */}
      {/* ------------------------------------------- */}

      {amount > 0 && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h3 className="mb-3 text-sm font-semibold text-blue-800">
            After This Payment
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">
                Payment
              </p>

              <p className="text-lg font-semibold text-gray-800">
                ₹ {amount.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Remaining Balance
              </p>

              <p className="text-lg font-semibold text-orange-600">
                ₹{" "}
                {remainingAfterPayment.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                New Invoice Status
              </p>

              <p className="text-lg font-semibold text-blue-600">
                {getInvoiceStatus(
                  currentAmountPaid + amount,
                  currentNetAmount
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------- */}
      {/* BUTTONS */}
      {/* ------------------------------------------- */}

      <div className="mt-6 flex items-center justify-between border-t pt-5">
        <button
          type="button"
          onClick={() => {
            if (typeof onBack === "function") {
              onBack();
            }
          }}
          disabled={saving}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Payment"}
        </button>
      </div>
    </div>
  );
}