"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/utils/config";

interface FeeHead {
  id: number;
  attributes?: {
    name?: string;
    description?: string;
    isRefundable?: boolean;
    isTaxable?: boolean;
    fee_structure?: {
      data?: {
        id: number;
        attributes?: {
          name?: string;
        };
      };
    };
  };
}

export default function FeeHeadPage() {
  const [feeHeads, setFeeHeads] = useState<FeeHead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeeHeads = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("jwt");

      const response = await fetch(
        `${apiUrl}/api/fee-heads?populate[fee_structure]=true&sort=createdAt:desc`,
        {
          headers: {
            Accept: "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      setFeeHeads(result?.data || []);
    } catch (err) {
      console.error("Fee Head Fetch Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load Fee Heads."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeHeads();
  }, []);

  return (
    <div className="w-full px-2 sm:px-3">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Fee Head
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage Fee Heads
          </p>
        </div>

        <Link
          href="/admin/fee-head/create"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Fee Head
        </Link>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading Fee Heads...
          </div>
        ) : feeHeads.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No Fee Head records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    ID
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Name
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Description
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Fee Structure
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Refundable
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Taxable
                  </th>
                </tr>
              </thead>

              <tbody>
                {feeHeads.map((feeHead) => {
                  const attributes = feeHead.attributes;

                  const structureName =
                    attributes?.fee_structure?.data?.attributes
                      ?.name || "-";

                  return (
                    <tr
                      key={feeHead.id}
                      className="border-b border-gray-100 last:border-b-0 dark:border-gray-700"
                    >
                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {feeHead.id}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-white">
                        {attributes?.name || "-"}
                      </td>

                      <td className="max-w-[300px] px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {attributes?.description || "-"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {structureName}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {attributes?.isRefundable ? "Yes" : "No"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {attributes?.isTaxable ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}