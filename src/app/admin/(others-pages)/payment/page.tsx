import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Payment from "@/components/payment/payment";

export const metadata: Metadata = {
  title: `Payment | ${appName}`,
  description: `${appName} Payment`,
};

export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Payment" />
      <Payment />
    </>
  );
}