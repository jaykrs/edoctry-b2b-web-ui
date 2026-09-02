"use client";

import React, { useState } from "react";
import Applicant from "./steps/Applicant";
import Assessment from "./steps/Assessment";
import Approval from "./steps/Approval";
import Payment from "./steps/Payment";
import StudentOnboarding from "./steps/Studentonboarding";

function FinishScreen({ data }: { data: any }) {
  const recordId = data?.documentId || data?.id || "N/A";

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-white border border-gray-200 rounded-xl shadow-lg text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold mb-4">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-gray-800">
        Admission Workflow Completed Successfully
      </h1>
      <p className="text-gray-600 mt-2 text-sm">
        All five phases have been submitted and updated under a single Strapi record.
      </p>

      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-left text-xs font-mono text-gray-700">
        <p className="font-semibold text-gray-900 border-b pb-2 mb-2">
          Record Summary
        </p>
        <p>
          <strong>Strapi Record ID / documentId:</strong> {recordId}
        </p>
        <p>
          <strong>Applicant Name:</strong> {data?.firstname || data?.personal_info?.first_name || "N/A"}{" "}
          {data?.lastname || data?.personal_info?.last_name || ""}
        </p>
        <p>
          <strong>Application ID:</strong> {data?.applicant_id || data?.application_id || "N/A"}
        </p>
        <p>
          <strong>Assessment Status:</strong>{" "}
          {data?.assessment?.evaluation_result || data?.assessment_details?.decision || "N/A"}
        </p>
        <p>
          <strong>Approval Status:</strong> {data?.approval_status || data?.approval?.status || "N/A"}
        </p>
        <p>
          <strong>Payment Transaction:</strong> {data?.fee_transaction_id || data?.payment?.fee_transaction_id || "N/A"}
        </p>
        <p>
          <strong>Student ID:</strong>{" "}
          {data?.Onboarding?.student_profile?.student_id || data?.onboarding?.student_profile?.student_id || "N/A"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition shadow"
      >
        Start New Workflow
      </button>
    </div>
  );
}

export default function AdmissionWorkflow() {
  const [step, setStep] = useState<number>(1);
  const [workflowData, setWorkflowData] = useState<any>(null);

  // Common handler to advance steps and save returned Strapi data
  const handleNext = (data?: any) => {
  if (data) {
      setWorkflowData(data);
    }
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
  setStep((prev) => (prev > 1 ? prev - 1 : prev));
};

  // Common handler to return to previous step
  //const handleBack = () => {
    //setStep((prev) => (prev > 1 ? prev - 1 : prev));
  //};

  const steps = [
    {
      id: 1,
      label: "Applicant",
      subtext: "Applicant Profile Data Capture",
    },
    {
      id: 2,
      label: "Assessment",
      subtext: "Evaluate applicant performance",
    },
    {
      id: 3,
      label: "Approval",
      subtext: "Review application and issue offer letter",
    },
    {
      id: 4,
      label: "Payment",
      subtext: "Fee submission",
    },
    {
      id: 5,
      label: "Onboarding",
      subtext: "Student Onboarding",
    },
  ];

  const currentTargetId = 
    workflowData?.documentId || workflowData?.id || null;
  console.log("WORKFLOW DATA:", workflowData);
  console.log("CURRENT TARGET ID:", currentTargetId);
  return (
    <div className="createpage-container overflow-x-hidden">
      {/* Stepper Header (Steps 1 to 5) */}
      {step <= 5 && (
        <div
          className="stepper-container mb-4"
          style={{ userSelect: "none" }}
        >
          {steps.map((s) => {
            let className = "flex-col step-item ";

            if (step > s.id) {
              className += "completed-step";
            } else if (step === s.id) {
              className += "active-step";
            }

            return (
              <div key={s.id} className={className}>
                <div className="step-label">{s.label}</div>
                <div className="step-subtext">{s.subtext}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Step Content View */}
      <div className="step-content">
        {/* Step 1: POST /api/admission-workflows */}
        {step === 1 && (
          <Applicant
            data={workflowData}
            onChange={setWorkflowData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 2: PUT /api/admission-workflows/:id */}
        {step === 2 && (
          <Assessment
            data={workflowData}
            strapiId={currentTargetId}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 3: PUT /api/admission-workflows/:id */}
        {step === 3 && (
          <Approval
            data={workflowData}
            strapiId={currentTargetId}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 4: PUT /api/admission-workflows/:id */}
        {step === 4 && (
          <Payment
            data={workflowData}
            strapiId={currentTargetId}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 5: PUT /api/admission-workflows/:id */}
        {step === 5 && (
          <StudentOnboarding
            data={workflowData}
            strapiId={currentTargetId}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {/* Step 6: Final Completion Screen */}
        {step === 6 && <FinishScreen data={workflowData} />}
      </div>
    </div>
  );
}