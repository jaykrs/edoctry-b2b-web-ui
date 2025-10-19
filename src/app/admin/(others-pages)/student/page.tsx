import Student from "@/components/student/Student";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";

export const metadata: Metadata = {
  title: ` Student | ${appName}`,
  description:
    `${appName} Student `,
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