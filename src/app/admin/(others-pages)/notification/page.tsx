import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Notification from "@/components/notification/Notification";

export const metadata: Metadata = {
  title: ` Notification | ${appName}`,
  description:
    `${appName} Notification `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Notifications" />
      <Notification />
    </>
  );
}