import Invoice from "@/components/invoice/Invoice";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Invoice | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Invoice page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Invoice" />
      <Invoice />
    </>
  );
}