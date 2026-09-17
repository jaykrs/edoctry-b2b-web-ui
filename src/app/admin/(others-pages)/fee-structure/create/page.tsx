"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FeeStructure from "@/components/createpayment/steps/FeeStructure";

export default function CreateFeeStructurePage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/admin/fee-invoice");
  };

  const handleBack = () => {
    router.push("/admin/fee-structure");
  };

  return (
    <div className="p-6">
      <FeeStructure
        onNext={handleNext}
        onBack={handleBack}
        data={null}
      />
    </div>
  );
}