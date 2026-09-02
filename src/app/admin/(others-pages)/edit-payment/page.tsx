"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import EditPaymentWorkflow from "@/components/payment/EditPaymentWorkflow";

export default function EditPaymentPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="p-8 text-center text-red-500">
        Payment ID not found.
      </div>
    );
  }

  return (
    <EditPaymentWorkflow paymentId={id} />
  );
}