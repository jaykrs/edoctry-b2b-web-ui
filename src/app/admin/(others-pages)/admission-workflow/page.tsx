import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Pages from "@/components/admission-workflow/admissionworkflow";

export const metadata: Metadata = {
  title: ` Admission-Workflow | ${appName}`,
  description:
    `${appName} Admission-Workflow `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Admission Workflow" />
      <Pages />
    </>
  );
}