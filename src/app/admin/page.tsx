"use client";
import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

export default function Ecommerce() {

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.replace("/signin");
      return;
    }


    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {

      setUser(null);
    }
  }, [router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminPage() {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const jwt = localStorage.getItem("jwt");
//     if (!jwt) {
//       router.replace("/signin");
//       return;
//     }


//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     } else {

//       setUser(null);
//     }
//   }, [router]);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading user details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">User Details</h1>
//       <div className="space-y-2">
//         <p><strong>ID:</strong> {user.id}</p>
//         <p><strong>Username:</strong> {user.username}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         {/* Add more fields if available */}
//       </div>
//       <button
//         onClick={() => {
//           localStorage.removeItem("jwt");
//           localStorage.removeItem("user");
//           router.replace("/signin");
//         }}
//         className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
