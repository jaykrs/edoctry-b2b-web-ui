import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import Pages from "@/components/pages/Pages";

export const metadata: Metadata = {
  title: "Next.js Pages | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Pages page for TailAdmin  Tailwind CSS Admin Dashboard Template",
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