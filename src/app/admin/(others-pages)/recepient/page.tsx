import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Recepient from "@/components/recepient/Recepient";

export const metadata: Metadata = {
  title: ` Recepient | ${appName}`,
  description:
    `${appName} Recepient `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Recepient" />
      <Recepient />
    </>
  );
}