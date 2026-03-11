import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Attendance from "@/components/attendance/Attendance";

export const metadata: Metadata = {
  title: `Attendance | ${appName}`,
  description:
    `${appName} Attendance `,
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Attendance" />
      <Attendance />
    </div>
  );
}
