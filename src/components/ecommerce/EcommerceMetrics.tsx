"use client";

import { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "@/icons";
import { apiUrl } from "@/utils/config";

const getPercentageChange = (current: number, previous: number) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

export const EcommerceMetrics = () => {
  const [students, setStudents] = useState(0);
  const [lastMonthStudents, setLastMonthStudents] = useState(0);

  const [customers, setCustomers] = useState(0);
  const [lastMonthCustomers, setLastMonthCustomers] = useState(0);

  useEffect(() => {
    fetchStudentList();
    fetchCustomerList();
  }, []);

  const getAuthData = () => {
    const staffDataString = localStorage.getItem("staffData");
    const staffData = staffDataString ? JSON.parse(staffDataString) : null;
    const jwt = localStorage.getItem("jwt");
    const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;
    return { jwt, vendorid };
  };

  const fetchStudentList = async () => {
    try {
      const { jwt, vendorid } = getAuthData();
      if (!jwt || !vendorid) return;

      // current month
      const currentRes = await fetch(
        `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const currentData = await currentRes.json();
      setStudents(currentData.meta.pagination.total);

      // last month (example logic – backend se real filter laga sakte ho)
      const lastMonthRes = await fetch(
        `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}&pagination[limit]=0`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const lastMonthData = await lastMonthRes.json();
      setLastMonthStudents(lastMonthData.meta.pagination.total);
    } catch (error) {
      console.error("Student fetch error:", error);
    }
  };

  const fetchCustomerList = async () => {
    try {
      const { jwt, vendorid } = getAuthData();
      if (!jwt || !vendorid) return;

      // current month
      const currentRes = await fetch(
        `${apiUrl}/api/customers?filters[vendorId][$eq]=${vendorid}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const currentData = await currentRes.json();
      setCustomers(currentData.meta.pagination.total);

      // last month (example logic)
      const lastMonthRes = await fetch(
        `${apiUrl}/api/customers?filters[vendorId][$eq]=${vendorid}&pagination[limit]=0`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const lastMonthData = await lastMonthRes.json();
      setLastMonthCustomers(lastMonthData.meta.pagination.total);
    } catch (error) {
      console.error("Customer fetch error:", error);
    }
  };

  const studentChange = getPercentageChange(students, lastMonthStudents);
  const customerChange = getPercentageChange(customers, lastMonthCustomers);

  const isStudentUp = studentChange >= 0;
  const isCustomerUp = customerChange >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* Students */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Students
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {students}
            </h4>
          </div>

          <Badge color={isStudentUp ? "success" : "error"}>
            {isStudentUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(studentChange).toFixed(2)}%
          </Badge>
        </div>
      </div>

      {/* Customers */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {customers}
            </h4>
          </div>

          <Badge color={isCustomerUp ? "success" : "error"}>
            {isCustomerUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {Math.abs(customerChange).toFixed(2)}%
          </Badge>
        </div>
      </div>
    </div>
  );
};
