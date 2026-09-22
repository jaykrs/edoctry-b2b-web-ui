"use client";

import React from "react";
import { useRouter } from "next/navigation";
import FeeStructureItem from "@/components/createpayment/steps/FeeStructureItem";

export default function CreateFeeStructureItemPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/admin/fee-invoice");
  };

  const handleBack = () => {
    router.push("/admin/fee-structure-item");
  };

  return (
    <div className="p-6">
      <FeeStructureItem
        onNext={handleNext}
        initialData={null}
      />
    </div>
  );
}