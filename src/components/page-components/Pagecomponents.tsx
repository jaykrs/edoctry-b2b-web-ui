"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextHeading from "../ui/textheader/TextHeader";
import { apiUrl } from "@/utils/config";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../ui/table";
import { PencilIcon } from '@/icons';

function PageComponents() {
  const router = useRouter();

  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    fetch(`${apiUrl}/api/templates?filters[type][$eq]=page-templates`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const mappedOptions = res.data.map((item: any) => ({
          id: item.id,
          name: item.attributes?.name || "Untitled",
          discriptons: item.attributes?.template || "-",
          type: item.attributes?.type || "email-templates",
          json: item.attributes?.json,
          html: item.attributes?.html_element,
        }));

        setOptions(mappedOptions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="">
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Page Components"
          icon="🧩"
          buttonprops={{
            buttonText: "+",
            title: "Create Page Components",
            content:
              "Create professional page components to build engaging user interfaces.",
            onClick: () => router.push("/admin/create-page-components"),
          }}
        />
      </div>

      <div className="space-y-3 w-full mx-auto">
        {loading ? (
          Array(options.length || 4)
            .fill(undefined)
            .map((_, index) => (
              <div key={index} className="mx-auto w-full rounded-xl border p-4">
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
              <div className="min-w-[1102px]">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Template Name
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Discriptions
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Json
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        HTML
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Edit
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {options.map((opt, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="px-5 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14">
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  opt.name
                                )}&background=random&color=fff`}
                                alt={opt.name}
                                className="rounded-xl object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800 text-sm">
                                {opt.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {opt.type}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {opt.discriptons}
                        </TableCell>


                        <TableCell className="px-5 py-4 ps-8 whitespace-nowrap">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${opt.json ? "bg-green-500" : "bg-red-500"
                              }`}
                          />
                        </TableCell>

                        <TableCell className="px-5 py-4 ps-8 whitespace-nowrap">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${opt.html ? "bg-green-500" : "bg-red-500"
                              }`}
                          />
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <button
                            onClick={() =>
                              router.push(`/admin/create-page-components?pid=${opt.id}`)
                            }
                            title="Edit Page Component"
                          >
                            <PencilIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default PageComponents;
