"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import StudentConcession from "./steps/StudentConcession";
import FeeStructure from "./steps/FeeStructure";
import FeeHead from "./steps/FeeHead";
import FeeInvoice from "./steps/FeeInvoice";
import FeePayment from "./steps/FeePayment";
import InvoiceLineItem from "./steps/InvoiceLineItem";

const steps = [
  {
    id: 1,
    label: "Fee Structure",
    subtext: "Create fee structure & select items",
  },
  {
    id: 2,
    label: "Fee Head",
    subtext: "Select fee head",
  },
  {
    id: 3,
    label: "Student Concession",
    subtext: "Add student concession (Optional)",
  },
  {
    id: 4,
    label: "Invoice Line Item",
    subtext: "Create invoice line item",
  },
  {
    id: 5,
    label: "Fee Invoice",
    subtext: "Create student fee invoice",
  },
  {
    id: 6,
    label: "New Payment",
    subtext: "Record payment",
  },
];

export default function CreatePaymentWorkflow() {
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [workflowData, setWorkflowData] = useState<any>({
    feeStructure: null,
    feeHead: null,
    studentConcession: null,
    invoiceLineItem: null,
    invoice: null,
    payment: null,
  });

  const handleNext = (data?: any) => {
    // Step 3 is optional
    if (step === 3) {
      setWorkflowData((prev: any) => ({
        ...prev,
        studentConcession: data || null,
      }));

      console.log(
        "Step 3 - Student Concession:",
        data
      );

      setStep(4);
      return;
    }

    // Other steps require data
    if (!data) return;

    if (step === 1) {
      setWorkflowData((prev: any) => ({
        ...prev,
        feeStructure: data,
      }));

      console.log(
        "Step 1 - Fee Structure:",
        data
      );

      setStep(2);
      return;
    }

    if (step === 2) {
      setWorkflowData((prev: any) => ({
        ...prev,
        feeHead: data,
      }));

      console.log(
        "Step 2 - Fee Head:",
        data
      );

      setStep(3);
      return;
    }

    if (step === 4) {
      setWorkflowData((prev: any) => ({
        ...prev,
        invoiceLineItem: data,
      }));

      console.log(
        "Step 4 - Invoice Line Item:",
        data
      );

      setStep(5);
      return;
    }

    if (step === 5) {
      setWorkflowData((prev: any) => ({
        ...prev,
        invoice: data,
      }));

      console.log(
        "Step 5 - Fee Invoice:",
        data
      );

      setStep(6);
      return;
    }

    if (step === 6) {
      const completedWorkflow = {
        ...workflowData,
        payment: data,
      };

      setWorkflowData(completedWorkflow);

      console.log(
        "PAYMENT WORKFLOW COMPLETED",
        completedWorkflow
      );

      setTimeout(() => {
        router.push("/admin/payment");
      }, 1000);

      return;
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((previousStep) => previousStep - 1);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Workflow Header */}
      <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Create Payment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Complete the fee setup and payment workflow.
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Step {step} of {steps.length}
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex min-w-[900px] items-start">
            {steps.map((item, index) => {
              const isActive = step === item.id;
              const isCompleted = step > item.id;

              return (
                <React.Fragment key={item.id}>
                  <div className="flex min-w-[140px] flex-1 flex-col items-center text-center">
                    <div
                      className={[
                        "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold",
                        isActive
                          ? "border-blue-600 bg-blue-600 text-white"
                          : isCompleted
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-500",
                      ].join(" ")}
                    >
                      {isCompleted ? "✓" : item.id}
                    </div>

                    <p
                      className={[
                        "mt-2 text-xs font-semibold",
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500",
                      ].join(" ")}
                    >
                      {item.label}
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {item.subtext}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={[
                        "mt-4 h-0.5 flex-1",
                        step > item.id
                          ? "bg-green-500"
                          : "bg-gray-200",
                      ].join(" ")}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <FeeStructure
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.feeStructure}
        />
      )}

      {/* Step 2 */}
      {step === 2 && (
        <FeeHead
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.feeHead}
        />
      )}

      {/* Step 3 - Optional */}
      {step === 3 && (
        <StudentConcession
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.studentConcession}
        />
      )}

      {/* Step 4 */}
      {step === 4 && (
        <InvoiceLineItem
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.invoiceLineItem}
          feeHead={workflowData.feeHead}
          feeStructure={workflowData.feeStructure}
          studentConcession={
            workflowData.studentConcession
          }
        />
      )}

      {/* Step 5 */}
      {step === 5 && (
        <FeeInvoice
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.invoice}
          feeStructure={workflowData.feeStructure}
          feeHead={workflowData.feeHead}
          studentConcession={
            workflowData.studentConcession
          }
          invoiceLineItem={
            workflowData.invoiceLineItem
          }
        />
      )}

      {/* Step 6 */}
      {step === 6 && (
        <FeePayment
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.payment}
          invoice={workflowData.invoice}
        />
      )}
    </div>
  );
}