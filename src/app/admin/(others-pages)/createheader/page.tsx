import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CreateHeader from "@/components/createheader/Createheader";

export const metadata: Metadata = {
  title: "Next.js Create Pages | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Create Pages page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Create Header/Footer" />
      <CreateHeader />
    </>
  );
}