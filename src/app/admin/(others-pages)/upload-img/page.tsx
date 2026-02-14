import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import UploadImg from "@/components/upload-img/Upload-img";

export const metadata: Metadata = {
  title: ` Upload Image | ${appName}`,
  description:
    `${appName} Upload Image `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Upload Image" />
      <UploadImg />
    </>
  );
}