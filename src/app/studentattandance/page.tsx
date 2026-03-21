import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React from "react";
import StudentAttendance from "@/components/studentattendance/StudentAttendance";

export const metadata: Metadata = {
    title: ` Student Attendance | ${appName}`,
    description:
        `${appName} Student Attendance `,
};
export default async function Page({ searchParams }: any) {

    const { vendoruuid } = await searchParams;

    return (
        <>
            <StudentAttendance vendoruuid={vendoruuid} />
        </>
    );
}