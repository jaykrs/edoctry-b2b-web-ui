"use client";

import React, { useState, useEffect } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";

export type StudentProfile = {
  student_id: string;
  roll_number: string;
  institutional_email: string;
  status: string;
};

export type OnboardingChecklist = {
  identity_card_issued: boolean;
  lms_access_granted: boolean;
  hostel_allocated: boolean;
  orientation_batch: string;
};

export type OnboardingType = {
  onboarding_id: string;
  student_profile: StudentProfile;
  onboarding_checklist: OnboardingChecklist;
  enrolled_at: string;
};

type StudentOnboardingProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any; // Receives full workflow entry from Payment step containing id / documentId
  onChange?: (data: { Onboarding: OnboardingType }) => void;
  strapiId?: string | number | null;
};

type ErrorsType = Record<string, string>;

const INITIAL_ONBOARDING_DATA: OnboardingType = {
  onboarding_id: "ONB-2026-7789",
  student_profile: {
    student_id: "STD-2026-CS-042",
    roll_number: "2026CS042",
    institutional_email: "student@college.edu",
    status: "ACTIVE_ENROLLED",
  },
  onboarding_checklist: {
    identity_card_issued: true,
    lms_access_granted: true,
    hostel_allocated: false,
    orientation_batch: "GROUP-3",
  },
  enrolled_at: "2026-07-05T11:00:00Z",
};

export default function StudentOnboarding({
  onNext,
  onBack,
  data,
  onChange,
  strapiId = null,
}: StudentOnboardingProps) {
  // Step 1: Create State
  const [onboardingData, setOnboardingData] = useState<{
    Onboarding: OnboardingType;
  }>({
    Onboarding: INITIAL_ONBOARDING_DATA,
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Step 3: Load Existing Data
  useEffect(() => {
    if (data?.Onboarding) {
      setOnboardingData({
        Onboarding: {
          onboarding_id:
            data.Onboarding.onboarding_id ||
            INITIAL_ONBOARDING_DATA.onboarding_id,
          student_profile: {
            ...INITIAL_ONBOARDING_DATA.student_profile,
            ...(data.Onboarding.student_profile || {}),
          },
          onboarding_checklist: {
            ...INITIAL_ONBOARDING_DATA.onboarding_checklist,
            ...(data.Onboarding.onboarding_checklist || {}),
          },
          enrolled_at:
            data.Onboarding.enrolled_at ||
            INITIAL_ONBOARDING_DATA.enrolled_at,
        },
      });
    }
  }, [data]);

  // Step 4: Validate
  const validate = (): boolean => {
    const newErrors: ErrorsType = {};
    const { student_profile, onboarding_checklist } = onboardingData.Onboarding;

    if (!student_profile.student_id?.trim()) {
      newErrors.student_id = "Student ID is required.";
    }
    if (!student_profile.roll_number?.trim()) {
      newErrors.roll_number = "Roll Number is required.";
    }
    if (!student_profile.institutional_email?.trim()) {
      newErrors.institutional_email = "Institutional Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student_profile.institutional_email)
    ) {
      newErrors.institutional_email = "Invalid institutional email format.";
    }
    if (!student_profile.status?.trim()) {
      newErrors.status = "Status is required.";
    }
    if (!onboarding_checklist.orientation_batch?.trim()) {
      newErrors.orientation_batch = "Orientation Batch is required.";
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

  // Step 5 - Step 8 & Step 10: Update Record Handler
  const handleCompleteWorkflow = async () => {
    setApiError(null);

    if (!validate()) return;

    // Step 6: Existing Record ID
    const targetId = strapiId || data?.documentId || data?.id;

    if (!targetId) {
      setApiError("No existing Admission Workflow ID found to update.");
      return;
    }

    setIsSubmitting(true);

    // Step 5: Create Payload
    const payload = {
      data: {
        Onboarding: onboardingData.Onboarding,
      },
    };

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

      // Step 7: Update Record (PUT request)
      const res = await fetch(
        `${baseUrl}/api/admission-workflows/${targetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            }),
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result?.error?.message ||
            `Server Error (${res.status}): Failed to complete onboarding.`
        );
      }

      if (onChange) onChange(onboardingData);

      // Step 8 & Step 10: Finish Workflow
      onNext(result.data);
    } catch (err: any) {
      console.error("Failed to update Strapi record:", err);
      setApiError(
        err.message || "An error occurred while updating Strapi onboarding data."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const { student_profile, onboarding_checklist, enrolled_at } =
    onboardingData.Onboarding;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200 my-6">
      <TextHeading title="Phase 5: Student Onboarding" />

      {apiError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
          <strong>Backend Error:</strong> {apiError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Section: Student Profile */}
        <h2 className="md:col-span-2 text-lg font-bold text-gray-800 border-b pb-2">
          Student Profile
        </h2>

        {/* Student ID */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Student ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. STD-2026-CS-042"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.student_id
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={student_profile.student_id}
            onChange={(e) => {
              clearError("student_id");
              setOnboardingData({
                Onboarding: {
                  ...onboardingData.Onboarding,
                  student_profile: {
                    ...student_profile,
                    student_id: e.target.value,
                  },
                },
              });
            }}
          />
          {errors.student_id && (
            <p className="text-red-500 text-xs mt-1">{errors.student_id}</p>
          )}
        </div>

        {/* Roll Number */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Roll Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 2026CS042"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.roll_number
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={student_profile.roll_number}
            onChange={(e) => {
              clearError("roll_number");
              setOnboardingData({
                Onboarding: {
                  ...onboardingData.Onboarding,
                  student_profile: {
                    ...student_profile,
                    roll_number: e.target.value,
                  },
                },
              });
            }}
          />
          {errors.roll_number && (
            <p className="text-red-500 text-xs mt-1">{errors.roll_number}</p>
          )}
        </div>

        {/* Institutional Email */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Institutional Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="e.g. student@college.edu"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.institutional_email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={student_profile.institutional_email}
            onChange={(e) => {
              clearError("institutional_email");
              setOnboardingData({
                Onboarding: {
                  ...onboardingData.Onboarding,
                  student_profile: {
                    ...student_profile,
                    institutional_email: e.target.value,
                  },
                },
              });
            }}
          />
          {errors.institutional_email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.institutional_email}
            </p>
          )}
        </div>

        {/* Enrollment Status */}
        <div>
          <label className="font-medium text-sm text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.status
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={student_profile.status}
            onChange={(e) => {
              clearError("status");
              setOnboardingData({
                Onboarding: {
                  ...onboardingData.Onboarding,
                  student_profile: {
                    ...student_profile,
                    status: e.target.value,
                  },
                },
              });
            }}
          >
            <option value="ACTIVE_ENROLLED">ACTIVE_ENROLLED</option>
            <option value="PROVISIONAL">PROVISIONAL</option>
            <option value="ON_LEAVE">ON_LEAVE</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status}</p>
          )}
        </div>

        {/* Section: Onboarding Checklist */}
        <h2 className="md:col-span-2 text-lg font-bold text-gray-800 border-b pb-2 mt-6">
          Onboarding Checklist
        </h2>

        {/* Orientation Batch */}
        <div className="md:col-span-2">
          <label className="font-medium text-sm text-gray-700">
            Orientation Batch <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. GROUP-3"
            className={`w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none ${
              errors.orientation_batch
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            value={onboarding_checklist.orientation_batch}
            onChange={(e) => {
              clearError("orientation_batch");
              setOnboardingData({
                Onboarding: {
                  ...onboardingData.Onboarding,
                  onboarding_checklist: {
                    ...onboarding_checklist,
                    orientation_batch: e.target.value,
                  },
                },
              });
            }}
          />
          {errors.orientation_batch && (
            <p className="text-red-500 text-xs mt-1">
              {errors.orientation_batch}
            </p>
          )}
        </div>

        {/* Checklist Checkboxes */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={onboarding_checklist.identity_card_issued}
              onChange={(e) =>
                setOnboardingData({
                  Onboarding: {
                    ...onboardingData.Onboarding,
                    onboarding_checklist: {
                      ...onboarding_checklist,
                      identity_card_issued: e.target.checked,
                    },
                  },
                })
              }
            />
            <span>Identity Card Issued</span>
          </label>

          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={onboarding_checklist.lms_access_granted}
              onChange={(e) =>
                setOnboardingData({
                  Onboarding: {
                    ...onboardingData.Onboarding,
                    onboarding_checklist: {
                      ...onboarding_checklist,
                      lms_access_granted: e.target.checked,
                    },
                  },
                })
              }
            />
            <span>LMS Access Granted</span>
          </label>

          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={onboarding_checklist.hostel_allocated}
              onChange={(e) =>
                setOnboardingData({
                  Onboarding: {
                    ...onboardingData.Onboarding,
                    onboarding_checklist: {
                      ...onboarding_checklist,
                      hostel_allocated: e.target.checked,
                    },
                  },
                })
              }
            />
            <span>Hostel Allocated</span>
          </label>
        </div>

        {/* Enrollment Timestamp */}
        <div className="md:col-span-2 mt-4">
          <label className="font-medium text-sm text-gray-700">
            Enrolled At Timestamp
          </label>
          <input
            type="datetime-local"
            className="w-full border rounded p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none border-gray-300"
            value={enrolled_at ? enrolled_at.slice(0, 16) : ""}
            onChange={(e) => {
              const isoValue = e.target.value
                ? new Date(e.target.value).toISOString()
                : "";
              setOnboardingData({
                Onboarding: {
                  ...onboardingData.Onboarding,
                  enrolled_at: isoValue,
                },
              });
            }}
          />
        </div>
      </div>

      {/* Navigation & Final Action Buttons */}
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
          onClick={handleCompleteWorkflow}
          disabled={isSubmitting}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium text-sm disabled:opacity-50 flex items-center gap-2 transition shadow-sm"
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
              <span>Completing Workflow...</span>
            </>
          ) : (
            "Complete Workflow ✓"
          )}
        </button>
      </div>
    </div>
  );
}