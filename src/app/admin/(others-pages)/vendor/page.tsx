import Vendor from "@/components/vendor/Vendor";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Vendor | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Vendor page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Vendor" />
      <Vendor />
    </>
  );
}