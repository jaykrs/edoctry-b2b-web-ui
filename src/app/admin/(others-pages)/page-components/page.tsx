import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import  PageComponents  from "@/components/page-components/Pagecomponents";
export const metadata: Metadata = {
  title: ` Page Components | ${appName}`,
  description:
    `${appName} Page Components `,
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Page Components" />
      <PageComponents />
    </>
  );
}