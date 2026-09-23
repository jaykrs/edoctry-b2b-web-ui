"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/config";

interface FeeStructure {
  id: number;
  attributes?: {
    name?: string;
    academicYear?: string;
    cycleType?: string;
    programId?: string;
  };
}

interface Student {
  id: number;
  attributes?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    qualification?: string;
    studentid?: string;
    dob?: string;
    idtype?: string;
    idnumber?: string;
    courses?: string;
  };
}

interface FeeHead {
  id: number;
  attributes?: {
    name?: string;
    description?: string;
    isRefundable?: boolean;
    isTaxable?: boolean;
  };
}

interface InvoiceLineItem {
  id: number;
  attributes?: {
    feeHeadName?: string;
    amount?: number;
  };
}

interface FeePayment {
  id: number;
  attributes?: {
    receiptNumber?: string;
    amount?: number;
    paymentMode?: string;
    gatewayRef?: string;
    paymentDate?: string;
    remarks?: string;
  };
}

interface FeeInvoiceAttributes {
  invoiceNumber?: string;
  billingPeriod?: string;
  dueDate?: string;
  subTotal?: number;
  discountTotal?: number;
  lateFee?: number;
  netAmount?: number;
  amountPaid?: number;
  status?: string;
  vendoruuid?: string;
  createdAt?: string;

  student?: {
    data?: Student;
  };

  fee_structure?: {
    data?: FeeStructure;
  };

  fee_head?: {
    data?: FeeHead;
  };

  invoice_line_items?: {
    data?: InvoiceLineItem[];
  };

  fee_payments?: {
    data?: FeePayment[];
  };
}

interface FeeInvoice {
  id: number;
  attributes?: FeeInvoiceAttributes;
}

export default function FeeInvoicePage() {
  const [invoices, setInvoices] = useState<FeeInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${apiUrl}/api/fee-invoices?populate=*`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch fee invoices");
      }

      const result = await response.json();

      setInvoices(result?.data || []);
    } catch (err) {
      console.error("Fee Invoice fetch error:", err);
      setError("Unable to load fee invoices.");
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount?: number) => {
    if (amount === undefined || amount === null) {
      return "₹ 0.00";
    }

    return `₹ ${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusClass = (status?: string) => {
    const normalizedStatus = status?.toUpperCase();

    if (normalizedStatus === "PAID") {
      return "bg-green-100 text-green-700";
    }

    if (normalizedStatus === "PARTIAL") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (normalizedStatus === "OVERDUE") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  const escapeHtml = (value: unknown) => {
    return String(value ?? "-")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const formatDate = (date?: string) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPDFAmount = (amount?: number) => {
    return `₹ ${Number(amount ?? 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getSequenceNumber = (invoice: FeeInvoice) => {
    return String(invoice.id).padStart(3, "0");
  };

  const downloadInvoicePDF = (invoice: FeeInvoice) => {
    try {
      const attributes = invoice.attributes || {};

      const student = attributes.student?.data?.attributes || {};
      const feeStructure =
        attributes.fee_structure?.data?.attributes || {};
      const feeHead = attributes.fee_head?.data?.attributes || {};

      const lineItems =
        attributes.invoice_line_items?.data || [];

      const payments =
        attributes.fee_payments?.data || [];

      const studentName = student.name || "-";
      const studentEmail = student.email || "-";
      const studentPhone = student.phone || "-";
      const studentAddress = student.address || "-";
      const studentId = student.studentid || "-";
      const qualification = student.qualification || "-";

      const courseName =
        feeStructure.name ||
        student.courses ||
        feeStructure.programId ||
        "-";

      const academicYear =
        feeStructure.academicYear || "-";

      const cycleType =
        feeStructure.cycleType || "-";

      const feeHeadName =
        feeHead.name || "-";

      const invoiceNumber =
        `INV - ${courseName} - ${studentName} - ${getSequenceNumber(
          invoice
        )}`;

      const invoiceDate = formatDate(
        attributes.createdAt
      );

      const billingPeriod =
        attributes.billingPeriod || "-";

      const dueDate = formatDate(
        attributes.dueDate
      );

      const subTotal =
        Number(attributes.subTotal ?? 0);

      const discountTotal =
        Number(attributes.discountTotal ?? 0);

      const netAmount =
        Number(attributes.netAmount ?? 0);

      const amountPaid =
        Number(attributes.amountPaid ?? 0);

      const balanceAmount = Math.max(
        netAmount - amountPaid,
        0
      );

      const status =
        attributes.status?.toUpperCase() || "DRAFT";

      const latestPayment =
        payments.length > 0
          ? payments[payments.length - 1]?.attributes
          : undefined;

      const paymentMode =
        latestPayment?.paymentMode || "-";

      const paymentDate =
        formatDate(latestPayment?.paymentDate);

      const receiptNumber =
        latestPayment?.receiptNumber || "-";

      const transactionId =
        latestPayment?.gatewayRef || "-";

      let feeRows = "";

      if (lineItems.length > 0) {
        feeRows = lineItems
          .map((item, index) => {
            const itemAttributes =
              item.attributes || {};

            const itemName =
              itemAttributes.feeHeadName ||
              feeHeadName ||
              `Fee Item ${index + 1}`;

            const itemAmount =
              Number(itemAttributes.amount ?? 0);

            return `
              <tr>
                <td>${index + 1}</td>
                <td>
                  <strong>${escapeHtml(itemName)}</strong>
                  <div class="item-sub">
                    ${escapeHtml(feeHeadName)}
                  </div>
                </td>
                <td class="text-right">
                  ${formatPDFAmount(itemAmount)}
                </td>
              </tr>
            `;
          })
          .join("");
      } else {
        feeRows = `
          <tr>
            <td>1</td>
            <td>
              <strong>${escapeHtml(feeHeadName)}</strong>
            </td>
            <td class="text-right">
              ${formatPDFAmount(subTotal)}
            </td>
          </tr>
        `;
      }

      const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />

<style>

@page {
  size: A4;
  margin: 0;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  background: #ffffff;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
}

body {
  width: 794px;
  margin: 0 auto;
}

.invoice-wrapper {
  width: 794px;
  min-height: 1123px;
  background: #ffffff;
  padding: 42px 48px 45px 48px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 24px;
  border-bottom: 2px solid #111827;
}

.university-name {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 7px;
}

.university-subtitle {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.6;
}

.invoice-title-box {
  text-align: right;
}

.invoice-title {
  font-size: 30px;
  font-weight: 800;
  color: #111827;
  letter-spacing: 1px;
}

.invoice-number {
  margin-top: 5px;
  font-size: 11px;
  color: #6b7280;
}

.invoice-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 28px;
  margin-bottom: 28px;
}

.meta-box {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px 16px;
}

.meta-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-weight: 700;
  color: #6b7280;
  margin-bottom: 8px;
}

.meta-main {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.meta-line {
  font-size: 11px;
  color: #4b5563;
  line-height: 1.6;
}

.section-title {
  font-size: 13px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.student-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 25px;
}

.student-cell {
  padding: 11px 13px;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.student-cell:nth-child(2n) {
  border-right: none;
}

.student-cell:nth-last-child(-n + 2) {
  border-bottom: none;
}

.student-label {
  font-size: 9px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.student-value {
  font-size: 11px;
  font-weight: 600;
  color: #111827;
}

.fee-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.fee-table th {
  background: #111827;
  color: #ffffff;
  padding: 10px 9px;
  font-size: 10px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.fee-table td {
  padding: 11px 9px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 11px;
  vertical-align: top;
}

.fee-table .text-right {
  text-align: right;
}

.item-sub {
  color: #6b7280;
  font-size: 9px;
  margin-top: 3px;
}

.summary-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.summary {
  width: 285px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 11px;
}

.summary-row.discount {
  color: #15803d;
}

.summary-row.total {
  padding-top: 11px;
  margin-top: 4px;
  border-top: 2px solid #111827;
  border-bottom: none;
  font-size: 15px;
  font-weight: 800;
  color: #111827;
}

.payment-status {
  margin-top: 26px;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.payment-status-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #6b7280;
  font-weight: 700;
  margin-bottom: 6px;
}

.payment-status-value {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  margin-top: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.payment-cell {
  padding: 11px 13px;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.payment-cell:nth-child(2n) {
  border-right: none;
}

.payment-label {
  font-size: 9px;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.payment-value {
  font-size: 11px;
  font-weight: 600;
  color: #111827;
}

.note {
  margin-top: 25px;
  padding: 12px 14px;
  background: #f9fafb;
  border-left: 3px solid #111827;
  font-size: 10px;
  color: #6b7280;
  line-height: 1.5;
}

.footer {
  margin-top: 32px;
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.footer-left {
  font-size: 9px;
  color: #6b7280;
  line-height: 1.6;
}

.signature {
  width: 130px;
  text-align: center;
  font-size: 9px;
  color: #6b7280;
}

.signature-line {
  border-top: 1px solid #111827;
  margin-bottom: 5px;
}

</style>
</head>

<body>

<div class="invoice-wrapper">

  <div class="header">

    <div>
      <div class="university-name">
        ${escapeHtml("ABC UNIVERSITY")}
      </div>

      <div class="university-subtitle">
        Student Fee Management System<br/>
        Academic Fee Invoice
      </div>
    </div>

    <div class="invoice-title-box">

      <div class="invoice-title">
        INVOICE
      </div>

      <div class="invoice-number">
        ${escapeHtml(invoiceNumber)}
      </div>

    </div>

  </div>

  <div class="invoice-meta">

    <div class="meta-box">

      <div class="meta-title">
        Billed To
      </div>

      <div class="meta-main">
        ${escapeHtml(studentName)}
      </div>

      <div class="meta-line">
        ${escapeHtml(studentEmail)}
      </div>

      <div class="meta-line">
        ${escapeHtml(studentPhone)}
      </div>

    </div>

    <div class="meta-box">

      <div class="meta-title">
        Invoice Details
      </div>

      <div class="meta-line">
        Invoice Date:
        <strong>${escapeHtml(invoiceDate)}</strong>
      </div>

      <div class="meta-line">
        Billing Period:
        <strong>${escapeHtml(billingPeriod)}</strong>
      </div>

      <div class="meta-line">
        Due Date:
        <strong>${escapeHtml(dueDate)}</strong>
      </div>

    </div>

  </div>

  <div class="section-title">
    Student Information
  </div>

  <div class="student-grid">

    <div class="student-cell">
      <div class="student-label">Student Name</div>
      <div class="student-value">
        ${escapeHtml(studentName)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Student ID</div>
      <div class="student-value">
        ${escapeHtml(studentId)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Course</div>
      <div class="student-value">
        ${escapeHtml(courseName)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Academic Year</div>
      <div class="student-value">
        ${escapeHtml(academicYear)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Fee Cycle</div>
      <div class="student-value">
        ${escapeHtml(cycleType)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Qualification</div>
      <div class="student-value">
        ${escapeHtml(qualification)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Phone</div>
      <div class="student-value">
        ${escapeHtml(studentPhone)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">Address</div>
      <div class="student-value">
        ${escapeHtml(studentAddress)}
      </div>
    </div>

  </div>

  <div class="section-title">
    Fee Details
  </div>

  <table class="fee-table">

    <thead>

      <tr>

        <th style="width: 8%;">
          #
        </th>

        <th style="width: 62%;">
          Description
        </th>

        <th style="width: 30%; text-align: right;">
          Amount
        </th>

      </tr>

    </thead>

    <tbody>
      ${feeRows}
    </tbody>

  </table>

  <div class="summary-wrapper">

    <div class="summary">

      <div class="summary-row">

        <span>
          Sub Total
        </span>

        <span>
          ${formatPDFAmount(subTotal)}
        </span>

      </div>

      <div class="summary-row discount">

        <span>
          Discount
        </span>

        <span>
          - ${formatPDFAmount(discountTotal)}
        </span>

      </div>

      <div class="summary-row total">

        <span>
          Net Amount
        </span>

        <span>
          ${formatPDFAmount(netAmount)}
        </span>

      </div>

    </div>

  </div>

  <div class="payment-status">

    <div class="payment-status-title">
      Payment Status
    </div>

    <div class="payment-status-value">
      ${escapeHtml(status)}
    </div>

  </div>

  <div class="section-title" style="margin-top: 22px;">
    Payment Details
  </div>

  <div class="payment-grid">

    <div class="payment-cell">

      <div class="payment-label">
        Amount Paid
      </div>

      <div class="payment-value">
        ${formatPDFAmount(amountPaid)}
      </div>

    </div>

    <div class="payment-cell">

      <div class="payment-label">
        Balance Amount
      </div>

      <div class="payment-value">
        ${formatPDFAmount(balanceAmount)}
      </div>

    </div>

    <div class="payment-cell">

      <div class="payment-label">
        Payment Mode
      </div>

      <div class="payment-value">
        ${escapeHtml(paymentMode)}
      </div>

    </div>

    <div class="payment-cell">

      <div class="payment-label">
        Payment Date
      </div>

      <div class="payment-value">
        ${escapeHtml(paymentDate)}
      </div>

    </div>

    <div class="payment-cell">

      <div class="payment-label">
        Receipt Number
      </div>

      <div class="payment-value">
        ${escapeHtml(receiptNumber)}
      </div>

    </div>

    <div class="payment-cell">

      <div class="payment-label">
        Transaction ID
      </div>

      <div class="payment-value">
        ${escapeHtml(transactionId)}
      </div>

    </div>

  </div>

  <div class="note">
    This is a computer generated fee invoice.
    No physical signature is required.
    Please retain this invoice for your records.
  </div>

  <div class="footer">

    <div class="footer-left">
      Fee Invoice<br/>
      ${escapeHtml(courseName)}<br/>
      Academic Year: ${escapeHtml(academicYear)}
    </div>

    <div class="signature">

      <div class="signature-line"></div>

      Authorized Signatory

    </div>

  </div>

</div>

</body>
</html>
`;

      const printWindow = window.open(
        "",
        "_blank",
        "width=900,height=1200"
      );

      if (!printWindow) {
        alert(
          "Please allow pop-ups in your browser to generate the PDF."
        );
        return;
      }

      printWindow.document.open();
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 500);
      };
    } catch (error) {
      console.error(
        "Fee Invoice PDF generation error:",
        error
      );

      alert(
        "Unable to generate invoice PDF. Please check the browser console."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageBreadcrumb pageTitle="Fee Invoice" />

      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Fee Invoice"
          icon="🎓"
          buttonprops={{
            buttonText: "+",
            title: "Create Fee Invoice",
            content: "Create and manage student fee invoices.",
            onClick: () => router.push("/admin/fee-invoice/create"),
          }}
        />
      </div>

      <div className="space-y-3 w-full mx-auto">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-gray-100 px-5 py-3 text-sm dark:border-white/[0.05]">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Related:
          </span>
          <Link href="/admin/fee-structure-item" className="text-blue-600 hover:underline">
            Fee Structure Item
          </Link>
          <Link href="/admin/fee-structure" className="text-blue-600 hover:underline">
            Fee Structure
          </Link>
          <Link href="/admin/fee-head" className="text-blue-600 hover:underline">
            Fee Head
          </Link>
        </div>

        {error && (
          <div className="mx-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          Array(4)
            .fill(undefined)
            .map((_, index) => (
              <div key={index} className="mx-auto w-full rounded-xl border p-4">
                <div className="flex animate-pulse space-x-4">
                  <div className="size-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gray-200"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="w-full overflow-hidden">
              <div className="w-full">
                {invoices.length === 0 ? (
                  <div className="flex min-h-[250px] flex-col items-center justify-center px-5 text-center">
                    <div className="mb-3 text-4xl">📄</div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      No Fee Invoices Found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create your first fee invoice to see it here.
                    </p>
                    <Link
                      href="/admin/fee-invoice/create"
                      className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      + Create Invoice
                    </Link>
                  </div>
                ) : (
                  <table className="w-full table-fixed">
  <thead className="border-b border-gray-100 dark:border-white/[0.05]">
    <tr>
      <th className="w-[13%] px-4 py-3 text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Invoice Number
      </th>

      <th className="w-[17%] px-4 py-3 text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Student
      </th>

      <th className="w-[15%] px-4 py-3 text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Course
      </th>

      <th className="w-[11%] px-4 py-3 text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Billing Period
      </th>

      <th className="w-[9%] px-4 py-3 text-left text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Due Date
      </th>

      <th className="w-[10%] px-4 py-3 text-right text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Net Amount
      </th>

      <th className="w-[8%] px-4 py-3 text-right text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Paid
      </th>

      <th className="w-[8%] px-4 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Status
      </th>

      <th className="w-[7%] px-4 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400">
        Action
      </th>
    </tr>
  </thead>

  <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
    {invoices.map((invoice) => {
      const item = invoice.attributes || {};
      const student = item.student?.data?.attributes || {};
      const feeStructure =
        item.fee_structure?.data?.attributes || {};

      const studentName = student.name || "-";

      const courseName =
        feeStructure.name ||
        student.courses ||
        feeStructure.programId ||
        "-";

      return (
        <tr
          key={invoice.id}
          className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
        >
          {/* Invoice Number */}
          <td className="w-[15%] px-4 py-4 align-middle">
            <div
              className="truncate text-sm font-semibold text-gray-800 dark:text-white/90"
              title={
                item.invoiceNumber ||
                `INV-${String(invoice.id).padStart(3, "0")}`
              }
            >
              {item.invoiceNumber ||
                `INV-${String(invoice.id).padStart(3, "0")}`}
            </div>
          </td>

          {/* Student */}
          <td className="w-[19%] px-4 py-4 align-middle">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-9 w-9 shrink-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    studentName
                  )}&background=random&color=fff`}
                  alt={studentName}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="truncate text-sm font-semibold text-gray-800 dark:text-white/90"
                  title={studentName}
                >
                  {studentName}
                </div>

                <div
                  className="truncate text-xs text-gray-500"
                  title={student.studentid || "-"}
                >
                  {student.studentid || "-"}
                </div>
              </div>
            </div>
          </td>

          {/* Course */}
          <td className="w-[15%] px-4 py-4 align-middle">
            <div
              className="truncate text-sm text-gray-500 dark:text-gray-400"
              title={courseName}
            >
              {courseName}
            </div>
          </td>

          {/* Billing Period */}
          <td className="w-[12%] px-4 py-4 align-middle">
            <div
              className="truncate text-sm text-gray-500 dark:text-gray-400"
              title={item.billingPeriod || "-"}
            >
              {item.billingPeriod || "-"}
            </div>
          </td>

          {/* Due Date */}
          <td className="w-[10%] px-4 py-4 align-middle">
            <div className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {item.dueDate ? formatDate(item.dueDate) : "-"}
            </div>
          </td>

          {/* Net Amount */}
          <td className="w-[10%] px-4 py-4 text-right align-middle">
            <div className="whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
              {formatAmount(item.netAmount)}
            </div>
          </td>

          {/* Paid */}
          <td className="w-[8%] px-4 py-4 text-right align-middle">
            <div className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {formatAmount(item.amountPaid)}
            </div>
          </td>

          {/* Status */}
          <td className="w-[6%] px-4 py-4 text-center align-middle">
            <span
              className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
                item.status
              )}`}
            >
              {item.status || "DRAFT"}
            </span>
          </td>

          {/* Action */}
          <td className="w-[5%] px-4 py-4 text-center align-middle">
            <div className="flex items-center justify-center gap-1">
              <Link
                href={`/admin/fee-invoice/edit/${invoice.id}`}
                title="Edit Invoice"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                ✏️
              </Link>

              <button
                type="button"
                onClick={() => downloadInvoicePDF(invoice)}
                title="Download PDF"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                📄
              </button>
            </div>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
