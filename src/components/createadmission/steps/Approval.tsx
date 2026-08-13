"use client";

import React, { useState, useEffect } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";

export type Stage = {
  stage_name: string;
  approver_role: string;
  approver_id: string;
  status: string;
  timestamp: string;
  comments: string;
};

export type ApprovalDetails = {
  approval_id?: string;
  application_id?: string;
  stages: Stage[];
};

export type OfferLetterDetails = {
  offer_id: string;
  issued_date: string;
  valid_until: string;
  fee_payable: number;
};

export type ApprovalWorkflowData = {
  Approval: ApprovalDetails;
  Offer: OfferLetterDetails;
};

type ApprovalProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  onChange?: (data: any) => void;
  strapiId?: string | number | null;
};

type ErrorsType = Record<string, string>;

const INITIAL_WORKFLOW_DATA: ApprovalWorkflowData = {
  Approval: {
    approval_id: "APR-8941-FINAL",
    application_id: "APP-2026-8941",
    stages: [
      {
        stage_name: "DEPARTMENT_REVIEW",
        approver_role: "Head of Department",
        approver_id: "EMP-1024",
        status: "APPROVED",
        timestamp: "2026-07-02T10:30:00Z",
        comments: "Eligible based on entrance test performance.",
      },
      {
        stage_name: "ADMISSIONS_COMMITTEE",
        approver_role: "Admissions Director",
        approver_id: "EMP-0012",
        status: "APPROVED",
        timestamp: "2026-07-03T14:15:00Z",
        comments: "Offer letter generated.",
      },
    ],
  },
  Offer: {
    offer_id: "OFFER-2026-4412",
    issued_date: "2026-07-03",
    valid_until: "2026-07-15",
    fee_payable: 150000.0,
  },
};

export default function ApprovalWorkflow({
  onNext,
  onBack,
  data,
  onChange,
  strapiId = null,
}: ApprovalProps) {
  const [formData, setFormData] = useState<ApprovalWorkflowData>(INITIAL_WORKFLOW_DATA);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load Existing Data
  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        Approval: data.Approval || data.approval || prev.Approval,
        Offer: data.Offer || data.offer || prev.Offer,
      }));
    }
  }, [data]);

  // Form Validation
  const validate = (): boolean => {
    const newErrors: ErrorsType = {};

    if (formData.Approval.stages && formData.Approval.stages.length > 0) {
      formData.Approval.stages.forEach((stage, index) => {
        if (!stage.stage_name?.trim()) {
          newErrors[`stage_${index}_stage_name`] = "Stage name is required.";
        }
        if (!stage.status) {
          newErrors[`stage_${index}_status`] = "Please select a status.";
        }
      });
    }

    const offer = formData.Offer;
    if (!offer.offer_id?.trim()) {
      newErrors.offer_id = "Offer ID Required";
    }
    if (!offer.issued_date) {
      newErrors.issued_date = "Issue Date Required";
    }
    if (!offer.valid_until) {
      newErrors.valid_until = "Valid Until Date Required";
    } else if (offer.issued_date && offer.valid_until < offer.issued_date) {
      newErrors.valid_until = "Valid until date cannot be earlier than issued date.";
    }
    if (offer.fee_payable === undefined || offer.fee_payable === null || offer.fee_payable < 0) {
      newErrors.fee_payable = "Valid Fee Payable Required";
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

  // Update Record Handler
  const handleNext = async () => {
    setApiError(null);

    if (!validate()) return;

    const targetId = strapiId || data?.documentId || data?.id;

    if (!targetId) {
      setApiError("No existing Admission Workflow ID found to update.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      data: {
        Approval: formData.Approval,
        Offer: formData.Offer,
      },
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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
            `Server Error (${res.status}): Failed to update admission workflow record.`
        );
      }

      if (onChange) onChange(formData);
      onNext(result.data);
    } catch (err: any) {
      console.error("Failed to update Strapi record:", err);
      setApiError(err.message || "An error occurred while updating Strapi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addStage = () => {
    setFormData((prev) => ({
      ...prev,
      Approval: {
        ...prev.Approval,
        stages: [
          ...prev.Approval.stages,
          {
            stage_name: "",
            approver_role: "",
            approver_id: "",
            status: "PENDING",
            timestamp: new Date().toISOString().slice(0, 16),
            comments: "",
          },
        ],
      },
    }));
  };

  const removeStage = (index: number) => {
    if (formData.Approval.stages.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      Approval: {
        ...prev.Approval,
        stages: prev.Approval.stages.filter((_, i) => i !== index),
      },
    }));
  };

  const updateStageField = (index: number, field: keyof Stage, value: string) => {
    clearError(`stage_${index}_${field}`);
    setFormData((prev) => ({
      ...prev,
      Approval: {
        ...prev.Approval,
        stages: prev.Approval.stages.map((stage, i) =>
          i === index ? { ...stage, [field]: value } : stage
        ),
      },
    }));
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm border border-gray-200 my-6">
      <TextHeading title="Phase 3: Approval Workflow" />

      {apiError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
          <strong>Backend Error:</strong> {apiError}
        </div>
      )}

      {/* Main Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Approval ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">Approval ID</label>
          <input
            type="text"
            placeholder="e.g. APR-8941-FINAL"
            className="w-full border border-gray-300 rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.Approval.approval_id || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                Approval: { ...formData.Approval, approval_id: e.target.value },
              });
            }}
          />
        </div>

        {/* Application ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">Application ID</label>
          <input
            type="text"
            placeholder="e.g. APP-2026-8941"
            className="w-full border border-gray-300 rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            value={formData.Approval.application_id || ""}
            onChange={(e) => {
              setFormData({
                ...formData,
                Approval: { ...formData.Approval, application_id: e.target.value },
              });
            }}
          />
        </div>

        {/* Section Header: Approval Stages */}
        <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-6">
          <h2 className="text-lg font-bold text-gray-800">Approval Stages</h2>
          <button
            type="button"
            onClick={addStage}
            className="px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 font-medium transition"
          >
            + Add Stage
          </button>
        </div>

        {/* Dynamic Stages List */}
        {formData.Approval.stages.map((stage, idx) => (
          <div
            key={idx}
            className="col-span-1 md:col-span-2 border border-gray-200 rounded-lg p-5 bg-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative"
          >
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-sm text-gray-700">Stage #{idx + 1}</span>
              {formData.Approval.stages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStage(idx)}
                  className="text-red-600 text-xs hover:underline font-medium"
                >
                  Remove Stage
                </button>
              )}
            </div>

            {/* Stage Name */}
            <div>
              <label className="font-medium text-sm text-gray-600">
                Stage Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. DEPARTMENT_REVIEW"
                className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors[`stage_${idx}_stage_name`]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                value={stage.stage_name}
                onChange={(e) => updateStageField(idx, "stage_name", e.target.value)}
              />
              {errors[`stage_${idx}_stage_name`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`stage_${idx}_stage_name`]}
                </p>
              )}
            </div>

            {/* Approver Role */}
            <div>
              <label className="font-medium text-sm text-gray-600">Approver Role</label>
              <input
                type="text"
                placeholder="e.g. Head of Department"
                className="w-full border border-gray-300 rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                value={stage.approver_role}
                onChange={(e) => updateStageField(idx, "approver_role", e.target.value)}
              />
            </div>

            {/* Approver ID */}
            <div>
              <label className="font-medium text-sm text-gray-600">Approver ID</label>
              <input
                type="text"
                placeholder="e.g. EMP-1024"
                className="w-full border border-gray-300 rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                value={stage.approver_id}
                onChange={(e) => updateStageField(idx, "approver_id", e.target.value)}
              />
            </div>

            {/* Status */}
            <div>
              <label className="font-medium text-sm text-gray-600">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors[`stage_${idx}_status`]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                value={stage.status}
                onChange={(e) => updateStageField(idx, "status", e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
                <option value="PENDING">PENDING</option>
              </select>
              {errors[`stage_${idx}_status`] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[`stage_${idx}_status`]}
                </p>
              )}
            </div>

            {/* Timestamp */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <label className="font-medium text-sm text-gray-600">Timestamp</label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                value={stage.timestamp ? stage.timestamp.slice(0, 16) : ""}
                onChange={(e) => {
                  const isoVal = e.target.value
                    ? new Date(e.target.value).toISOString()
                    : "";
                  updateStageField(idx, "timestamp", isoVal);
                }}
              />
            </div>

            {/* Comments */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <label className="font-medium text-sm text-gray-600">Comments</label>
              <textarea
                placeholder="Enter stage review comments..."
                rows={2}
                className="w-full border border-gray-300 rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                value={stage.comments}
                onChange={(e) => updateStageField(idx, "comments", e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Offer Letter Details Section Header */}
        <h2 className="col-span-1 md:col-span-2 text-lg font-bold text-gray-800 mt-4 border-t pt-4">
          Offer Letter Details
        </h2>

        {/* Offer ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Offer ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. OFFER-2026-4412"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.offer_id ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            value={formData.Offer.offer_id}
            onChange={(e) => {
              clearError("offer_id");
              setFormData({
                ...formData,
                Offer: {
                  ...formData.Offer,
                  offer_id: e.target.value,
                },
              });
            }}
          />
          {errors.offer_id && (
            <p className="text-red-500 text-xs mt-1">{errors.offer_id}</p>
          )}
        </div>

        {/* Fee Payable */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Fee Payable <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 150000.00"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.fee_payable ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            value={
              formData.Offer.fee_payable === 0 ? "" : formData.Offer.fee_payable
            }
            onChange={(e) => {
              clearError("fee_payable");
              setFormData({
                ...formData,
                Offer: {
                  ...formData.Offer,
                  fee_payable: e.target.value === "" ? 0 : Number(e.target.value),
                },
              });
            }}
          />
          {errors.fee_payable && (
            <p className="text-red-500 text-xs mt-1">{errors.fee_payable}</p>
          )}
        </div>

        {/* Issued Date */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Issued Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.issued_date ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            value={formData.Offer.issued_date}
            onChange={(e) => {
              clearError("issued_date");
              setFormData({
                ...formData,
                Offer: {
                  ...formData.Offer,
                  issued_date: e.target.value,
                },
              });
            }}
          />
          {errors.issued_date && (
            <p className="text-red-500 text-xs mt-1">{errors.issued_date}</p>
          )}
        </div>

        {/* Valid Until */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Valid Until <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.valid_until ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            value={formData.Offer.valid_until}
            onChange={(e) => {
              clearError("valid_until");
              setFormData({
                ...formData,
                Offer: {
                  ...formData.Offer,
                  valid_until: e.target.value,
                },
              });
            }}
          />
          {errors.valid_until && (
            <p className="text-red-500 text-xs mt-1">{errors.valid_until}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
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
              <span>Saving...</span>
            </>
          ) : (
            "Submit / Next →"
          )}
        </button>
      </div>
    </div>
  );
}