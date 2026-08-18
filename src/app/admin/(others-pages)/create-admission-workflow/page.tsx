import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import CreateAdmission from "@/components/createadmission/createadmission";

export const metadata: Metadata = {
  title: `Create Admission Workflow | ${appName}`,
  description: `${appName} Create Admission Workflow`,
};

export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Create Admission Workflow" />
      <CreateAdmission />
    </>
  );
}