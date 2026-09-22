"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/config";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { PencilIcon } from "@/icons";

interface Payment {
  id: number;
  receiptNumber: string;
  amount: string;
  paymentMode: string;
  gatewayRef: string;
  paymentDate: string;
  remarks: string;
  invoiceNumber: string;
  invoiceId: number | string;
}

export default function Payment() {
  const router = useRouter();

  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // =========================
  // Fetch Fee Payments
  // =========================

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("jwt");

        const response = await fetch(
          `${apiUrl}/api/fee-payments?populate=*`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",

              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },

            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status}`
          );
        }

        const result = await response.json();

        console.log(
          "Fee Payment API Response:",
          result
        );

        // =========================
        // Format Strapi Response
        // =========================

        const formattedPayments =
          result?.data?.map((item: any) => {
            const data =
              item?.attributes || item;

            // Fee Invoice relation
            const feeInvoice =
              data?.fee_invoice?.data ||
              data?.fee_invoice;

            const invoiceAttributes =
              feeInvoice?.attributes ||
              feeInvoice ||
              {};

            return {
              id: item?.id || 0,

              receiptNumber:
                data?.receiptNumber || "-",

              amount:
                data?.amount !== undefined &&
                data?.amount !== null
                  ? String(data.amount)
                  : "0",

              paymentMode:
                data?.paymentMode || "-",

              gatewayRef:
                data?.gatewayRef || "-",

              paymentDate:
                data?.paymentDate || "-",

              remarks:
                data?.remarks || "-",

              invoiceNumber:
                invoiceAttributes?.invoiceNumber ||
                "-",

              invoiceId:
                feeInvoice?.id || "-",
            };
          }) || [];

        setPayments(formattedPayments);
      } catch (err) {
        console.error(
          "Fee Payment API Error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // =========================
  // Search / Filter
  // =========================

  const filteredPayments =
    payments.filter((payment) => {
      const searchText =
        search.toLowerCase().trim();

      if (!searchText) {
        return true;
      }

      return (
        payment.receiptNumber
          ?.toLowerCase()
          .includes(searchText) ||

        payment.amount
          ?.toLowerCase()
          .includes(searchText) ||

        payment.paymentMode
          ?.toLowerCase()
          .includes(searchText) ||

        payment.gatewayRef
          ?.toLowerCase()
          .includes(searchText) ||

        payment.paymentDate
          ?.toLowerCase()
          .includes(searchText) ||

        payment.remarks
          ?.toLowerCase()
          .includes(searchText) ||

        payment.invoiceNumber
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  // =========================
  // Format Date
  // =========================

  const formatDate = (
    date: string
  ) => {
    if (!date || date === "-") {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div>
      {/* =========================
          Header
      ========================= */}

      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              💳 Payment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage fee payment records.
            </p>
          </div>

          {/* Create Payment */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/create-payment"
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-xl font-medium text-white hover:bg-blue-700"
            title="Create Payment"
          >
            +
          </button>

        </div>
      </div>

      {/* =========================
          Search Bar
      ========================= */}

      <div className="mt-5 mb-4 flex items-center justify-end gap-4 px-6">

        <div className="relative w-full max-w-md">

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search payments..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* =========================
          Payment Records
      ========================= */}

      <div className="mt-4 mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white p-4">

        {loading ? (

          <div className="p-8 text-center text-gray-500">
            Loading payments...
          </div>

        ) : error ? (

          <div className="p-8 text-center text-red-500">
            {error}
          </div>

        ) : filteredPayments.length === 0 ? (

          <div className="p-8 text-center text-gray-500">
            {search
              ? "No matching Payment records found."
              : "No Payment records found."}
          </div>

        ) : (

          <div className="overflow-x-auto px-4">

            <Table>

              {/* =========================
                  Table Header
              ========================= */}

              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">

                <TableRow>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Receipt Number
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Invoice Number
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Amount
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Payment Mode
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Gateway Ref
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Payment Date
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Remarks
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Edit
                  </TableCell>

                </TableRow>

              </TableHeader>

              {/* =========================
                  Table Body
              ========================= */}

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

                {filteredPayments.map(
                  (payment) => (

                    <TableRow
                      key={payment.id}
                    >

                      {/* Receipt Number */}

                      <TableCell className="px-5 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {payment.receiptNumber}
                      </TableCell>

                      {/* Invoice Number */}

                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {payment.invoiceNumber}
                      </TableCell>

                      {/* Amount */}

                      <TableCell className="px-5 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        ₹{payment.amount}
                      </TableCell>

                      {/* Payment Mode */}

                      <TableCell className="px-5 py-4 text-sm">

                        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                          {payment.paymentMode}
                        </span>

                      </TableCell>

                      {/* Gateway Reference */}

                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {payment.gatewayRef}
                      </TableCell>

                      {/* Payment Date */}

                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(
                          payment.paymentDate
                        )}
                      </TableCell>

                      {/* Remarks */}

                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {payment.remarks}
                      </TableCell>

                      {/* Edit */}

                      <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/admin/edit-payment?id=${payment.id}`
                            )
                          }
                          title="Edit Payment"
                        >

                          <PencilIcon className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600" />

                        </button>

                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </div>

        )}

      </div>
    </div>
  );
}