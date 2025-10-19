import Student from "@/components/student/Student";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import VenderItem from "@/components/venderitem/VenderItem";

export const metadata: Metadata = {
  title: ` Vendor Item | ${appName}`,
  description:
    `${appName} Vendor Item `,
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