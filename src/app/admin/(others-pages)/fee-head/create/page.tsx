"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FeeHead from "@/components/createpayment/steps/FeeHead";

export default function CreateFeeHeadPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/admin/fee-invoice");
  };

  const handleBack = () => {
    router.push("/admin/fee-head");
  };

  return (
    <div className="p-6">
      <FeeHead
        onNext={handleNext}
        onBack={handleBack}
        data={null}
      />
    </div>
  );
}