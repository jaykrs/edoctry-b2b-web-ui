"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

interface Props {
  onNext?: (data?: any) => void;
  initialData?: any;
}

export default function FeeStructureItem({
  onNext,
  initialData,
}: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [mandatory, setMandatory] = useState(true);
  const [vendoruuid, setVendoruuid] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * GET VENDOR UUID
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

      return typeof uuid === "string"
        ? uuid.trim()
        : "";
    } catch (err) {
      console.error("Vendor UUID Error:", err);
      return "";
    }
  };

  /*
   * INITIAL DATA
   */
  useEffect(() => {
    const attrs =
      initialData?.attributes ||
      initialData ||
      {};

    setName(attrs?.name || "");
    setAmount(
      attrs?.amount !== undefined &&
        attrs?.amount !== null
        ? String(attrs.amount)
        : ""
    );

    setMandatory(
      attrs?.mandatory !== undefined
        ? Boolean(attrs.mandatory)
        : true
    );

    const uuid =
      attrs?.vendoruuid ||
      getVendorUuid();

    if (uuid) {
      setVendoruuid(uuid);
    }
  }, [initialData]);

  /*
   * SET VENDOR UUID
   */
  useEffect(() => {
    if (vendoruuid) return;

    const uuid = getVendorUuid();

    if (uuid) {
      setVendoruuid(uuid);
    }
  }, [vendoruuid]);

  /*
   * SUBMIT
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
          "Fee Structure Item Name is required."
        );
        return;
      }

      if (!amount.trim()) {
        setError(
          "Amount is required."
        );
        return;
      }

      const numericAmount = Number(amount);

      if (
        Number.isNaN(numericAmount) ||
        numericAmount < 0
      ) {
        setError(
          "Please enter a valid amount."
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

      const itemId =
        initialData?.id ||
        initialData?.data?.id;

      const isEdit =
        Boolean(itemId);

      const payload = {
        name: name.trim(),
        amount: numericAmount,
        mandatory,
        vendoruuid: vendoruuid.trim(),
      };

      console.log(
        "Fee Structure Item Payload:",
        payload
      );

      const url = isEdit
        ? `${apiUrl}/api/fee-structure-items/${itemId}`
        : `${apiUrl}/api/fee-structure-items`;

      const response = await fetch(url, {
        method: isEdit
          ? "PUT"
          : "POST",

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
        "Saved Fee Structure Item:",
        result
      );

      setSuccess(
        isEdit
          ? "Fee Structure Item updated successfully."
          : "Fee Structure Item created successfully."
      );

      const nextData =
        result?.data || {};

      /*
       * Redirect to Fee Invoice
       */
      if (typeof onNext === "function") {
        onNext(nextData);
      }
    } catch (err) {
      console.error(
        "Fee Structure Item Save Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save Fee Structure Item."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {initialData
              ? "Edit Fee Structure Item"
              : "Create Fee Structure Item"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create a Fee Structure Item with a meaningful name and amount.
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
              Fee Structure Item Name
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
              placeholder="Example: Tuition Fee"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
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
                setAmount(e.target.value)
              }
              placeholder="Example: 50000"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Mandatory */}
          <div className="mb-6">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={mandatory}
                onChange={(e) =>
                  setMandatory(
                    e.target.checked
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Mandatory Fee
              </span>
            </label>

            <p className="mt-1 text-xs text-gray-500">
              Mark this item as mandatory if every applicable student must pay it.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end border-t border-gray-200 pt-5 dark:border-gray-700">

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : initialData
                ? "Update & Next"
                : "Save & Next"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}