import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { Templates } from "@/components/templates/Templates";

export const metadata: Metadata = {
  title: "Next.js Templates | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Templates page for TailAdmin  Tailwind CSS Admin Dashboard Template",
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