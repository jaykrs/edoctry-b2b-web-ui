import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React, { Suspense } from "react";
import EditPage from "@/components/editpage/Editpage";

export const metadata: Metadata = {
  title: `Edit Pages | ${appName}`,
  description: `${appName} Edit Pages`,
};

export default function Page() {
  return (
    <>
      <PageBreadcrumb pageTitle="Edit Pages" />
      <Suspense fallback={<div>Loading editor...</div>}>
        <EditPage />
      </Suspense>
    </>
  );
}
