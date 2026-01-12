import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Customers from "@/components/customers/Customers";

export const metadata: Metadata = {
  title: ` Customers | ${appName}`,
  description:
    `${appName} Customers `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Customers" />
      <Customers />
    </>
  );
}