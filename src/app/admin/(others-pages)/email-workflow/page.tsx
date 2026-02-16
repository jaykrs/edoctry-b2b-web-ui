import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import EmailWorkflow from "@/components/email-workflow/Email-workflow";

export const metadata: Metadata = {
  title: `Emails | ${appName}`,
  description:
    `${appName} Emails `,
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Emails-workflow" />
      <EmailWorkflow />
    </div>
  );
}
