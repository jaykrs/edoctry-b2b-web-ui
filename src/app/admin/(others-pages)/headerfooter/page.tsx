import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageHeader from "@/components/headernew/PageHeader";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Header | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Header page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Header" />
      <PageHeader />
    </div>
  );
}