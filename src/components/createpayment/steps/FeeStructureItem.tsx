"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface FeeStructureItemProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  feeHead?: any;
  feeStructure?: any;
  editMode?: boolean;
}

export default function FeeStructureItem({
  onNext,
  onBack,
  data,
  feeHead,
  feeStructure,
  editMode = false,
}: FeeStructureItemProps) {
  const [amount, setAmount] = useState("");
  const [mandatory, setMandatory] =
    useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================
  // LOAD EXISTING DATA
  // =========================================

  useEffect(() => {
    if (!data) {
      return;
    }

    const itemData =
      data?.attributes || data;

    setAmount(
      itemData?.amount !== undefined &&
        itemData?.amount !== null
        ? String(itemData.amount)
        : ""
    );

    setMandatory(
      itemData?.mandatory ?? true
    );
  }, [data]);

  // =========================================
  // IDS
  // =========================================

  const feeHeadId =
    feeHead?.id;

  const feeStructureId =
    feeStructure?.id;

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!amount.trim()) {
      setError(
        "Amount is required."
      );
      return;
    }

    if (Number(amount) < 0) {
      setError(
        "Amount cannot be negative."
      );
      return;
    }

    if (!feeHeadId) {
      setError(
        "Fee Head is missing. Please go back to Step 1."
      );
      return;
    }

    if (!feeStructureId) {
      setError(
        "Fee Structure is missing. Please go back to Step 2."
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("jwt");

      const payload = {
        amount: Number(amount),
        mandatory,
        fee_structure:
          feeStructureId,
        fee_head:
          feeHeadId,
      };

      let response: Response;

      // =====================================
      // EDIT → PUT
      // =====================================

      if (editMode && data?.id) {
        response = await fetch(
          `${apiUrl}/api/fee-structure-items/${data.id}`,
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
              data: payload,
            }),
          }
        );
      }

      // =====================================
      // CREATE → POST
      // =====================================

      else {
        response = await fetch(
          `${apiUrl}/api/fee-structure-items`,
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
              data: payload,
            }),
          }
        );
      }

      const result =
        await response
          .json()
          .catch(() => null);

      console.log(
        "Fee Structure Item API Response:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const savedItem =
        result?.data;

      console.log(
        editMode
          ? "Fee Structure Item Updated:"
          : "Fee Structure Item Created:",
        savedItem
      );

      // =====================================
      // NEXT STEP
      // =====================================

      onNext(savedItem);
    } catch (err: any) {
      console.error(
        "Fee Structure Item API Error:",
        err
      );

      setError(
        err?.message ||
          (editMode
            ? "Failed to update Fee Structure Item."
            : "Failed to create Fee Structure Item.")
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // UI
  // =========================================

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-xl font-semibold text-gray-800">
          Fee Structure Item
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {editMode
            ? "Update fee structure item details."
            : "Add amount and link it with the Fee Head and Fee Structure."}
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* AMOUNT */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }
              placeholder="Enter amount"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            />

          </div>

          {/* MANDATORY */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Mandatory
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 px-4 py-2.5">

              <input
                type="checkbox"
                checked={mandatory}
                onChange={(e) =>
                  setMandatory(
                    e.target.checked
                  )
                }
                disabled={loading}
                className="h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                This fee is mandatory
              </span>

            </label>

          </div>

          {/* FEE HEAD */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fee Head
            </label>

            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">

              {feeHead?.attributes?.name ||
                feeHead?.name ||
                "Fee Head not available"}

            </div>

          </div>

          {/* FEE STRUCTURE */}

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

        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* BUTTONS */}

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
  );
}