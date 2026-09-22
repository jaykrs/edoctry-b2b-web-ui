import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import CreatePaymentWorkflow from "@/components/createpayment/createpayment";

export const metadata: Metadata = {
  title: `Create Payment | ${appName}`,
  description: `${appName} Create Payment`,
};

export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Payment" />
      <CreatePaymentWorkflow />
    </>
  );
}