"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface FeeStructureProps {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  editMode?: boolean;
}

const cycleTypes = [
  "MONTHLY",
  "QUARTERLY",
  "SEMESTER",
  "ANNUALLY",
  "ONE_TIME",
];

export default function FeeStructure({
  onNext,
  onBack,
  data,
  editMode = false,
}: FeeStructureProps) {
  const [name, setName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [cycleType, setCycleType] = useState("");
  const [programId, setProgramId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================
  // LOAD EXISTING DATA IN EDIT MODE
  // =========================================

  useEffect(() => {
    if (!data) {
      return;
    }

    const structureData =
      data?.attributes || data;

    setName(structureData?.name || "");
    setAcademicYear(
      structureData?.academicYear || ""
    );
    setCycleType(
      structureData?.cycleType || ""
    );
    setProgramId(
      structureData?.programId || ""
    );
  }, [data]);

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError(
        "Fee Structure Name is required."
      );
      return;
    }

    if (!academicYear.trim()) {
      setError(
        "Academic Year is required."
      );
      return;
    }

    if (!programId.trim()) {
      setError(
        "Program ID is required."
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("jwt");

      const payload = {
        name: name.trim(),
        academicYear:
          academicYear.trim(),
        cycleType:
          cycleType || undefined,
        programId: programId.trim(),
      };

      let response: Response;

      // =====================================
      // EDIT → PUT
      // =====================================

      if (editMode && data?.id) {
        response = await fetch(
          `${apiUrl}/api/fee-structures/${data.id}`,
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
          `${apiUrl}/api/fee-structures`,
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
        "Fee Structure API Response:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const savedFeeStructure =
        result?.data;

      console.log(
        editMode
          ? "Fee Structure Updated:"
          : "Fee Structure Created:",
        savedFeeStructure
      );

      // =====================================
      // NEXT STEP
      // =====================================

      onNext(savedFeeStructure);
    } catch (err: any) {
      console.error(
        "Fee Structure API Error:",
        err
      );

      setError(
        err?.message ||
          (editMode
            ? "Failed to update Fee Structure."
            : "Failed to create Fee Structure.")
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
          Fee Structure
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {editMode
            ? "Update fee structure details."
            : "Create a fee structure for the selected program."}
        </p>

      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fee Structure Name
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. B.Tech Tuition Fee"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            />

          </div>

          {/* ACADEMIC YEAR */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Academic Year
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="text"
              value={academicYear}
              onChange={(e) =>
                setAcademicYear(
                  e.target.value
                )
              }
              placeholder="e.g. 2026-27"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            />

          </div>

          {/* CYCLE TYPE */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cycle Type
            </label>

            <select
              value={cycleType}
              onChange={(e) =>
                setCycleType(
                  e.target.value
                )
              }
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            >

              <option value="">
                Select Cycle Type
              </option>

              {cycleTypes.map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                )
              )}

            </select>

          </div>

          {/* PROGRAM ID */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Program ID
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="text"
              value={programId}
              onChange={(e) =>
                setProgramId(
                  e.target.value
                )
              }
              placeholder="Enter Program ID"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
            />

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