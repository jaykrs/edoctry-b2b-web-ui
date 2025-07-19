import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import Order from "@/components/order/Order";

export const metadata: Metadata = {
  title: "Next.js Order | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Order page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Orders" />
      <Order />
    </>
  );
}