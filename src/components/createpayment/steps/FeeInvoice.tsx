"use client";

import React, { useEffect, useMemo, useState } from "react";
import { apiUrl } from "@/utils/config";

type Props = {
  onNext?: (data?: any) => void;
  onBack?: () => void;
  data?: any;
  feeStructure?: any;
  feeHead?: any;
  studentConcession?: any;
  invoiceLineItem?: any;
};

export default function FeeInvoice({
  onNext,
  onBack,
  data,
  feeStructure,
  feeHead,
  studentConcession,
  invoiceLineItem,
}: Props) {
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [vendoruuid, setVendoruuid] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState(
    data?.invoiceNumber || `INV-${Date.now()}`
  );

  const [billingPeriod, setBillingPeriod] = useState(
    data?.billingPeriod || ""
  );

  const [dueDate, setDueDate] = useState(data?.dueDate || "");

  const [selectedStudent, setSelectedStudent] = useState(
    data?.student?.id ||
      data?.student?.data?.id ||
      data?.student ||
      ""
  );

  const [subTotal, setSubTotal] = useState(
    Number(data?.subTotal || 0)
  );

  const [discountTotal, setDiscountTotal] = useState(
    Number(data?.discountTotal || 0)
  );

  const [lateFee, setLateFee] = useState(
    Number(data?.lateFee || 0)
  );

  const [amountPaid, setAmountPaid] = useState(
    Number(data?.amountPaid || 0)
  );

  const [feeStructureDetails, setFeeStructureDetails] = useState<any>(null);

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("jwt") || "";
  };

  const getVendorUuid = () => {
    if (typeof window === "undefined") return "";

    try {
      const staffData = localStorage.getItem("staffData");

      if (!staffData) return "";

      const parsed = JSON.parse(staffData);

      return (
        parsed?.vendoruuid ||
        parsed?.vendorUuid ||
        parsed?.vendorUUID ||
        parsed?.data?.vendoruuid ||
        parsed?.data?.vendorUuid ||
        parsed?.user?.vendoruuid ||
        ""
      );
    } catch {
      return "";
    }
  };

  const getRelationId = (value: any): number | null => {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }

    if (typeof value === "object") {
      if (value.id !== undefined) {
        return getRelationId(value.id);
      }

      if (value.data?.id !== undefined) {
        return getRelationId(value.data.id);
      }

      if (value.fee_structure?.id !== undefined) {
        return getRelationId(value.fee_structure.id);
      }

      if (value.fee_structure?.data?.id !== undefined) {
        return getRelationId(value.fee_structure.data.id);
      }
    }

    return null;
  };

  const feeStructureId = useMemo(() => {
    return getRelationId(
      feeStructure?.id ||
        feeStructure?.data?.id ||
        feeStructure?.selectedFeeStructureId ||
        feeStructure?.selectedFeeStructure
    );
  }, [feeStructure]);

  const feeHeadId = useMemo(() => {
    return getRelationId(
      feeHead?.id ||
        feeHead?.data?.id ||
        feeHead?.fee_head?.id ||
        feeHead?.fee_structure
    );
  }, [feeHead]);

  const concessionDiscount = useMemo(() => {
    if (!studentConcession) return 0;

    const value = Number(
      studentConcession?.discountValue ||
        studentConcession?.attributes?.discountValue ||
        0
    );

    if (!value || value <= 0) return 0;

    const type =
      studentConcession?.discountType ||
      studentConcession?.attributes?.discountType ||
      "";

    if (type === "PERCENTAGE") {
      return Math.min((subTotal * value) / 100, subTotal);
    }

    if (type === "FLAT_AMOUNT") {
      return Math.min(value, subTotal);
    }

    return 0;
  }, [studentConcession, subTotal]);

  useEffect(() => {
    const uuid = getVendorUuid();

    if (uuid) {
      setVendoruuid(uuid);
    }
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoadingStudents(true);
        setError("");

        const token = getToken();

        if (!vendoruuid) return;

        const url =
          `${apiUrl}/api/students` +
          `?filters[vendoruuid][$eq]=${encodeURIComponent(vendoruuid)}` +
          `&sort=createdAt:desc`;

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        setStudents(result?.data || []);
      } catch (err: any) {
        console.error("Students fetch error:", err);
        setError(err?.message || "Failed to load students");
      } finally {
        setLoadingStudents(false);
      }
    };

    if (vendoruuid) {
      fetchStudents();
    }
  }, [vendoruuid]);

  useEffect(() => {
    const fetchFeeStructureItems = async () => {
      try {
        if (!feeStructureId || !vendoruuid) return;

        setLoadingItems(true);

        const token = getToken();

        const url =
          `${apiUrl}/api/fee-structures/${feeStructureId}` +
          `?populate=items`;

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = await response.json();

        const structure = result?.data;

        setFeeStructureDetails(structure);

        const attributes = structure?.attributes || structure || {};

        const items =
          attributes?.items?.data ||
          attributes?.items ||
          [];

        if (Array.isArray(items) && items.length > 0) {
          const total = items.reduce(
            (sum: number, item: any) => {
              const itemAttributes = item?.attributes || item || {};

              return (
                sum +
                Number(itemAttributes?.amount || 0)
              );
            },
            0
          );

          if (total > 0 && !data?.subTotal) {
            setSubTotal(total);
          }
        }
      } catch (err: any) {
        console.error("Fee structure items fetch error:", err);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchFeeStructureItems();
  }, [feeStructureId, vendoruuid, data?.subTotal]);

  useEffect(() => {
    if (
      studentConcession &&
      !data?.discountTotal &&
      subTotal > 0
    ) {
      setDiscountTotal(concessionDiscount);
    }
  }, [
    studentConcession,
    concessionDiscount,
    subTotal,
    data?.discountTotal,
  ]);

  const netAmount = useMemo(() => {
    return Math.max(
      subTotal - discountTotal + lateFee,
      0
    );
  }, [subTotal, discountTotal, lateFee]);

  const balanceDue = useMemo(() => {
    return Math.max(
      netAmount - amountPaid,
      0
    );
  }, [netAmount, amountPaid]);

  const status = useMemo(() => {
    if (amountPaid <= 0) {
      return "UNPAID";
    }

    if (amountPaid >= netAmount && netAmount > 0) {
      return "PAID";
    }

    return "PARTIALLY_PAID";
  }, [amountPaid, netAmount]);

  const getStudentName = (student: any) => {
    const attributes = student?.attributes || student;

    return (
      attributes?.name ||
      attributes?.fullName ||
      attributes?.studentName ||
      `${attributes?.firstName || ""} ${
        attributes?.lastName || ""
      }`.trim() ||
      attributes?.email ||
      `Student #${student?.id}`
    );
  };

  const getStructureName = () => {
    const raw =
      feeStructureDetails ||
      feeStructure?.data ||
      feeStructure;

    const attributes = raw?.attributes || raw || {};

    return (
      attributes?.name ||
      "Selected Fee Structure"
    );
  };

  const getFeeHeadName = () => {
    const raw =
      feeHead?.data ||
      feeHead;

    const attributes = raw?.attributes || raw || {};

    return attributes?.name || "Selected Fee Head";
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      if (!vendoruuid) {
        setError("Vendor UUID not found.");
        return;
      }

      if (!selectedStudent) {
        setError("Please select a student.");
        return;
      }

      if (!feeStructureId) {
        setError("Fee Structure is missing.");
        return;
      }

      if (!feeHeadId) {
        setError("Fee Head is missing.");
        return;
      }

      if (!invoiceNumber.trim()) {
        setError("Invoice number is required.");
        return;
      }

      if (!billingPeriod.trim()) {
        setError("Billing period is required.");
        return;
      }

      if (!dueDate) {
        setError("Due date is required.");
        return;
      }

      if (subTotal <= 0) {
        setError("Subtotal must be greater than 0.");
        return;
      }

      if (discountTotal < 0) {
        setError("Discount cannot be negative.");
        return;
      }

      if (lateFee < 0) {
        setError("Late fee cannot be negative.");
        return;
      }

      if (amountPaid < 0) {
        setError("Amount paid cannot be negative.");
        return;
      }

      if (amountPaid > netAmount) {
        setError("Amount paid cannot be greater than net amount.");
        return;
      }

      setSaving(true);

      const token = getToken();

      const payload = {
        vendoruuid: vendoruuid.trim(),
        invoiceNumber: invoiceNumber.trim(),
        billingPeriod: billingPeriod.trim(),
        dueDate,
        subTotal: Number(subTotal),
        discountTotal: Number(discountTotal),
        lateFee: Number(lateFee),
        netAmount: Number(netAmount),
        amountPaid: Number(amountPaid),
        status,
        student: Number(selectedStudent),
        fee_structure: Number(feeStructureId),
        fee_head: Number(feeHeadId),
      };

      const existingId = getRelationId(
        data?.id ||
          data?.data?.id
      );

      const url = existingId
        ? `${apiUrl}/api/fee-invoices/${existingId}`
        : `${apiUrl}/api/fee-invoices`;

      const method = existingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
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

      const result = await response.json();

      if (!response.ok) {
        console.error("Fee Invoice API Error:", result);

        throw new Error(
          result?.error?.message ||
            `HTTP Error: ${response.status}`
        );
      }

      const savedInvoice =
        result?.data || result;

      /*
       * Invoice Line Item is optional.
       * If it already exists in the workflow,
       * create it after invoice creation because
       * fee_invoice relation needs invoice ID.
       */
      const savedInvoiceId = getRelationId(
        savedInvoice?.id
      );

      if (
        savedInvoiceId &&
        invoiceLineItem &&
        Number(
          invoiceLineItem?.amount ||
            invoiceLineItem?.attributes?.amount ||
            0
        ) > 0
      ) {
        try {
          const lineItemAmount = Number(
            invoiceLineItem?.amount ||
              invoiceLineItem?.attributes?.amount ||
              0
          );

          const lineItemFeeHeadName =
            invoiceLineItem?.feeHeadName ||
            invoiceLineItem?.attributes?.feeHeadName ||
            getFeeHeadName();

          const lineItemPayload = {
            feeHeadName: lineItemFeeHeadName,
            amount: lineItemAmount,
            fee_invoice: savedInvoiceId,
          };

          await fetch(
            `${apiUrl}/api/invoice-line-items`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token
                  ? {
                      Authorization: `Bearer ${token}`,
                    }
                  : {}),
              },
              body: JSON.stringify({
                data: lineItemPayload,
              }),
            }
          );
        } catch (lineItemError) {
          console.error(
            "Invoice line item creation error:",
            lineItemError
          );
        }
      }

      const nextData = {
        ...savedInvoice,
        id: savedInvoiceId,
        invoiceNumber:
          savedInvoice?.invoiceNumber ||
          payload.invoiceNumber,
        billingPeriod: payload.billingPeriod,
        dueDate: payload.dueDate,
        subTotal: payload.subTotal,
        discountTotal: payload.discountTotal,
        lateFee: payload.lateFee,
        netAmount: payload.netAmount,
        amountPaid: payload.amountPaid,
        balanceDue,
        status: payload.status,
        student: payload.student,
        fee_structure: payload.fee_structure,
        fee_head: payload.fee_head,
      };

      setSuccess(
        existingId
          ? "Fee Invoice updated successfully."
          : "Fee Invoice created successfully."
      );

      if (typeof onNext === "function") {
        onNext(nextData);
      }
    } catch (err: any) {
      console.error("Fee Invoice save error:", err);

      setError(
        err?.message ||
          "Failed to save Fee Invoice."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Fee Invoice
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Create student fee invoice from the selected
          Fee Structure and Fee Head.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Fee Structure
          </label>

          <input
            type="text"
            value={getStructureName()}
            readOnly
            className="w-full rounded-lg border bg-gray-100 px-3 py-2.5 text-sm text-gray-700 outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Fee Head
          </label>

          <input
            type="text"
            value={getFeeHeadName()}
            readOnly
            className="w-full rounded-lg border bg-gray-100 px-3 py-2.5 text-sm text-gray-700 outline-none"
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Student <span className="text-red-500">*</span>
          </label>

          <select
            value={selectedStudent}
            onChange={(e) =>
              setSelectedStudent(e.target.value)
            }
            disabled={loadingStudents}
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">
              {loadingStudents
                ? "Loading students..."
                : "Select Student"}
            </option>

            {students.map((student) => (
              <option
                key={student?.id}
                value={student?.id}
              >
                {getStudentName(student)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Invoice Number{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) =>
              setInvoiceNumber(e.target.value)
            }
            placeholder="Invoice number"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Billing Period{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={billingPeriod}
            onChange={(e) =>
              setBillingPeriod(e.target.value)
            }
            placeholder="e.g. September 2026"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Due Date <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {studentConcession && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-blue-800">
            Student Concession
          </h3>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div>
              <span className="text-xs text-gray-500">
                Concession
              </span>

              <p className="text-sm font-medium text-gray-800">
                {studentConcession?.name ||
                  studentConcession?.attributes?.name ||
                  "Student Concession"}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500">
                Discount
              </span>

              <p className="text-sm font-medium text-gray-800">
                {studentConcession?.discountType ||
                  studentConcession?.attributes?.discountType ||
                  "-"}{" "}
                {studentConcession?.discountValue ||
                  studentConcession?.attributes?.discountValue ||
                  0}
              </p>
            </div>

            <div>
              <span className="text-xs text-gray-500">
                Calculated Discount
              </span>

              <p className="text-sm font-semibold text-blue-700">
                ₹ {concessionDiscount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 rounded-xl border bg-gray-50 p-5">
        <h3 className="mb-4 text-base font-semibold text-gray-800">
          Invoice Amount
        </h3>

        {loadingItems && (
          <p className="mb-3 text-xs text-gray-500">
            Calculating amount from Fee Structure Items...
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sub Total <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              min="0"
              value={subTotal}
              onChange={(e) =>
                setSubTotal(Number(e.target.value) || 0)
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Discount
            </label>

            <input
              type="number"
              min="0"
              value={discountTotal}
              onChange={(e) =>
                setDiscountTotal(
                  Number(e.target.value) || 0
                )
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Late Fee
            </label>

            <input
              type="number"
              min="0"
              value={lateFee}
              onChange={(e) =>
                setLateFee(
                  Number(e.target.value) || 0
                )
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Amount Paid
            </label>

            <input
              type="number"
              min="0"
              value={amountPaid}
              onChange={(e) =>
                setAmountPaid(
                  Number(e.target.value) || 0
                )
              }
              className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs text-gray-500">
              Net Amount
            </p>

            <p className="mt-1 text-xl font-bold text-gray-800">
              ₹ {netAmount.toFixed(2)}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs text-gray-500">
              Balance Due
            </p>

            <p className="mt-1 text-xl font-bold text-orange-600">
              ₹ {balanceDue.toFixed(2)}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs text-gray-500">
              Status
            </p>

            <p className="mt-1 text-xl font-bold text-blue-600">
              {status}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-5">
        <button
          type="button"
          onClick={() => {
            if (typeof onBack === "function") {
              onBack();
            }
          }}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save & Next"}
        </button>
      </div>
    </div>
  );
}