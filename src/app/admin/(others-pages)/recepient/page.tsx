import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import Recepient from "@/components/recepient/Recepient";

export const metadata: Metadata = {
  title: "Next.js Recepient | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Recepient page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Recepient" />
      <Recepient />
    </>
  );
}