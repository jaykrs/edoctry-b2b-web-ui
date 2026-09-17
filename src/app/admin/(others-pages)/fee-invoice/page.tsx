"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

      /*
       * Invoice number:
       * INV - Course Name - Student Name - 001
       */
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

      /*
       * IMPORTANT:
       * Late Fee intentionally removed.
       */
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
      <div class="student-label">
        Student Name
      </div>
      <div class="student-value">
        ${escapeHtml(studentName)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Student ID
      </div>
      <div class="student-value">
        ${escapeHtml(studentId)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Course
      </div>
      <div class="student-value">
        ${escapeHtml(courseName)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Academic Year
      </div>
      <div class="student-value">
        ${escapeHtml(academicYear)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Fee Cycle
      </div>
      <div class="student-value">
        ${escapeHtml(cycleType)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Qualification
      </div>
      <div class="student-value">
        ${escapeHtml(qualification)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Phone
      </div>
      <div class="student-value">
        ${escapeHtml(studentPhone)}
      </div>
    </div>

    <div class="student-cell">
      <div class="student-label">
        Address
      </div>
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

      /*
       * Open invoice in a new browser window.
       * This avoids jsPDF html() blank-page problems.
       */
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
    <div className="min-h-screen bg-gray-50">

      {/* TOP DARK HEADER */}

      <div className="w-full bg-gray-900 px-6 py-4">

        <h1 className="text-xl font-semibold text-white">
          Fee Invoice
        </h1>

        <div className="mt-1 text-sm text-gray-300">
          Home <span className="mx-2">›</span> Fee Invoice
        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="px-4 py-6 sm:px-6 lg:px-8">

        {/* HERO HEADER */}

        <div className="mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-md">

          <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">

            <div>

              <div className="mb-2 text-3xl">
                🎓
              </div>

              <h2 className="text-2xl font-bold text-white">
                Fee Invoice
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                Manage student fee invoices
              </p>

            </div>


            <Link
              href="/admin/fee-invoice/create"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              + Create Invoice
            </Link>

          </div>

        </div>


        {/* RELATED LINKS */}

        <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm shadow-sm">

          <span className="font-semibold text-gray-700">
            Related:
          </span>

          <Link
            href="/admin/fee-structure-item"
            className="text-blue-600 hover:underline"
          >
            Fee Structure Item
          </Link>

          <Link
            href="/admin/fee-structure"
            className="text-blue-600 hover:underline"
          >
            Fee Structure
          </Link>

          <Link
            href="/admin/fee-head"
            className="text-blue-600 hover:underline"
          >
            Fee Head
          </Link>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}


        {/* TABLE */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {loading ? (

            <div className="flex min-h-[250px] items-center justify-center">

              <div className="text-sm text-gray-500">
                Loading fee invoices...
              </div>

            </div>

          ) : invoices.length === 0 ? (

            <div className="flex min-h-[250px] flex-col items-center justify-center px-5 text-center">

              <div className="mb-3 text-4xl">
                📄
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
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

            <div className="w-full overflow-x-auto">

              <table className="w-full min-w-[950px] table-fixed">

                <thead>

                  <tr className="border-b border-gray-200 bg-gray-50">

                    <th
                      className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "15%" }}
                    >
                      Invoice Number
                    </th>

                    <th
                      className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "12%" }}
                    >
                      Billing Period
                    </th>

                    <th
                      className="px-3 py-3 text-left text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "11%" }}
                    >
                      Due Date
                    </th>

                    <th
                      className="px-3 py-3 text-right text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "12%" }}
                    >
                      Sub Total
                    </th>

                    <th
                      className="px-3 py-3 text-right text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "12%" }}
                    >
                      Discount
                    </th>

                    <th
                      className="px-3 py-3 text-right text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "13%" }}
                    >
                      Net Amount
                    </th>

                    <th
                      className="px-3 py-3 text-right text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "10%" }}
                    >
                      Paid
                    </th>

                    <th
                      className="px-3 py-3 text-center text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "8%" }}
                    >
                      Status
                    </th>

                    <th
                      className="px-3 py-3 text-center text-xs font-semibold uppercase text-gray-600"
                      style={{ width: "7%" }}
                    >
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {invoices.map((invoice) => {

                    const item =
                      invoice.attributes || {};

                    return (

                      <tr
                        key={invoice.id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >

                        <td className="px-3 py-4 text-sm font-medium text-gray-800">
                          {item.invoiceNumber || "-"}
                        </td>


                        <td className="px-3 py-4 text-sm text-gray-600">
                          {item.billingPeriod || "-"}
                        </td>


                        <td className="px-3 py-4 text-sm text-gray-600">

                          {item.dueDate
                            ? new Date(
                                item.dueDate
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}

                        </td>


                        <td className="px-3 py-4 text-right text-sm text-gray-700">
                          {formatAmount(
                            item.subTotal
                          )}
                        </td>


                        <td className="px-3 py-4 text-right text-sm text-gray-700">
                          {formatAmount(
                            item.discountTotal
                          )}
                        </td>


                        <td className="px-3 py-4 text-right text-sm font-semibold text-gray-800">
                          {formatAmount(
                            item.netAmount
                          )}
                        </td>


                        <td className="px-3 py-4 text-right text-sm text-gray-700">
                          {formatAmount(
                            item.amountPaid
                          )}
                        </td>


                        <td className="px-3 py-4 text-center">

                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status ||
                              "DRAFT"}
                          </span>

                        </td>


                        <td className="px-3 py-4">

                          <div className="flex items-center justify-center gap-2">

                            <Link
                              href={`/admin/fee-invoice/edit/${invoice.id}`}
                              title="Edit Invoice"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-sm transition hover:bg-gray-100"
                            >
                              ✏️
                            </Link>


                            <button
                              type="button"
                              onClick={() =>
                                downloadInvoicePDF(
                                  invoice
                                )
                              }
                              title="Download PDF"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white text-sm transition hover:bg-gray-100"
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

            </div>

          )}

        </div>

      </div>

    </div>
  );
}