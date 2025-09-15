import Invoice from "@/components/invoice/Invoice";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";

export const metadata: Metadata = {
  title: ` Invoice | ${appName}`,
  description:
    `${appName} Invoice `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Invoice" />
      <Invoice />
    </>
  );
}