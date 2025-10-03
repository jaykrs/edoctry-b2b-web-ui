import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Pages from "@/components/pages/Pages";

export const metadata: Metadata = {
  title: ` Pages | ${appName}`,
  description:
    `${appName} Pages `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Pages" />
      <Pages />
    </>
  );
}