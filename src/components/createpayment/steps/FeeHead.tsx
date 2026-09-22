"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface FeeHeadProps {
  onNext?: (data?: any) => void;
  onBack?: () => void;
  data?: any;
}

interface FeeStructure {
  id: number;
  name?: string;
  academicYear?: string;
  cycleType?: string;
  programId?: string;
  attributes?: {
    name?: string;
    academicYear?: string;
    cycleType?: string;
    programId?: string;
  };
}

export default function FeeHead({
  onNext,
  onBack,
  data,
}: FeeHeadProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isRefundable, setIsRefundable] = useState(false);
  const [isTaxable, setIsTaxable] = useState(false);

  const [selectedFeeStructure, setSelectedFeeStructure] =
    useState("");

  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(
    []
  );

  const [vendoruuid, setVendoruuid] = useState("");
  const [loadingStructures, setLoadingStructures] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ----------------------------------------------------
  // GET VENDOR UUID
  // ----------------------------------------------------
  const getVendorUuid = (): string => {
    try {
      const staffData = localStorage.getItem("staffData");

      if (!staffData) {
        return "";
      }

      const parsed = JSON.parse(staffData);

      const uuid =
        parsed?.data?.[0]?.attributes?.vendoruuid ||
        parsed?.data?.attributes?.vendoruuid ||
        parsed?.attributes?.vendoruuid ||
        parsed?.vendoruuid ||
        "";

      return typeof uuid === "string" ? uuid.trim() : "";
    } catch (err) {
      console.error("Vendor UUID Parse Error:", err);
      return "";
    }
  };

  // ----------------------------------------------------
  // INITIAL DATA
  // ----------------------------------------------------
  useEffect(() => {
    if (!data) return;

    const attrs = data?.attributes || data;

    setName(attrs?.name || "");
    setDescription(attrs?.description || "");
    setIsRefundable(Boolean(attrs?.isRefundable));
    setIsTaxable(Boolean(attrs?.isTaxable));

    const structureId =
      attrs?.fee_structure?.data?.id ||
      attrs?.fee_structure?.id ||
      attrs?.fee_structure ||
      attrs?.selectedFeeStructureId ||
      attrs?.selectedFeeStructure ||
      "";

    if (structureId) {
      setSelectedFeeStructure(String(structureId));
    }
  }, [data]);

  // ----------------------------------------------------
  // LOAD VENDOR UUID
  // ----------------------------------------------------
  useEffect(() => {
    const uuid = getVendorUuid();

    if (uuid) {
      setVendoruuid(uuid);
    }
  }, []);

  // ----------------------------------------------------
  // LOAD FEE STRUCTURES
  // ----------------------------------------------------
  useEffect(() => {
    if (!vendoruuid) {
      return;
    }

    fetchFeeStructures();
  }, [vendoruuid]);

  const fetchFeeStructures = async () => {
    try {
      setLoadingStructures(true);
      setError("");

      const token = localStorage.getItem("jwt");

      const url =
        `${apiUrl}/api/fee-structures` +
        `?filters[vendoruuid][$eq]=${encodeURIComponent(
          vendoruuid
        )}` +
        `&sort=createdAt:desc`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const formattedStructures: FeeStructure[] = (
        result?.data || []
      ).map((item: any) => ({
        id: item?.id,
        ...(item?.attributes || {}),
        attributes: item?.attributes || {},
      }));

      setFeeStructures(formattedStructures);
    } catch (err) {
      console.error("Fee Structure API Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load Fee Structures."
      );

      setFeeStructures([]);
    } finally {
      setLoadingStructures(false);
    }
  };

  // ----------------------------------------------------
  // SUBMIT
  // ----------------------------------------------------
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      if (!name.trim()) {
        setError("Fee Head Name is required.");
        return;
      }

      if (!selectedFeeStructure) {
        setError("Please select a Fee Structure.");
        return;
      }

      if (!vendoruuid) {
        setError(
          "Vendor UUID not found. Please login again."
        );
        return;
      }

      setSaving(true);

      const token = localStorage.getItem("jwt");

      const payload = {
        name: name.trim(),
        description: description.trim(),
        isRefundable,
        isTaxable,
        fee_structure: Number(selectedFeeStructure),
        vendoruuid: vendoruuid.trim(),
      };

      const feeHeadId =
        data?.id ||
        data?.data?.id;

      const isEdit = Boolean(feeHeadId);

      const url = isEdit
        ? `${apiUrl}/api/fee-heads/${feeHeadId}`
        : `${apiUrl}/api/fee-heads`;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
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
      });

      const result = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const savedFeeHead = result?.data;

      setSuccess(
        isEdit
          ? "Fee Head updated successfully."
          : "Fee Head created successfully."
      );

      const nextData = {
        ...(savedFeeHead || {}),
        selectedFeeStructureId: Number(
          selectedFeeStructure
        ),
        selectedFeeStructure: Number(
          selectedFeeStructure
        ),
        fee_structure: Number(
          selectedFeeStructure
        ),
      };

      if (typeof onNext === "function") {
        onNext(nextData);
      }
    } catch (err) {
      console.error("Fee Head Save Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save Fee Head."
      );
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------
  // BACK
  // ----------------------------------------------------
  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------
  return (
    <div className="w-full">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {data ? "Edit Fee Head" : "Create Fee Head"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create a Fee Head and associate it with a Fee
            Structure.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          {/* Fee Head Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Fee Head Name
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Fee Head Name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Fee Structure */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Fee Structure
              <span className="ml-1 text-red-500">*</span>
            </label>

            <select
              value={selectedFeeStructure}
              onChange={(e) =>
                setSelectedFeeStructure(e.target.value)
              }
              disabled={loadingStructures}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">
                {loadingStructures
                  ? "Loading Fee Structures..."
                  : feeStructures.length === 0
                  ? "No Fee Structures Found"
                  : "Select Fee Structure"}
              </option>

              {feeStructures.map((structure) => {
                const structureName =
                  structure?.name ||
                  structure?.attributes?.name ||
                  `Fee Structure #${structure?.id}`;

                return (
                  <option
                    key={structure.id}
                    value={structure.id}
                  >
                    {structureName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Enter description"
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Checkboxes */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-600">
              <input
                type="checkbox"
                checked={isRefundable}
                onChange={(e) =>
                  setIsRefundable(e.target.checked)
                }
                className="h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Refundable
                </p>

                <p className="text-xs text-gray-500">
                  Mark this fee as refundable.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-600">
              <input
                type="checkbox"
                checked={isTaxable}
                onChange={(e) =>
                  setIsTaxable(e.target.checked)
                }
                className="h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Taxable
                </p>

                <p className="text-xs text-gray-500">
                  Mark this fee as taxable.
                </p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-5 dark:border-gray-700">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : data
                ? "Update & Next"
                : "Save & Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}