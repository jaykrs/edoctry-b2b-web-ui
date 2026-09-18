"use client";

import React, {
  Suspense,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiUrl } from "@/utils/config";

interface FeeStructureItem {
  id: number;
  attributes?: {
    amount?: number;
    mandatory?: boolean;
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

function FeeStructureItemContent() {
  const searchParams = useSearchParams();

  const feeStructureId = searchParams.get("fee_structure_id");

  const [items, setItems] = useState<FeeStructureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("jwt");

      let url =
        `${apiUrl}/api/fee-structure-items` +
        `?populate[fee_structure]=true` +
        `&sort=createdAt:desc`;

      if (feeStructureId) {
        url +=
          `&filters[fee_structure][id][$eq]=` +
          encodeURIComponent(feeStructureId);
      }

      const response = await fetch(url, {
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

      setItems(result?.data || []);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [feeStructureId]);

  return (
    <div className="w-full px-2 sm:px-3">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Fee Structure Item
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage Fee Structure Items
          </p>
        </div>

        <Link
          href="/admin/fee-structure-item/create"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Fee Structure Item
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
            Loading Fee Structure Items...
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No Fee Structure Item records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    ID
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Mandatory
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Fee Structure
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => {
                  const attributes = item.attributes;

                  const structureName =
                    attributes?.fee_structure?.data
                      ?.attributes?.name || "-";

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 last:border-b-0 dark:border-gray-700"
                    >
                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {item.id}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {attributes?.amount ?? "-"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {attributes?.mandatory ? "Yes" : "No"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {structureName}
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

export default function FeeStructureItemPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full px-2 sm:px-3">
          <div className="p-8 text-center text-sm text-gray-500">
            Loading Fee Structure Items...
          </div>
        </div>
      }
    >
      <FeeStructureItemContent />
    </Suspense>
  );
}