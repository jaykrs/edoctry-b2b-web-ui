"use client";

import React, { useEffect, useState } from "react";
import { apiUrl } from "@/utils/config";

type InvoiceLineItemProps = {
  onNext: (data?: any) => void;
  onBack: () => void;
  data?: any;
  feeHead?: any;
  feeStructure?: any;
  studentConcession?: any;
};

type FormData = {
 feeHeadName: string;
  amount: string;
};

export default function InvoiceLineItem({
  onNext,
  onBack,
  data,
  feeHead,
  feeStructure,
  studentConcession,
}: InvoiceLineItemProps) {
  const [formData, setFormData] = useState<FormData>({
    feeHeadName: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------
  // Get vendor UUID
  // ---------------------------------------
  const getVendorUuid = () => {
    const staffDataString = localStorage.getItem("staffData");

    if (!staffDataString) {
      throw new Error(
        "Vendor information not found. Please login again."
      );
    }

    const staffData = JSON.parse(staffDataString);

    const vendoruuid =
      staffData?.data?.[0]?.attributes?.vendoruuid ||
      staffData?.data?.attributes?.vendoruuid ||
      staffData?.attributes?.vendoruuid ||
      staffData?.vendoruuid ||
      "";

    if (!vendoruuid) {
      throw new Error(
        "Vendor UUID not found. Please login again."
      );
    }

    return vendoruuid;
  };

  // ---------------------------------------
  // Get Fee Head name
  // ---------------------------------------
  const getFeeHeadName = () => {
    return (
      feeHead?.attributes?.name ||
      feeHead?.name ||
      feeHead?.data?.attributes?.name ||
      feeHead?.data?.name ||
      ""
    );
  };

  // ---------------------------------------
  // Existing data
  // ---------------------------------------
  useEffect(() => {
    if (data) {
      const itemData = data?.attributes || data;

      setFormData({
        feeHeadName:
          itemData?.feeHeadName ||
          getFeeHeadName() ||
          "",
        amount:
          itemData?.amount != null
            ? String(itemData.amount)
            : "",
      });

      return;
    }

    const headName = getFeeHeadName();

    if (headName) {
      setFormData((prev) => ({
        ...prev,
        feeHeadName: headName,
      }));
    }
  }, [data, feeHead]);

  // ---------------------------------------
  // Change
  // ---------------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------------------------------
  // Submit
  // ---------------------------------------
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!formData.feeHeadName.trim()) {
      setError("Fee Head name is required.");
      return;
    }

    if (!formData.amount) {
      setError("Amount is required.");
      return;
    }

    const amount = Number(formData.amount);

    if (Number.isNaN(amount) || amount < 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("jwt");
      const vendoruuid = getVendorUuid();

      const invoiceId =
        data?.fee_invoice?.data?.id ||
        data?.fee_invoice?.id ||
        data?.fee_invoice ||
        null;

      /*
       * IMPORTANT:
       *
       * Invoice Line Item schema requires fee_invoice.
       *
       * At this point the Fee Invoice is created
       * in Step 5, so during Step 4 we cannot
       * create the line item against an invoice
       * that does not exist yet.
       *
       * Therefore we keep this data in workflow
       * and do not POST here unless an invoice ID
       * already exists.
       */

      const lineItemData = {
        feeHeadName: formData.feeHeadName.trim(),
        amount,
        fee_invoice: invoiceId,
        vendoruuid,
      };

      console.log(
        "Invoice Line Item Workflow Data:",
        lineItemData
      );

      /*
       * If an invoice already exists, save it.
       *
       * For the normal CREATE workflow, invoiceId
       * will be null because Fee Invoice is Step 5.
       */
      if (invoiceId) {
        const response = await fetch(
          `${apiUrl}/api/invoice-line-items`,
          {
            method: "POST",
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
              data: lineItemData,
            }),
          }
        );

        const result = await response
          .json()
          .catch(() => null);

        if (!response.ok) {
          throw new Error(
            result?.error?.message ||
              `HTTP Error: ${response.status}`
          );
        }

        onNext(result?.data);
        return;
      }

      /*
       * Normal workflow:
       * Pass the line item data to Step 5.
       */
      onNext({
        feeHeadName: formData.feeHeadName.trim(),
        amount,
        vendoruuid,
        feeHead,
        feeStructure,
        studentConcession,
      });
    } catch (err) {
      console.error(
        "Invoice Line Item Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save Invoice Line Item."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Invoice Line Item
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add the fee head amount for this invoice.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          {/* Fee Head */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fee Head
            </label>

            <input
              type="text"
              name="feeHeadName"
              value={formData.feeHeadName}
              onChange={handleChange}
              placeholder="Fee Head"
              readOnly={Boolean(getFeeHeadName())}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save & Next"}
          </button>
        </div>
      </form>
    </div>
  );
}