import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Createpage from "@/components/createpage/Createpage";

export const metadata: Metadata = {
  title: ` Create Pages | ${appName}`,
  description:
    `${appName} Create Pages `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Create Pages" />
      <Createpage />
    </>
  );
}