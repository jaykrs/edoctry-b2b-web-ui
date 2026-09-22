"use client";

import React, { useEffect, useState } from "react";
import TextHeading from "../ui/textheader/TextHeader";
import { apiUrl } from "@/utils/config";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilIcon } from "@/icons";

interface AdmissionWorkflowOption {
  id: number;
  applicant_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  programname: string;
  academicterm: string;
  intakebatch: string;
  evaluationresult?: string;
  aggregateevalscore?: number;
}

function AdmissionWorkflowBody() {
  const [options, setOptions] = useState<AdmissionWorkflowOption[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const token = localStorage.getItem("jwt");

      try {
        const res = await fetch(
          `${apiUrl}/api/admission-workflows`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const json = await res.json();

        console.log("Admission Workflow API Response:", json);

        const formatted =
          json?.data?.map((item: any) => {
            const data = item.attributes || item;

            return {
              id: item.id || item.documentId,
              applicant_id: data.applicant_id || "-",
              firstname: data.firstname || "",
              lastname: data.lastname || "",
              email: data.email || "-",
              phone: data.phone || "-",
              programname: data.programname || "-",
              academicterm: data.academicterm || "-",
              intakebatch: data.intakebatch || "-",
              evaluationresult:
                data.evaluationresult || "Pending",
              aggregateevalscore:
                data.aggregateevalscore ?? 0,
            };
          }) || [];

        setOptions(formatted);
      } catch (err) {
        console.error(
          "Admission Workflow Fetch Error:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Admission Workflow"
          icon="🎓"
          buttonprops={{
            buttonText: "+",
            title: "Create Admission Workflow",
            content:
              "Create and manage Admission Workflow.",
            onClick: () =>
              router.push(
                "/admin/create-admission-workflow"
              ),
          }}
        />
      </div>

      <div className="space-y-3 w-full mx-auto">
        {/* Loading */}
        {loading ? (
          Array(4)
            .fill(undefined)
            .map((_, index) => (
              <div
                key={index}
                className="mx-auto w-full rounded-xl border p-4"
              >
                <div className="flex animate-pulse space-x-4">
                  <div className="size-10 rounded-full bg-gray-200"></div>

                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gray-200"></div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>

                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1200px]">
                <Table>

                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Applicant
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Email
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Phone
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Program
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Academic Term
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Batch
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Result
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Score
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Edit
                      </TableCell>

                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">

                    {options.length === 0 ? (
                      <TableRow>
                        <td
                          className="px-5 py-8 text-center text-gray-500"
                          colSpan={9}
                        >
                          No Admission Workflow records found.
                        </td>
                      </TableRow>
                    ) : (
                      options.map((opt) => (
                        <TableRow key={opt.id}>

                          {/* Applicant */}
                          <TableCell className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-4">

                              <div className="w-12 h-12">
                                <img
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    `${opt.firstname} ${opt.lastname}`
                                  )}&background=random&color=fff`}
                                  alt={`${opt.firstname} ${opt.lastname}`}
                                  className="rounded-xl object-cover w-full h-full"
                                />
                              </div>

                              <div>
                                <div className="font-semibold text-gray-800 text-sm">
                                  {opt.firstname}{" "}
                                  {opt.lastname}
                                </div>

                                <div className="text-xs text-gray-500">
                                  {opt.applicant_id}
                                </div>
                              </div>

                            </div>
                          </TableCell>

                          {/* Email */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.email}
                          </TableCell>

                          {/* Phone */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.phone}
                          </TableCell>

                          {/* Program */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.programname}
                          </TableCell>

                          {/* Academic Term */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.academicterm}
                          </TableCell>

                          {/* Batch */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.intakebatch}
                          </TableCell>

                          {/* Result */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.evaluationresult}
                          </TableCell>

                          {/* Score */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            {opt.aggregateevalscore}
                          </TableCell>

                          {/* Edit */}
                          <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                            <button
                              onClick={() =>
                                router.push(
                                  `/admin/edit-admission-workflow?id=${opt.id}`
                                )
                              }
                              title="Edit Workflow"
                            >
                              <PencilIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                            </button>
                          </TableCell>

                        </TableRow>
                      ))
                    )}

                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdmissionWorkflowBody;