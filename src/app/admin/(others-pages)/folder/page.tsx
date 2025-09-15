import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import MediaLibrary from "@/components/MediaLibrary/MediaLibrary";

export const metadata: Metadata = {
  title: ` Media Library | ${appName}`,
  description:
    `${appName} Media Library `,
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Media Library" />
      <MediaLibrary />
    </div>
  );
}