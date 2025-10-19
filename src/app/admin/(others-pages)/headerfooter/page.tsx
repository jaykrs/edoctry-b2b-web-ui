import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageHeader from "@/components/headernew/PageHeader";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";

export const metadata: Metadata = {
  title: ` Header | ${appName}`,
  description:
    `${appName} Header `,
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Header/Footer" />
      <PageHeader />
    </div>
  );
}