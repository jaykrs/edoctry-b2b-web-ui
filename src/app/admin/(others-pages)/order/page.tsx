import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import Order from "@/components/order/Order";

export const metadata: Metadata = {
  title: ` Order | ${appName}`,
  description:
    `${appName} Order `,
  // other metadata
};
export default function page() {
    
  return (
    <>
      <PageBreadcrumb pageTitle="Orders" />
      <Order />
    </>
  );
}