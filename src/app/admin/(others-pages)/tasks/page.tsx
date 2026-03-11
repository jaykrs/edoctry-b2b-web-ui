import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Task from "@/components/task/Task";

export const metadata: Metadata = {
  title: ` Task | ${appName}`,
  description:
    `${appName} Task Management `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Task" />
      <Task/>
    </>
  );
}