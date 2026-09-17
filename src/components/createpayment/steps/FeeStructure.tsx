"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface FeeStructureProps {
  onNext?: (data?: any) => void;
  onBack?: () => void;
  data?: any;
}

interface FeeStructureItem {
  id: number;
  name?: string;
  amount?: number | string;
  mandatory?: boolean;
  vendoruuid?: string;

  attributes?: {
    name?: string;
    amount?: number | string;
    mandatory?: boolean;
    vendoruuid?: string;
    fee_structure?: any;
  };
}

export default function FeeStructure({
  onNext,
  onBack,
  data,
}: FeeStructureProps) {
  const [name, setName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [cycleType, setCycleType] = useState("");
  const [programId, setProgramId] = useState("");

  const [items, setItems] = useState<FeeStructureItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [vendoruuid, setVendoruuid] = useState("");

  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * --------------------------------------------------
   * GET VENDOR UUID
   * --------------------------------------------------
   */
  const getVendorUuid = () => {
    try {
      const staffData = localStorage.getItem("staffData");

      if (!staffData) return "";

      const parsed = JSON.parse(staffData);

      const uuid =
        parsed?.data?.[0]?.attributes?.vendoruuid ||
        parsed?.data?.attributes?.vendoruuid ||
        parsed?.attributes?.vendoruuid ||
        parsed?.vendoruuid ||
        "";

      return typeof uuid === "string" ? uuid.trim() : "";
    } catch (err) {
      console.error("Vendor UUID Error:", err);
      return "";
    }
  };

  /*
   * --------------------------------------------------
   * INITIAL DATA
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!data) return;

    const attrs = data?.attributes || data;

    setName(attrs?.name || "");
    setAcademicYear(attrs?.academicYear || "");
    setCycleType(attrs?.cycleType || "");
    setProgramId(attrs?.programId || "");

    const existingItems =
      attrs?.items?.data ||
      attrs?.items ||
      [];

    const ids = Array.isArray(existingItems)
      ? existingItems
          .map((item: any) =>
            Number(item?.id || item)
          )
          .filter(
            (id: number) => !Number.isNaN(id)
          )
      : [];

    setSelectedItems(ids);
  }, [data]);

  /*
   * --------------------------------------------------
   * SET VENDOR UUID
   * --------------------------------------------------
   */
  useEffect(() => {
    const uuid = getVendorUuid();

    if (uuid) {
      setVendoruuid(uuid);
    }
  }, []);

  /*
   * --------------------------------------------------
   * LOAD FEE STRUCTURE ITEMS
   * --------------------------------------------------
   */
  useEffect(() => {
    if (!vendoruuid) return;

    fetchFeeStructureItems();
  }, [vendoruuid]);

  const fetchFeeStructureItems = async () => {
    try {
      setLoadingItems(true);
      setError("");

      const token =
        localStorage.getItem("jwt");

      const url =
        `${apiUrl}/api/fee-structure-items` +
        `?filters[vendoruuid][$eq]=${encodeURIComponent(
          vendoruuid
        )}` +
        `&sort=createdAt:desc`;

      console.log(
        "Fee Structure Items URL:",
        url
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",

          ...(token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : {}),
        },
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

      const formattedItems: FeeStructureItem[] =
        (result?.data || []).map(
          (item: any) => ({
            id: item?.id,

            ...(item?.attributes || {}),

            attributes:
              item?.attributes || {},
          })
        );

      console.log(
        "Fee Structure Items:",
        formattedItems
      );

      setItems(formattedItems);
    } catch (err) {
      console.error(
        "Fee Structure Item Fetch Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load Fee Structure Items."
      );

      setItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  /*
   * --------------------------------------------------
   * SELECT / UNSELECT ITEM
   * --------------------------------------------------
   */
  const toggleItem = (id: number) => {
    setSelectedItems((previous) => {
      if (previous.includes(id)) {
        return previous.filter(
          (itemId) => itemId !== id
        );
      }

      return [...previous, id];
    });
  };

  /*
   * --------------------------------------------------
   * SUBMIT
   * --------------------------------------------------
   */
  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

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

      if (selectedItems.length === 0) {
        setError(
          "Please select at least one Fee Structure Item."
        );
        return;
      }

      if (!vendoruuid) {
        setError(
          "Vendor UUID not found. Please login again."
        );
        return;
      }

      setSaving(true);

      const token =
        localStorage.getItem("jwt");

      const payload = {
        name: name.trim(),

        academicYear:
          academicYear.trim(),

        cycleType:
          cycleType || undefined,

        programId:
          programId.trim(),

        vendoruuid:
          vendoruuid.trim(),

        items: selectedItems,
      };

      console.log(
        "Fee Structure Payload:",
        payload
      );

      const structureId =
        data?.id ||
        data?.data?.id;

      const isEdit =
        Boolean(structureId);

      const url = isEdit
        ? `${apiUrl}/api/fee-structures/${structureId}`
        : `${apiUrl}/api/fee-structures`;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",

        headers: {
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

      console.log(
        "Saved Fee Structure:",
        result
      );

      setSuccess(
        isEdit
          ? "Fee Structure updated successfully."
          : "Fee Structure created successfully."
      );

      const nextData = {
        ...(result?.data || {}),

        selectedItemIds:
          selectedItems,

        items:
          selectedItems,
      };

      if (typeof onNext === "function") {
        onNext(nextData);
      }
    } catch (err) {
      console.error(
        "Fee Structure Save Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save Fee Structure."
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * --------------------------------------------------
   * BACK
   * --------------------------------------------------
   */
  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    }
  };

  /*
   * --------------------------------------------------
   * HELPERS
   * --------------------------------------------------
   */
  const getItemName = (
    item: FeeStructureItem
  ) => {
    return (
      item?.name ||
      item?.attributes?.name ||
      `Fee Item #${item.id}`
    );
  };

  const getAmount = (
    item: FeeStructureItem
  ) => {
    return (
      item?.amount ??
      item?.attributes?.amount ??
      0
    );
  };

  const getMandatory = (
    item: FeeStructureItem
  ) => {
    return Boolean(
      item?.mandatory ??
        item?.attributes?.mandatory ??
        false
    );
  };

  /*
   * --------------------------------------------------
   * UI
   * --------------------------------------------------
   */
  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {data
              ? "Edit Fee Structure"
              : "Create Fee Structure"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create a Fee Structure and select
            multiple existing Fee Structure Items.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Fee Structure Name
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Example: 2026-27 Semester Fee"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Academic Year */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Academic Year
              <span className="ml-1 text-red-500">
                *
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
              placeholder="Example: 2026-27"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Cycle Type */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Cycle Type
            </label>

            <select
              value={cycleType}
              onChange={(e) =>
                setCycleType(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">
                Select Cycle Type
              </option>

              <option value="MONTHLY">
                Monthly
              </option>

              <option value="QUARTERLY">
                Quarterly
              </option>

              <option value="SEMESTER">
                Semester
              </option>

              <option value="ANNUALLY">
                Annually
              </option>

              <option value="ONE_TIME">
                One Time
              </option>
            </select>
          </div>

          {/* Program ID */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Program ID
              <span className="ml-1 text-red-500">
                *
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Fee Structure Items */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Fee Structure Items
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Select multiple existing Fee Structure Items.
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {selectedItems.length} Selected
              </span>
            </div>

            {loadingItems ? (
              <div className="rounded-lg border border-gray-200 p-6 text-center text-sm text-gray-500">
                Loading Fee Structure Items...
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-700">
                No Fee Structure Items found.
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px]">

                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">

                        <th className="w-16 px-4 py-3 text-center text-xs font-semibold uppercase text-gray-500">
                          Select
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                          Fee Item
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                          Amount
                        </th>

                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                          Mandatory
                        </th>

                      </tr>
                    </thead>

                    <tbody>
                      {items.map(
                        (item) => {
                          const checked =
                            selectedItems.includes(
                              item.id
                            );

                          return (
                            <tr
                              key={item.id}
                              onClick={() =>
                                toggleItem(
                                  item.id
                                )
                              }
                              className={`cursor-pointer border-b border-gray-100 last:border-0 ${
                                checked
                                  ? "bg-blue-50"
                                  : "hover:bg-gray-50"
                              }`}
                            >

                              {/* Select */}
                              <td className="px-4 py-4 text-center">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() =>
                                    toggleItem(
                                      item.id
                                    )
                                  }
                                  onClick={(e) =>
                                    e.stopPropagation()
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                              </td>

                              {/* Fee Item Name */}
                              <td className="px-4 py-4 text-sm font-medium text-gray-700">
                                {getItemName(item)}
                              </td>

                              {/* Amount */}
                              <td className="px-4 py-4 text-sm font-medium text-gray-800">
                                ₹{" "}
                                {Number(
                                  getAmount(item)
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </td>

                              {/* Mandatory */}
                              <td className="px-4 py-4">
                                {getMandatory(
                                  item
                                ) ? (
                                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                    Yes
                                  </span>
                                ) : (
                                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                    No
                                  </span>
                                )}
                              </td>

                            </tr>
                          );
                        }
                      )}
                    </tbody>

                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Selected Total */}
          {selectedItems.length > 0 && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">
                  Selected Items
                </span>

                <span className="text-sm font-semibold text-blue-800">
                  {selectedItems.length}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">
                  Total Amount
                </span>

                <span className="text-lg font-bold text-blue-800">
                  ₹{" "}
                  {items
                    .filter((item) =>
                      selectedItems.includes(
                        item.id
                      )
                    )
                    .reduce(
                      (
                        total,
                        item
                      ) =>
                        total +
                        Number(
                          getAmount(
                            item
                          ) || 0
                        ),
                      0
                    )
                    .toLocaleString(
                      "en-IN"
                    )}
                </span>
              </div>

            </div>
          )}

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