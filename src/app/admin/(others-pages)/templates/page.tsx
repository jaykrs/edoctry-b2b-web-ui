import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import { Templates } from "@/components/templates/Templates";

export const metadata: Metadata = {
  title: ` Templates | ${appName}`,
  description:
    `${appName} Templates `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Templates" />
      <Templates />
    </>
  );
}