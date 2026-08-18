"use client";

import React, { useState, useEffect } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";

export type PaymentDetails = {
  amount_paid: number;
  currency: string;
  fee_type: string;
  payment_gateway: string;
  gateway_reference: string;
  payment_status: string;
  paid_at: string;
};

export type PaymentData = {
  fee_transaction_id: string;
  application_id: string;
  offer_id: string;
  payment_details: PaymentDetails;
  receipt_number: string;
};

type PaymentProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any; // Receives the full record or object containing id/documentId/payment attributes from parent
  onChange?: (data: PaymentData) => void;
  strapiId?: string | number | null;
};

type ErrorsType = Record<string, string>;

const INITIAL_PAYMENT_DATA: PaymentData = {
  fee_transaction_id: "TXN-2026-99012",
  application_id: "APP-2026-8941",
  offer_id: "OFFER-2026-4412",
  payment_details: {
    amount_paid: 150000.0,
    currency: "INR",
    fee_type: "FIRST_SEMESTER_TUITION",
    payment_gateway: "RAZORPAY",
    gateway_reference: "pay_Pq1x29kLmZ0123",
    payment_status: "SUCCESS",
    paid_at: "2026-07-04T09:00:00Z",
  },
  receipt_number: "REC-2026-0819",
};

export default function Payment({
  onNext,
  onBack,
  data,
  onChange,
  strapiId = null,
}: PaymentProps) {
  const [formData, setFormData] = useState<PaymentData>(INITIAL_PAYMENT_DATA);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load Existing Data (Step 1 & Step 3)
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        fee_transaction_id:
          data.fee_transaction_id || prev.fee_transaction_id,
        application_id: data.application_id || prev.application_id,
        offer_id: data.offer_id || prev.offer_id,
        receipt_number: data.receipt_number || prev.receipt_number,
        payment_details: {
          ...prev.payment_details,
          ...(data.payment_details || {}),
        },
      }));
    }
  }, [data]);

  // Form Validation (Step 4)
  const validate = (): boolean => {
    const newErrors: ErrorsType = {};

    // Root level validations
    if (!formData.fee_transaction_id?.trim()) {
      newErrors.fee_transaction_id = "Fee Transaction ID is required.";
    }
    if (!formData.application_id?.trim()) {
      newErrors.application_id = "Application ID is required.";
    }
    if (!formData.offer_id?.trim()) {
      newErrors.offer_id = "Offer ID is required.";
    }
    if (!formData.receipt_number?.trim()) {
      newErrors.receipt_number = "Receipt number is required.";
    }

    // Payment details validations
    const details = formData.payment_details;

    if (!details.amount_paid || details.amount_paid <= 0) {
      newErrors.amount_paid = "Amount paid must be greater than 0.";
    }
    if (!details.currency) {
      newErrors.currency = "Please select currency.";
    }
    if (!details.fee_type?.trim()) {
      newErrors.fee_type = "Fee type is required.";
    }
    if (!details.payment_gateway) {
      newErrors.payment_gateway = "Please select payment gateway.";
    }
    if (!details.gateway_reference?.trim()) {
      newErrors.gateway_reference = "Gateway reference is required.";
    }
    if (!details.payment_status) {
      newErrors.payment_status = "Please select payment status.";
    }
    if (!details.paid_at) {
      newErrors.paid_at = "Payment timestamp is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (key: string) => {
    if (errors[key]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  // Update Record Handler (Steps 5 - 8 & 10)
  const handleNext = async () => {
    setApiError(null);

    if (!validate()) return;

    // Step 6: Get Record ID (from strapiId, data.documentId, or data.id)
    const targetId = strapiId || data?.documentId || data?.id;

    if (!targetId) {
      setApiError("No existing Admission Workflow ID found to update.");
      return;
    }

    setIsSubmitting(true);

    // Step 5: Prepare Payload
    const payload = {
      data: {
        fee_transaction_id: formData.fee_transaction_id,
        application_id: formData.application_id,
        offer_id: formData.offer_id,
        payment_details: formData.payment_details,
        receipt_number: formData.receipt_number,
      },
    };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

      // Step 7: Update Record (PUT request)
      const res = await fetch(`${baseUrl}/api/admission-workflows/${targetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          }),
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result?.error?.message ||
            `Server Error (${res.status}): Failed to update payment details.`
        );
      }

      if (onChange) onChange(formData);

      // Step 8 & 10: Trigger Next with returned record payload
      onNext(result.data);
    } catch (err: any) {
      console.error("Failed to update Strapi record:", err);
      setApiError(err.message || "An error occurred while updating Strapi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-200 my-6">
      <TextHeading title="Phase 4: Fee Submission" />

      {apiError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
          <strong>Backend Error:</strong> {apiError}
        </div>
      )}

      {/* Responsive Grid for Full Width Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {/* Fee Transaction ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Fee Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. TXN-2026-99012"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.fee_transaction_id
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.fee_transaction_id}
            onChange={(e) => {
              clearError("fee_transaction_id");
              setFormData({
                ...formData,
                fee_transaction_id: e.target.value,
              });
            }}
          />
          {errors.fee_transaction_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fee_transaction_id}
            </p>
          )}
        </div>

        {/* Application ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Application ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. APP-2026-8941"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.application_id
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.application_id}
            onChange={(e) => {
              clearError("application_id");
              setFormData({
                ...formData,
                application_id: e.target.value,
              });
            }}
          />
          {errors.application_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.application_id}
            </p>
          )}
        </div>

        {/* Offer ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Offer ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. OFFER-2026-4412"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.offer_id
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.offer_id}
            onChange={(e) => {
              clearError("offer_id");
              setFormData({
                ...formData,
                offer_id: e.target.value,
              });
            }}
          />
          {errors.offer_id && (
            <p className="text-red-500 text-xs mt-1">{errors.offer_id}</p>
          )}
        </div>

        {/* Receipt Number */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Receipt Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. REC-2026-0819"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.receipt_number
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.receipt_number}
            onChange={(e) => {
              clearError("receipt_number");
              setFormData({
                ...formData,
                receipt_number: e.target.value,
              });
            }}
          />
          {errors.receipt_number && (
            <p className="text-red-500 text-xs mt-1">
              {errors.receipt_number}
            </p>
          )}
        </div>

        {/* Section Header: Payment Details */}
        <h2 className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-lg font-bold text-gray-800 mt-4 border-t pt-4">
          Payment Details
        </h2>

        {/* Amount Paid */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Amount Paid <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 150000.00"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.amount_paid
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={
              formData.payment_details.amount_paid === 0
                ? ""
                : formData.payment_details.amount_paid
            }
            onChange={(e) => {
              clearError("amount_paid");
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  amount_paid:
                    e.target.value === "" ? 0 : Number(e.target.value),
                },
              });
            }}
          />
          {errors.amount_paid && (
            <p className="text-red-500 text-xs mt-1">{errors.amount_paid}</p>
          )}
        </div>

        {/* Currency */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Currency <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.currency
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.payment_details.currency}
            onChange={(e) => {
              clearError("currency");
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  currency: e.target.value,
                },
              });
            }}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          {errors.currency && (
            <p className="text-red-500 text-xs mt-1">{errors.currency}</p>
          )}
        </div>

        {/* Fee Type */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Fee Type <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. FIRST_SEMESTER_TUITION"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.fee_type
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.payment_details.fee_type}
            onChange={(e) => {
              clearError("fee_type");
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  fee_type: e.target.value,
                },
              });
            }}
          />
          {errors.fee_type && (
            <p className="text-red-500 text-xs mt-1">{errors.fee_type}</p>
          )}
        </div>

        {/* Payment Gateway */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Payment Gateway <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.payment_gateway
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.payment_details.payment_gateway}
            onChange={(e) => {
              clearError("payment_gateway");
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  payment_gateway: e.target.value,
                },
              });
            }}
          >
            <option value="">Select Gateway</option>
            <option value="RAZORPAY">RAZORPAY</option>
            <option value="STRIPE">STRIPE</option>
            <option value="PAYTM">PAYTM</option>
            <option value="UPI">UPI</option>
          </select>
          {errors.payment_gateway && (
            <p className="text-red-500 text-xs mt-1">
              {errors.payment_gateway}
            </p>
          )}
        </div>

        {/* Gateway Reference */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Gateway Reference <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. pay_Pq1x29kLmZ0123"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.gateway_reference
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.payment_details.gateway_reference}
            onChange={(e) => {
              clearError("gateway_reference");
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  gateway_reference: e.target.value,
                },
              });
            }}
          />
          {errors.gateway_reference && (
            <p className="text-red-500 text-xs mt-1">
              {errors.gateway_reference}
            </p>
          )}
        </div>

        {/* Payment Status */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Payment Status <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.payment_status
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={formData.payment_details.payment_status}
            onChange={(e) => {
              clearError("payment_status");
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  payment_status: e.target.value,
                },
              });
            }}
          >
            <option value="">Select Status</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="FAILED">FAILED</option>
            <option value="PENDING">PENDING</option>
          </select>
          {errors.payment_status && (
            <p className="text-red-500 text-xs mt-1">
              {errors.payment_status}
            </p>
          )}
        </div>

        {/* Paid At Timestamp */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <label className="font-medium text-sm text-gray-700">
            Paid At Timestamp <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.paid_at
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={
              formData.payment_details.paid_at
                ? formData.payment_details.paid_at.slice(0, 16)
                : ""
            }
            onChange={(e) => {
              clearError("paid_at");
              const isoValue = e.target.value
                ? new Date(e.target.value).toISOString()
                : "";
              setFormData({
                ...formData,
                payment_details: {
                  ...formData.payment_details,
                  paid_at: isoValue,
                },
              });
            }}
          />
          {errors.paid_at && (
            <p className="text-red-500 text-xs mt-1">{errors.paid_at}</p>
          )}
        </div>
      </div>

      {/* Navigation & Action Buttons */}
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium text-sm disabled:opacity-50 transition"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm disabled:opacity-50 flex items-center gap-2 transition"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Updating Strapi...</span>
            </>
          ) : (
            "Submit / Next →"
          )}
        </button>
      </div>
    </div>
  );
}