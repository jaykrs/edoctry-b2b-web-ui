import Student from "@/components/student/Student";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Student | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Student page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Student" />
      <Student />
    </>
  );
}