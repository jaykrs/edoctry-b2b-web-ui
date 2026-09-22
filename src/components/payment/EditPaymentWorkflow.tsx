"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/config";

type Props = {
  paymentId: string;
};

type WorkflowData = {
  feeHead: any;
  feeStructure: any;
  feeStructureItem: any;
  invoice: any;
  feePayment: any;
};

export default function EditPaymentWorkflow({
  paymentId,
}: Props) {

  const router = useRouter();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // =====================================================
  // WORKFLOW DATA
  // =====================================================

  const [workflowData, setWorkflowData] =
    useState<WorkflowData>({
      feeHead: null,
      feeStructure: null,
      feeStructureItem: null,
      invoice: null,
      feePayment: null,
    });

  // =====================================================
  // FEE HEAD FORM
  // =====================================================

  const [feeHeadForm, setFeeHeadForm] = useState({
    name: "",
    description: "",
    isRefundable: false,
    isTaxable: false,
  });

  // =====================================================
  // FEE STRUCTURE FORM
  // =====================================================

  const [feeStructureForm, setFeeStructureForm] =
    useState({
      name: "",
      academicYear: "",
      cycleType: "",
      programId: "",
    });

  // =====================================================
  // FEE STRUCTURE ITEM FORM
  // =====================================================

  const [itemForm, setItemForm] = useState({
    amount: "",
    mandatory: true,
  });

  // =====================================================
  // INVOICE FORM
  // =====================================================

  const [invoiceForm, setInvoiceForm] = useState({
    vendoruuid: "",
    invoiceNumber: "",
    billingPeriod: "",
    dueDate: "",
    subTotal: "",
    discountTotal: "0",
    lateFee: "0",
    netAmount: "",
    amountPaid: "0",
    status: "UNPAID",
  });

  // =====================================================
  // PAYMENT FORM
  // =====================================================

  const [paymentForm, setPaymentForm] = useState({
    receiptNumber: "",
    amount: "",
    paymentMode: "",
    gatewayRef: "",
    paymentDate: "",
    remarks: "",
  });

  // =====================================================
  // FETCH COMPLETE WORKFLOW
  // =====================================================

  useEffect(() => {
    if (!paymentId) {
      setError("Payment ID not found.");
      setLoading(false);
      return;
    }

    const fetchWorkflow = async () => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const token = localStorage.getItem("jwt");

        const headers: HeadersInit = {
          Accept: "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        };

        // =================================================
        // STEP 5 - GET PAYMENT
        // =================================================

        const paymentResponse = await fetch(
          `${apiUrl}/api/fee-payments/${paymentId}?populate=*`,
          {
            method: "GET",
            headers,
            cache: "no-store",
          }
        );

        const paymentResult =
          await paymentResponse.json();

        if (!paymentResponse.ok) {
          throw new Error(
            paymentResult?.error?.message ||
              `Payment API Error: ${paymentResponse.status}`
          );
        }

        const payment =
          paymentResult?.data || null;

        if (!payment) {
          throw new Error(
            "Payment record not found."
          );
        }

        const paymentData =
          payment?.attributes || payment;

        console.log(
          "PAYMENT DATA:",
          payment
        );

        // =================================================
        // GET INVOICE RELATION
        // =================================================

        const invoiceRelation =
          paymentData?.fee_invoice?.data ||
          paymentData?.fee_invoice ||
          null;

        if (!invoiceRelation?.id) {
          throw new Error(
            "Fee Invoice is not linked with this payment."
          );
        }

        const invoiceId =
          invoiceRelation.id;

        // =================================================
        // STEP 4 - GET INVOICE
        // =================================================

        const invoiceResponse =
          await fetch(
            `${apiUrl}/api/fee-invoices/${invoiceId}?populate=*`,
            {
              method: "GET",
              headers,
              cache: "no-store",
            }
          );

        const invoiceResult =
          await invoiceResponse.json();

        if (!invoiceResponse.ok) {
          throw new Error(
            invoiceResult?.error?.message ||
              `Invoice API Error: ${invoiceResponse.status}`
          );
        }

        const invoice =
          invoiceResult?.data || null;

        if (!invoice) {
          throw new Error(
            "Fee Invoice not found."
          );
        }

        const invoiceData =
          invoice?.attributes || invoice;

        console.log(
          "INVOICE DATA:",
          invoice
        );

        // =================================================
        // GET FEE STRUCTURE
        // =================================================

        const structureRelation =
          invoiceData?.fee_structure?.data ||
          invoiceData?.fee_structure ||
          null;

        if (!structureRelation?.id) {
          throw new Error(
            "Fee Structure is not linked with this invoice."
          );
        }

        const feeStructureId =
          structureRelation.id;

        // =================================================
        // STEP 2 - GET FEE STRUCTURE
        // =================================================

        const structureResponse =
          await fetch(
            `${apiUrl}/api/fee-structures/${feeStructureId}?populate=*`,
            {
              method: "GET",
              headers,
              cache: "no-store",
            }
          );

        const structureResult =
          await structureResponse.json();

        if (!structureResponse.ok) {
          throw new Error(
            structureResult?.error?.message ||
              `Fee Structure API Error: ${structureResponse.status}`
          );
        }

        const feeStructure =
          structureResult?.data || null;

        if (!feeStructure) {
          throw new Error(
            "Fee Structure not found."
          );
        }

        const feeStructureData =
          feeStructure?.attributes ||
          feeStructure;

        console.log(
          "FEE STRUCTURE DATA:",
          feeStructure
        );

        // =================================================
        // GET ITEMS
        // =================================================

        const items =
          feeStructureData?.items?.data ||
          feeStructureData?.items ||
          [];

        if (!items.length) {
          throw new Error(
            "Fee Structure Item not found."
          );
        }

        const itemRelation =
          items[0];

        const itemId =
          itemRelation?.id;

        if (!itemId) {
          throw new Error(
            "Fee Structure Item ID not found."
          );
        }

        // =================================================
        // STEP 3 - GET FEE STRUCTURE ITEM
        // =================================================

        const itemResponse =
          await fetch(
            `${apiUrl}/api/fee-structure-items/${itemId}?populate=*`,
            {
              method: "GET",
              headers,
              cache: "no-store",
            }
          );

        const itemResult =
          await itemResponse.json();

        if (!itemResponse.ok) {
          throw new Error(
            itemResult?.error?.message ||
              `Fee Structure Item API Error: ${itemResponse.status}`
          );
        }

        const feeStructureItem =
          itemResult?.data || null;

        if (!feeStructureItem) {
          throw new Error(
            "Fee Structure Item not found."
          );
        }

        const itemData =
          feeStructureItem?.attributes ||
          feeStructureItem;

        console.log(
          "FEE STRUCTURE ITEM DATA:",
          feeStructureItem
        );

        // =================================================
        // GET FEE HEAD
        // =================================================

        const feeHeadRelation =
          itemData?.fee_head?.data ||
          itemData?.fee_head ||
          null;

        if (!feeHeadRelation?.id) {
          throw new Error(
            "Fee Head is not linked with Fee Structure Item."
          );
        }

        const feeHeadId =
          feeHeadRelation.id;

        // =================================================
        // STEP 1 - GET FEE HEAD
        // =================================================

        const feeHeadResponse =
          await fetch(
            `${apiUrl}/api/fee-heads/${feeHeadId}?populate=*`,
            {
              method: "GET",
              headers,
              cache: "no-store",
            }
          );

        const feeHeadResult =
          await feeHeadResponse.json();

        if (!feeHeadResponse.ok) {
          throw new Error(
            feeHeadResult?.error?.message ||
              `Fee Head API Error: ${feeHeadResponse.status}`
          );
        }

        const feeHead =
          feeHeadResult?.data || null;

        if (!feeHead) {
          throw new Error(
            "Fee Head not found."
          );
        }

        const feeHeadData =
          feeHead?.attributes ||
          feeHead;

        console.log(
          "FEE HEAD DATA:",
          feeHead
        );

        // =================================================
        // SAVE WORKFLOW DATA
        // =================================================

        setWorkflowData({
          feeHead,
          feeStructure,
          feeStructureItem,
          invoice,
          feePayment: payment,
        });

        // =================================================
        // SET FEE HEAD FORM
        // =================================================

        setFeeHeadForm({
          name:
            feeHeadData?.name || "",

          description:
            feeHeadData?.description || "",

          isRefundable:
            feeHeadData?.isRefundable ??
            false,

          isTaxable:
            feeHeadData?.isTaxable ??
            false,
        });

        // =================================================
        // SET FEE STRUCTURE FORM
        // =================================================

        setFeeStructureForm({
          name:
            feeStructureData?.name || "",

          academicYear:
            feeStructureData?.academicYear ||
            "",

          cycleType:
            feeStructureData?.cycleType || "",

          programId:
            feeStructureData?.programId ||
            "",
        });

        // =================================================
        // SET ITEM FORM
        // =================================================

        setItemForm({
          amount:
            itemData?.amount !== undefined &&
            itemData?.amount !== null
              ? String(itemData.amount)
              : "",

          mandatory:
            itemData?.mandatory ??
            true,
        });

        // =================================================
        // SET INVOICE FORM
        // =================================================

        setInvoiceForm({
          vendoruuid:
            invoiceData?.vendoruuid || "",

          invoiceNumber:
            invoiceData?.invoiceNumber || "",

          billingPeriod:
            invoiceData?.billingPeriod || "",

          dueDate:
            invoiceData?.dueDate || "",

          subTotal:
            invoiceData?.subTotal !== undefined &&
            invoiceData?.subTotal !== null
              ? String(invoiceData.subTotal)
              : "",

          discountTotal:
            invoiceData?.discountTotal !== undefined &&
            invoiceData?.discountTotal !== null
              ? String(invoiceData.discountTotal)
              : "0",

          lateFee:
            invoiceData?.lateFee !== undefined &&
            invoiceData?.lateFee !== null
              ? String(invoiceData.lateFee)
              : "0",

          netAmount:
            invoiceData?.netAmount !== undefined &&
            invoiceData?.netAmount !== null
              ? String(invoiceData.netAmount)
              : "",

          amountPaid:
            invoiceData?.amountPaid !== undefined &&
            invoiceData?.amountPaid !== null
              ? String(invoiceData.amountPaid)
              : "0",

          status:
            invoiceData?.status ||
            "UNPAID",
        });

        // =================================================
        // SET PAYMENT FORM
        // =================================================

        setPaymentForm({
          receiptNumber:
            paymentData?.receiptNumber ||
            "",

          amount:
            paymentData?.amount !== undefined &&
            paymentData?.amount !== null
              ? String(paymentData.amount)
              : "",

          paymentMode:
            paymentData?.paymentMode || "",

          gatewayRef:
            paymentData?.gatewayRef || "",

          paymentDate:
            paymentData?.paymentDate || "",

          remarks:
            paymentData?.remarks || "",
        });

        console.log(
          "===================================="
        );

        console.log(
          "PAYMENT WORKFLOW LOADED SUCCESSFULLY"
        );

        console.log({
          feeHead,
          feeStructure,
          feeStructureItem,
          invoice,
          payment,
        });

        console.log(
          "===================================="
        );
      } catch (err) {
        console.error(
          "Edit Payment Workflow Error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load payment workflow."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflow();
  }, [paymentId]);

  // =====================================================
  // CALCULATED NET AMOUNT
  // =====================================================

  const calculatedNetAmount =
    (Number(invoiceForm.subTotal) || 0) -
    (Number(invoiceForm.discountTotal) || 0) +
    (Number(invoiceForm.lateFee) || 0);

  // =====================================================
  // UPDATE WORKFLOW
  // =====================================================

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token =
        localStorage.getItem("jwt");

      const headers: HeadersInit = {
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
      };

      const feeHeadId =
        workflowData.feeHead?.id;

      const feeStructureId =
        workflowData.feeStructure?.id;

      const itemId =
        workflowData.feeStructureItem?.id;

      const invoiceId =
        workflowData.invoice?.id;

      const feePaymentId =
        workflowData.feePayment?.id;

      // =================================================
      // VALIDATE IDS
      // =================================================

      if (!feeHeadId) {
        throw new Error(
          "Fee Head ID not found."
        );
      }

      if (!feeStructureId) {
        throw new Error(
          "Fee Structure ID not found."
        );
      }

      if (!itemId) {
        throw new Error(
          "Fee Structure Item ID not found."
        );
      }

      if (!invoiceId) {
        throw new Error(
          "Invoice ID not found."
        );
      }

      if (!feePaymentId) {
        throw new Error(
          "Payment ID not found."
        );
      }

      // =================================================
      // 1. UPDATE FEE HEAD
      // =================================================

      const feeHeadResponse =
        await fetch(
          `${apiUrl}/api/fee-heads/${feeHeadId}`,
          {
            method: "PUT",
            headers,

            body: JSON.stringify({
              data: {
                name:
                  feeHeadForm.name.trim(),

                description:
                  feeHeadForm.description.trim(),

                isRefundable:
                  feeHeadForm.isRefundable,

                isTaxable:
                  feeHeadForm.isTaxable,
              },
            }),
          }
        );

      const feeHeadResult =
        await feeHeadResponse.json();

      if (!feeHeadResponse.ok) {
        throw new Error(
          feeHeadResult?.error?.message ||
            `Fee Head Update Error: ${feeHeadResponse.status}`
        );
      }

      // =================================================
      // 2. UPDATE FEE STRUCTURE
      // =================================================

      const structureResponse =
        await fetch(
          `${apiUrl}/api/fee-structures/${feeStructureId}`,
          {
            method: "PUT",
            headers,

            body: JSON.stringify({
              data: {
                name:
                  feeStructureForm.name.trim(),

                academicYear:
                  feeStructureForm.academicYear.trim(),

                cycleType:
                  feeStructureForm.cycleType,

                programId:
                  feeStructureForm.programId.trim(),
              },
            }),
          }
        );

      const structureResult =
        await structureResponse.json();

      if (!structureResponse.ok) {
        throw new Error(
          structureResult?.error?.message ||
            `Fee Structure Update Error: ${structureResponse.status}`
        );
      }

      // =================================================
      // 3. UPDATE FEE STRUCTURE ITEM
      // =================================================

      const itemResponse =
        await fetch(
          `${apiUrl}/api/fee-structure-items/${itemId}`,
          {
            method: "PUT",
            headers,

            body: JSON.stringify({
              data: {
                amount:
                  Number(itemForm.amount),

                mandatory:
                  itemForm.mandatory,

                fee_structure:
                  feeStructureId,

                fee_head:
                  feeHeadId,
              },
            }),
          }
        );

      const itemResult =
        await itemResponse.json();

      if (!itemResponse.ok) {
        throw new Error(
          itemResult?.error?.message ||
            `Fee Structure Item Update Error: ${itemResponse.status}`
        );
      }

      // =================================================
      // 4. UPDATE FEE INVOICE
      // =================================================

      const invoiceResponse =
        await fetch(
          `${apiUrl}/api/fee-invoices/${invoiceId}`,
          {
            method: "PUT",
            headers,

            body: JSON.stringify({
              data: {
                vendoruuid:
                  invoiceForm.vendoruuid.trim(),

                invoiceNumber:
                  invoiceForm.invoiceNumber.trim(),

                billingPeriod:
                  invoiceForm.billingPeriod.trim(),

                dueDate:
                  invoiceForm.dueDate,

                subTotal:
                  Number(
                    invoiceForm.subTotal
                  ) || 0,

                discountTotal:
                  Number(
                    invoiceForm.discountTotal
                  ) || 0,

                lateFee:
                  Number(
                    invoiceForm.lateFee
                  ) || 0,

                netAmount:
                  calculatedNetAmount,

                amountPaid:
                  Number(
                    invoiceForm.amountPaid
                  ) || 0,

                status:
                  invoiceForm.status,

                fee_structure:
                  feeStructureId,
              },
            }),
          }
        );

      const invoiceResult =
        await invoiceResponse.json();

      if (!invoiceResponse.ok) {
        throw new Error(
          invoiceResult?.error?.message ||
            `Invoice Update Error: ${invoiceResponse.status}`
        );
      }

      // =================================================
      // 5. UPDATE FEE PAYMENT
      // =================================================

      const paymentResponse =
        await fetch(
          `${apiUrl}/api/fee-payments/${feePaymentId}`,
          {
            method: "PUT",
            headers,

            body: JSON.stringify({
              data: {
                receiptNumber:
                  paymentForm.receiptNumber.trim(),

                amount:
                  Number(
                    paymentForm.amount
                  ),

                paymentMode:
                  paymentForm.paymentMode,

                gatewayRef:
                  paymentForm.gatewayRef.trim() ||
                  null,

                paymentDate:
                  paymentForm.paymentDate,

                remarks:
                  paymentForm.remarks.trim() ||
                  null,

                fee_invoice:
                  invoiceId,
              },
            }),
          }
        );

      const paymentResult =
        await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(
          paymentResult?.error?.message ||
            `Payment Update Error: ${paymentResponse.status}`
        );
      }

      // =================================================
      // SUCCESS
      // =================================================

      console.log(
        "FEE HEAD UPDATED:",
        feeHeadResult
      );

      console.log(
        "FEE STRUCTURE UPDATED:",
        structureResult
      );

      console.log(
        "FEE STRUCTURE ITEM UPDATED:",
        itemResult
      );

      console.log(
        "INVOICE UPDATED:",
        invoiceResult
      );

      console.log(
        "PAYMENT UPDATED:",
        paymentResult
      );

      setSuccess(
  "Payment workflow updated successfully! Redirecting..."
);

setTimeout(() => {
  router.push("/admin/payment");
}, 1000);
    } catch (err) {
      console.error(
        "Update Payment Workflow Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update payment workflow."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading payment workflow...
      </div>
    );
  }

  // =====================================================
  // MAIN ERROR
  // =====================================================

  if (
    error &&
    !workflowData.feePayment
  ) {
    return (
      <div className="mx-auto w-full max-w-4xl rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  // =====================================================
  // STEPS
  // =====================================================

  const steps = [
    {
      id: 1,
      label: "Fee Head",
      subtext: "Edit fee head",
    },
    {
      id: 2,
      label: "Fee Structure",
      subtext: "Edit fee structure",
    },
    {
      id: 3,
      label: "Fee Structure Item",
      subtext: "Edit fee item",
    },
    {
      id: 4,
      label: "Invoice",
      subtext: "Edit invoice",
    },
    {
      id: 5,
      label: "Fee Payment",
      subtext: "Edit payment",
    },
  ];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="w-full overflow-x-hidden">

      {/* =================================================
          STEPPER
      ================================================= */}

      <div className="mb-8 flex w-full items-start justify-between">

        {steps.map(
          (item, index) => {

            const isActive =
              step === item.id;

            const isCompleted =
              step > item.id;

            return (
              <React.Fragment
                key={item.id}
              >

                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setStep(item.id)
                  }
                  className="flex min-w-0 flex-1 flex-col items-center text-center disabled:cursor-not-allowed"
                >

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      isCompleted
                        ? "border-blue-600 bg-blue-600 text-white"
                        : isActive
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-300 bg-white text-gray-500"
                    }`}
                  >
                    {isCompleted
                      ? "✓"
                      : item.id}
                  </div>

                  <div
                    className={`mt-2 text-xs font-semibold sm:text-sm ${
                      isActive ||
                      isCompleted
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </div>

                  <div className="mt-1 hidden text-xs text-gray-400 md:block">
                    {item.subtext}
                  </div>

                </button>

                {index <
                  steps.length - 1 && (
                  <div
                    className={`mt-5 h-0.5 flex-1 ${
                      step > item.id
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}

              </React.Fragment>
            );
          }
        )}

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =================================================
          SUCCESS
      ================================================= */}

      {success && (
        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        {/* =================================================
            STEP 1 - FEE HEAD
        ================================================= */}

        {step === 1 && (
          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Fee Head
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Edit fee head details.
            </p>

            <div className="mt-6 space-y-5">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Fee Head Name
                </label>

                <input
                  type="text"
                  value={
                    feeHeadForm.name
                  }
                  onChange={(e) =>
                    setFeeHeadForm(
                      (prev) => ({
                        ...prev,
                        name:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={
                    feeHeadForm.description
                  }
                  onChange={(e) =>
                    setFeeHeadForm(
                      (prev) => ({
                        ...prev,
                        description:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />

              </div>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    feeHeadForm.isRefundable
                  }
                  onChange={(e) =>
                    setFeeHeadForm(
                      (prev) => ({
                        ...prev,
                        isRefundable:
                          e.target.checked,
                      })
                    )
                  }
                />

                <span className="text-sm text-gray-700">
                  Refundable
                </span>

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    feeHeadForm.isTaxable
                  }
                  onChange={(e) =>
                    setFeeHeadForm(
                      (prev) => ({
                        ...prev,
                        isTaxable:
                          e.target.checked,
                      })
                    )
                  }
                />

                <span className="text-sm text-gray-700">
                  Taxable
                </span>

              </label>

            </div>

          </div>
        )}

        {/* =================================================
            STEP 2 - FEE STRUCTURE
        ================================================= */}

        {step === 2 && (
          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Fee Structure
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Edit fee structure details.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Fee Structure Name
                </label>

                <input
                  type="text"
                  value={
                    feeStructureForm.name
                  }
                  onChange={(e) =>
                    setFeeStructureForm(
                      (prev) => ({
                        ...prev,
                        name:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Academic Year
                </label>

                <input
                  type="text"
                  value={
                    feeStructureForm.academicYear
                  }
                  onChange={(e) =>
                    setFeeStructureForm(
                      (prev) => ({
                        ...prev,
                        academicYear:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cycle Type
                </label>

                <select
                  value={
                    feeStructureForm.cycleType
                  }
                  onChange={(e) =>
                    setFeeStructureForm(
                      (prev) => ({
                        ...prev,
                        cycleType:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                >

                  <option value="">
                    Select Cycle Type
                  </option>

                  <option value="MONTHLY">
                    MONTHLY
                  </option>

                  <option value="QUARTERLY">
                    QUARTERLY
                  </option>

                  <option value="SEMESTER">
                    SEMESTER
                  </option>

                  <option value="ANNUALLY">
                    ANNUALLY
                  </option>

                  <option value="ONE_TIME">
                    ONE_TIME
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Program ID
                </label>

                <input
                  type="text"
                  value={
                    feeStructureForm.programId
                  }
                  onChange={(e) =>
                    setFeeStructureForm(
                      (prev) => ({
                        ...prev,
                        programId:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            STEP 3 - FEE STRUCTURE ITEM
        ================================================= */}

        {step === 3 && (
          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Fee Structure Item
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Edit fee structure item.
            </p>

            <div className="mt-6 space-y-5">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Amount
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    itemForm.amount
                  }
                  onChange={(e) =>
                    setItemForm(
                      (prev) => ({
                        ...prev,
                        amount:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={
                    itemForm.mandatory
                  }
                  onChange={(e) =>
                    setItemForm(
                      (prev) => ({
                        ...prev,
                        mandatory:
                          e.target.checked,
                      })
                    )
                  }
                />

                <span className="text-sm text-gray-700">
                  This fee is mandatory
                </span>

              </label>

              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">

                <strong>
                  Fee Head:
                </strong>{" "}

                {feeHeadForm.name ||
                  "-"}

              </div>

              <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">

                <strong>
                  Fee Structure:
                </strong>{" "}

                {feeStructureForm.name ||
                  "-"}

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            STEP 4 - INVOICE
        ================================================= */}

        {step === 4 && (
          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Fee Invoice
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Edit fee invoice details.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Vendor UUID
                </label>

                <input
                  type="text"
                  value={
                    invoiceForm.vendoruuid
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        vendoruuid:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Invoice Number
                </label>

                <input
                  type="text"
                  value={
                    invoiceForm.invoiceNumber
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        invoiceNumber:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Billing Period
                </label>

                <input
                  type="text"
                  value={
                    invoiceForm.billingPeriod
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        billingPeriod:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Due Date
                </label>

                <input
                  type="date"
                  value={
                    invoiceForm.dueDate
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        dueDate:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sub Total
                </label>

                <input
                  type="number"
                  step="0.01"
                  value={
                    invoiceForm.subTotal
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        subTotal:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Discount Total
                </label>

                <input
                  type="number"
                  step="0.01"
                  value={
                    invoiceForm.discountTotal
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        discountTotal:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Late Fee
                </label>

                <input
                  type="number"
                  step="0.01"
                  value={
                    invoiceForm.lateFee
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        lateFee:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Amount Paid
                </label>

                <input
                  type="number"
                  step="0.01"
                  value={
                    invoiceForm.amountPaid
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        amountPaid:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={
                    invoiceForm.status
                  }
                  onChange={(e) =>
                    setInvoiceForm(
                      (prev) => ({
                        ...prev,
                        status:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                >

                  <option value="DRAFT">
                    DRAFT
                  </option>

                  <option value="UNPAID">
                    UNPAID
                  </option>

                  <option value="PARTIALLY_PAID">
                    PARTIALLY_PAID
                  </option>

                  <option value="PAID">
                    PAID
                  </option>

                  <option value="CANCELLED">
                    CANCELLED
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Net Amount
                </label>

                <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700">

                  ₹
                  {calculatedNetAmount.toFixed(
                    2
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            STEP 5 - PAYMENT
        ================================================= */}

        {step === 5 && (
          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Fee Payment
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Edit payment details.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Receipt Number
                </label>

                <input
                  type="text"
                  value={
                    paymentForm.receiptNumber
                  }
                  onChange={(e) =>
                    setPaymentForm(
                      (prev) => ({
                        ...prev,
                        receiptNumber:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Amount
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    paymentForm.amount
                  }
                  onChange={(e) =>
                    setPaymentForm(
                      (prev) => ({
                        ...prev,
                        amount:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Mode
                </label>

                <select
                  value={
                    paymentForm.paymentMode
                  }
                  onChange={(e) =>
                    setPaymentForm(
                      (prev) => ({
                        ...prev,
                        paymentMode:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm"
                >

                  <option value="">
                    Select Payment Mode
                  </option>

                  <option value="CASH">
                    CASH
                  </option>

                  <option value="ONLINE">
                    ONLINE
                  </option>

                  <option value="CARD">
                    CARD
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="BANK_TRANSFER">
                    BANK TRANSFER
                  </option>

                  <option value="CHEQUE">
                    CHEQUE
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gateway Reference
                </label>

                <input
                  type="text"
                  value={
                    paymentForm.gatewayRef
                  }
                  onChange={(e) =>
                    setPaymentForm(
                      (prev) => ({
                        ...prev,
                        gatewayRef:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Payment Date
                </label>

                <input
                  type="date"
                  value={
                    paymentForm.paymentDate
                  }
                  onChange={(e) =>
                    setPaymentForm(
                      (prev) => ({
                        ...prev,
                        paymentDate:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

              {/* =================================================
                  LINKED INVOICE
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Fee Invoice
                </label>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">

                  {invoiceForm.invoiceNumber ||
                    "Fee Invoice not available"}

                </div>

              </div>

              {/* =================================================
                  REMARKS
              ================================================= */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Remarks
                </label>

                <textarea
                  rows={4}
                  value={
                    paymentForm.remarks
                  }
                  onChange={(e) =>
                    setPaymentForm(
                      (prev) => ({
                        ...prev,
                        remarks:
                          e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                />

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div className="mt-8 flex justify-between border-t pt-5">

          {/* BACK */}

          <button
            type="button"
            disabled={
              step === 1 ||
              saving
            }
            onClick={() =>
              setStep(
                (prev) =>
                  prev - 1
              )
            }
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {/* NEXT */}

          {step < 5 && (
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setError("");
                setSuccess("");

                setStep(
                  (prev) =>
                    prev + 1
                );
              }}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Next
            </button>
          )}

          {/* UPDATE */}

          {step === 5 && (
            <button
              type="button"
              disabled={saving}
              onClick={handleUpdate}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Updating..."
                : "Update Payment"}
            </button>
          )}

        </div>

      </div>

    </div>
  );
}