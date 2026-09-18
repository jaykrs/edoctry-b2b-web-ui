"use client";

import React, {
  Suspense,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiUrl } from "@/utils/config";

interface FeeStructureAttributes {
  name: string;
  academicYear: string;
  cycleType: string;
  programId: string;
  vendoruuid?: string | null;
  items?: {
    data?: unknown[];
  };
  fee_invoices?: {
    data?: unknown[];
  };
}

interface FeeStructure {
  id: number;
  attributes: FeeStructureAttributes;
}

function FeeStructureContent() {
  const searchParams = useSearchParams();
  const feeStructureId = searchParams.get("fee_structure_id");

  const [feeStructures, setFeeStructures] = useState<
    FeeStructure[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeeStructures = async () => {
    try {
      setLoading(true);
      setError("");

      let url = "";

      if (feeStructureId) {
        url = `${apiUrl}/api/fee-structures/${feeStructureId}?populate=items,fee_invoices`;
      } else {
        url = `${apiUrl}/api/fee-structures?populate=items,fee_invoices`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      console.log(
        "Fee Structure API Response:",
        result
      );

      if (feeStructureId) {
        if (result?.data) {
          setFeeStructures([result.data]);
        } else {
          setFeeStructures([]);
        }
      } else {
        setFeeStructures(result?.data || []);
      }
    } catch (err) {
      console.error(
        "Fee Structure fetch error:",
        err
      );

      setError("Failed to load fee structures.");
      setFeeStructures([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeStructures();
  }, [feeStructureId]);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Fee Structure
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage fee structures
            </p>
          </div>

          <Link
            href="/admin/fee-structure/create"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Create Fee Structure
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-500">
              Loading fee structures...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          feeStructures.length === 0 && (
            <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="mb-4 text-sm text-gray-500">
                No Fee Structure records found.
              </p>

              <button
                onClick={fetchFeeStructures}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
          )}

        {/* Table */}
        {!loading &&
          !error &&
          feeStructures.length > 0 && (
            <div className="w-full max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="w-[7%] px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200">
                      ID
                    </th>

                    <th className="w-[18%] px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Name
                    </th>

                    <th className="w-[15%] px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Academic Year
                    </th>

                    <th className="w-[15%] px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Cycle Type
                    </th>

                    <th className="w-[17%] px-2 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Program ID
                    </th>

                    <th className="w-[10%] px-2 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Items
                    </th>

                    <th className="w-[10%] px-2 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Invoices
                    </th>

                    <th className="w-[8%] px-2 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-200">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {feeStructures.map(
                    (feeStructure) => {
                      const attributes =
                        feeStructure.attributes;

                      const itemCount =
                        Array.isArray(
                          attributes?.items?.data
                        )
                          ? attributes.items.data.length
                          : 0;

                      const invoiceCount =
                        Array.isArray(
                          attributes?.fee_invoices?.data
                        )
                          ? attributes.fee_invoices.data
                              .length
                          : 0;

                      return (
                        <tr
                          key={feeStructure.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          {/* ID */}
                          <td className="max-w-0 overflow-hidden px-2 py-4 text-sm text-gray-700 dark:text-gray-200">
                            {feeStructure.id}
                          </td>

                          {/* Name */}
                          <td className="max-w-0 overflow-hidden px-2 py-4 text-sm font-medium text-gray-800 dark:text-white">
                            <div
                              className="truncate"
                              title={
                                attributes?.name || ""
                              }
                            >
                              {attributes?.name || "-"}
                            </div>
                          </td>

                          {/* Academic Year */}
                          <td className="max-w-0 overflow-hidden px-2 py-4 text-sm text-gray-700 dark:text-gray-200">
                            <div
                              className="truncate"
                              title={
                                attributes?.academicYear ||
                                ""
                              }
                            >
                              {attributes?.academicYear ||
                                "-"}
                            </div>
                          </td>

                          {/* Cycle Type */}
                          <td className="max-w-0 overflow-hidden px-2 py-4 text-sm text-gray-700 dark:text-gray-200">
                            <div
                              className="truncate"
                              title={
                                attributes?.cycleType ||
                                ""
                              }
                            >
                              {attributes?.cycleType || "-"}
                            </div>
                          </td>

                          {/* Program ID */}
                          <td className="max-w-0 overflow-hidden px-2 py-4 text-sm text-gray-700 dark:text-gray-200">
                            <div
                              className="truncate"
                              title={
                                attributes?.programId ||
                                ""
                              }
                            >
                              {attributes?.programId || "-"}
                            </div>
                          </td>

                          {/* Items */}
                          <td className="px-2 py-4 text-center text-sm text-gray-700 dark:text-gray-200">
                            {itemCount}
                          </td>

                          {/* Invoices */}
                          <td className="px-2 py-4 text-center text-sm text-gray-700 dark:text-gray-200">
                            {invoiceCount}
                          </td>

                          {/* Action */}
                          <td className="px-2 py-4 text-center text-sm">
                            <Link
                              href={`/admin/fee-structure-item?fee_structure_id=${feeStructure.id}`}
                              className="font-medium text-blue-600 hover:underline"
                            >
                              Items
                            </Link>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}

export default function FeeStructurePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-full overflow-x-hidden">
          <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm text-gray-500">
                Loading fee structures...
              </p>
            </div>
          </div>
        </div>
      }
    >
      <FeeStructureContent />
    </Suspense>
  );
}