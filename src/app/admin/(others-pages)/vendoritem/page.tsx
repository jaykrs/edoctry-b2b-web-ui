import Student from "@/components/student/Student";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import VenderItem from "@/components/venderitem/VenderItem";

export const metadata: Metadata = {
  title: "Next.js Vendor Item | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Vendor Item page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Vendor Item" />
      <VenderItem />
    </>
  );
}