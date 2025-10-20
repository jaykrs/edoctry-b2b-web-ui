import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import EditHeader from "@/components/editheader/Editheader";
import EditHeaderFooter from "@/components/editheader/Editheader";

export const metadata: Metadata = {
  title: `Edit Header/Footer | ${appName}`,
  description: `${appName} Edit Header/Footer`,
};



export default function Page() {
  

  return (
    <>
      <PageBreadcrumb pageTitle="Edit Header/Footer" />
      <EditHeaderFooter  /> 
    </>
  );
}



