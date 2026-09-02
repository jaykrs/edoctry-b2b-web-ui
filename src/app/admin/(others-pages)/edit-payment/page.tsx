"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EditPaymentWorkflow from "@/components/payment/EditPaymentWorkflow";

function EditPaymentContent() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="p-8 text-center text-red-500">
        Payment ID not found.
      </div>
    );
  }

  return <EditPaymentWorkflow paymentId={id} />;
}

 export default function EditPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center">
          Loading...
        </div>
      }
    >
      <EditPaymentContent />
    </Suspense>
  );
}