import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Support from "@/components/support/Support";

export const metadata: Metadata = {
  title: ` Support | ${appName}`,
  description:
    `${appName} Support `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Support" />
      <Support />
    </>
  );
}