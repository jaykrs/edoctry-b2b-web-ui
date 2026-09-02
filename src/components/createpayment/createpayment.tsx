"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import FeeHead from "./steps/FeeHead";
import FeeStructure from "./steps/FeeStructure";
import FeeStructureItem from "./steps/FeeStructureItem";
import FeeInvoice from "./steps/FeeInvoice";
import FeePayment from "./steps/FeePayment";

// =====================================================
// STEPS
// =====================================================

const steps = [
  {
    id: 1,
    label: "Fee Header",
    subtext: "Create and manage fee heads",
  },
  {
    id: 2,
    label: "Fee Structure",
    subtext: "Create fee structure",
  },
  {
    id: 3,
    label: "Fee Structure Item",
    subtext: "Add fee structure items",
  },
  {
    id: 4,
    label: "Invoice",
    subtext: "Create student fee invoice",
  },
  {
    id: 5,
    label: "Fee Payment",
    subtext: "Record fee payment",
  },
];

// =====================================================
// COMPONENT
// =====================================================

export default function CreatePaymentWorkflow() {
  const router = useRouter();

  // ===================================================
  // CURRENT STEP
  // ===================================================

  const [step, setStep] = useState(1);

  // ===================================================
  // WORKFLOW DATA
  // ===================================================

  const [workflowData, setWorkflowData] = useState<any>({
    feeHead: null,
    feeStructure: null,
    feeStructureItem: null,
    invoice: null,
    feePayment: null,
  });

  // ===================================================
  // NEXT
  // ===================================================

  const handleNext = (data?: any) => {
    // -----------------------------------------------
    // STEP 1 -> STEP 2
    // -----------------------------------------------

    if (step === 1) {
      if (!data) {
        return;
      }

      setWorkflowData((prev: any) => ({
        ...prev,
        feeHead: data,
      }));

      console.log("Step 1 - Fee Head:", data);

      setStep(2);
      return;
    }

    // -----------------------------------------------
    // STEP 2 -> STEP 3
    // -----------------------------------------------

    if (step === 2) {
      if (!data) {
        return;
      }

      setWorkflowData((prev: any) => ({
        ...prev,
        feeStructure: data,
      }));

      console.log(
        "Step 2 - Fee Structure:",
        data
      );

      setStep(3);
      return;
    }

    // -----------------------------------------------
    // STEP 3 -> STEP 4
    // -----------------------------------------------

    if (step === 3) {
      if (!data) {
        return;
      }

      setWorkflowData((prev: any) => ({
        ...prev,
        feeStructureItem: data,
      }));

      console.log(
        "Step 3 - Fee Structure Item:",
        data
      );

      setStep(4);
      return;
    }

    // -----------------------------------------------
    // STEP 4 -> STEP 5
    // -----------------------------------------------

    if (step === 4) {
      if (!data) {
        return;
      }

      setWorkflowData((prev: any) => ({
        ...prev,
        invoice: data,
      }));

      console.log(
        "Step 4 - Fee Invoice:",
        data
      );

      setStep(5);
      return;
    }

    // -----------------------------------------------
    // STEP 5 -> COMPLETE
    // -----------------------------------------------

    if (step === 5) {
      if (!data) {
        return;
      }

      const completedWorkflow = {
        ...workflowData,
        feePayment: data,
      };

      setWorkflowData(completedWorkflow);

      console.log(
        "===================================="
      );

      console.log(
        "PAYMENT WORKFLOW COMPLETED"
      );

      console.log(
        "Complete Workflow:",
        completedWorkflow
      );

      console.log(
        "Fee Head:",
        completedWorkflow.feeHead
      );

      console.log(
        "Fee Structure:",
        completedWorkflow.feeStructure
      );

      console.log(
        "Fee Structure Item:",
        completedWorkflow.feeStructureItem
      );

      console.log(
        "Fee Invoice:",
        completedWorkflow.invoice
      );

      console.log(
        "Fee Payment:",
        completedWorkflow.feePayment
      );

      console.log(
        "===================================="
      );

      // ---------------------------------------------
      // REDIRECT TO PAYMENT LIST
      // ---------------------------------------------

      setTimeout(() => {
        router.push("/admin/payment");
      }, 1000);

      return;
    }
  };

  // ===================================================
  // BACK
  // ===================================================

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="w-full overflow-x-hidden">

      {/* =================================================
          STEPPER
      ================================================= */}

      <div className="mb-8 flex w-full items-start justify-between">

        {steps.map((item, index) => {
          const isActive =
            step === item.id;

          const isCompleted =
            step > item.id;

          return (
            <React.Fragment key={item.id}>

              {/* -----------------------------------------
                  STEP
              ----------------------------------------- */}

              <div className="flex min-w-0 flex-1 flex-col items-center text-center">

                {/* Circle */}

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
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

                {/* Label */}

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

                {/* Subtext */}

                <div className="mt-1 hidden text-xs text-gray-400 md:block">
                  {item.subtext}
                </div>

              </div>

              {/* -----------------------------------------
                  CONNECTOR
              ----------------------------------------- */}

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
        })}

      </div>

      {/* =================================================
          STEP 1
      ================================================= */}

      {step === 1 && (
        <FeeHead
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.feeHead}
        />
      )}

      {/* =================================================
          STEP 2
      ================================================= */}

      {step === 2 && (
        <FeeStructure
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.feeStructure}
        />
      )}

      {/* =================================================
          STEP 3
      ================================================= */}

      {step === 3 && (
        <FeeStructureItem
          onNext={handleNext}
          onBack={handleBack}
          data={
            workflowData.feeStructureItem
          }
          feeHead={
            workflowData.feeHead
          }
          feeStructure={
            workflowData.feeStructure
          }
        />
      )}

      {/* =================================================
          STEP 4
      ================================================= */}

      {step === 4 && (
        <FeeInvoice
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.invoice}
          feeStructure={
            workflowData.feeStructure
          }
        />
      )}

      {/* =================================================
          STEP 5
      ================================================= */}

      {step === 5 && (
        <FeePayment
          onNext={handleNext}
          onBack={handleBack}
          data={workflowData.feePayment}
          invoice={workflowData.invoice}
        />
      )}

    </div>
  );
}