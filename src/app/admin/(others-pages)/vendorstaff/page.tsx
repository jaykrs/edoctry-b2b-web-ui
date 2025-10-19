import VendorStaff from "@/components/venderStaff/VenderStaff";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";

export const metadata: Metadata = {
  title: ` Vendor Staff | ${appName}`,
  description:
    `${appName} Vendor Staff `,
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Vendor Staff" />
      <VendorStaff />
    </>
  );
}