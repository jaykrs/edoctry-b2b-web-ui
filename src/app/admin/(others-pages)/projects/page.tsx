import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Projects from "@/components/projects/Projects";

export const metadata: Metadata = {
  title: ` Projects | ${appName}`,
  description:
    `${appName} Projects `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Projects" />
      <Projects />
    </>
  );
}