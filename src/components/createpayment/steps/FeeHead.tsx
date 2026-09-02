"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

type FeeHeadProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  editMode?: boolean;
};

type FeeHeadForm = {
  name: string;
  description: string;
  isRefundable: boolean;
  isTaxable: boolean;
};

export default function FeeHead({
  onNext,
  onBack,
  data,
  editMode = false,
}: FeeHeadProps) {
  const [formData, setFormData] =
    useState<FeeHeadForm>({
      name: "",
      description: "",
      isRefundable: false,
      isTaxable: false,
    });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    if (!data) {
      return;
    }

    const feeHeadData =
      data?.attributes || data;

    setFormData({
      name: feeHeadData?.name || "",
      description:
        feeHeadData?.description || "",
      isRefundable:
        feeHeadData?.isRefundable ?? false,
      isTaxable:
        feeHeadData?.isTaxable ?? false,
    });
  }, [data]);

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
      type,
    } = e.target;

    if (type === "checkbox") {
      const checked =
        (e.target as HTMLInputElement)
          .checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError(
        "Fee Header name is required."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("jwt");

      const feeHeadPayload = {
        name: formData.name.trim(),
        description:
          formData.description.trim(),
        isRefundable:
          formData.isRefundable,
        isTaxable:
          formData.isTaxable,
      };

      let response: Response;

      // =====================================
      // EDIT MODE → PUT
      // =====================================

      if (editMode && data?.id) {
        response = await fetch(
          `${apiUrl}/api/fee-heads/${data.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Accept: "application/json",

              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },

            body: JSON.stringify({
              data: feeHeadPayload,
            }),
          }
        );
      }

      // =====================================
      // CREATE MODE → POST
      // =====================================

      else {
        response = await fetch(
          `${apiUrl}/api/fee-heads`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept: "application/json",

              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },

            body: JSON.stringify({
              data: feeHeadPayload,
            }),
          }
        );
      }

      const result =
        await response
          .json()
          .catch(() => null);

      console.log(
        "Fee Head API Response:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const savedFeeHead =
        result?.data;

      console.log(
        editMode
          ? "Fee Head Updated:"
          : "Fee Head Created:",
        savedFeeHead
      );

      // =====================================
      // NEXT STEP
      // =====================================

      onNext(savedFeeHead);
    } catch (err) {
      console.error(
        "Fee Head API Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : editMode
          ? "Failed to update Fee Header."
          : "Failed to create Fee Header."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div className="mx-auto w-full max-w-4xl">

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* HEADER */}

        <div className="border-b px-6 py-5">

          <h2 className="text-xl font-semibold text-gray-800">
            Fee Header
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editMode
              ? "Update fee header details."
              : "Create a fee header for your institution."}
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="space-y-6 p-6">

            {/* ERROR */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* FEE HEADER NAME */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Fee Header Name
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter fee header name"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
                placeholder="Enter fee header description"
                rows={4}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
              />

            </div>

            {/* OPTIONS */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* REFUNDABLE */}

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">

                <input
                  type="checkbox"
                  name="isRefundable"
                  checked={
                    formData.isRefundable
                  }
                  onChange={handleChange}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <div>

                  <p className="text-sm font-medium text-gray-700">
                    Refundable
                  </p>

                  <p className="text-xs text-gray-500">
                    Mark this fee as refundable.
                  </p>

                </div>

              </label>

              {/* TAXABLE */}

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">

                <input
                  type="checkbox"
                  name="isTaxable"
                  checked={
                    formData.isTaxable
                  }
                  onChange={handleChange}
                  disabled={loading}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <div>

                  <p className="text-sm font-medium text-gray-700">
                    Taxable
                  </p>

                  <p className="text-xs text-gray-500">
                    Mark this fee as taxable.
                  </p>

                </div>

              </label>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex items-center justify-between border-t px-6 py-4">

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
              {loading
                ? editMode
                  ? "Updating..."
                  : "Saving..."
                : editMode
                ? "Update & Next"
                : "Save & Next"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}