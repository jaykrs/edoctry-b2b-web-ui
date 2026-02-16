import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Email from "@/components/email-templates/Email";

export const metadata: Metadata = {
  title: ` Email Templates | ${appName}`,
  description:
    `${appName} Email Templates `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Email Templates" />
      <Email />
    </>
  );
}