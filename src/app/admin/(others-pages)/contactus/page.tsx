"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import { appName } from "@/utils/config";
import React , { useEffect, useState } from "react";
import Recepient from "@/components/recepient/Recepient";
import { apiUrl } from "@/utils/config";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "../../../../components/ui/table";

export default function page() {
    const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
      fetchContactList();
    }, []);
  
    const fetchContactList = async () => {
      try {
        const staffDataString = localStorage.getItem("staffData");
        const staffData = staffDataString ? JSON.parse(staffDataString) : null;
        const jwt = localStorage.getItem("jwt");
        const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;
  
        if (vendorid && jwt) {
          const res = await fetch(
            `${apiUrl}/api/contactuses?filters[vendoruuid][$eq]=${vendorid}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
  
          const data = await res.json();
          // students ko set karo
          setContacts(data?.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch student list:", error);
      }
    };

  return (
    <>
      <PageBreadcrumb pageTitle="Contact" />
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">email</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">subject</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">message</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="px-5 py-6 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-lg">
                          <img src={`https://ui-avatars.com/api/?name=${contact.attributes.name}&background=random`} alt={contact.attributes.name} />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {contact.attributes.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {contact.attributes.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {contact.attributes.subject}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {contact.attributes.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}