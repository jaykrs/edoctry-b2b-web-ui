"use client";
import React, { useEffect } from 'react';
import { apiUrl } from "@/utils/config"; 

function VendorStaff() {
  const vendorStaff = async () => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (vendorid && jwt) {
        const res = await fetch(
          `${apiUrl}/api/vendostaffs?filters[vendoruuid][$eq]=${vendorid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await res.json();
        console.log("Vendor Staff Data:", data);
      }
    } catch (error) {
      console.error("Failed to fetch vendor staff list:", error);
    }
  };

  useEffect(() => {
    vendorStaff();
  }, []);




  return (
    <div>Vendor Staff</div>
  );
}

export default VendorStaff;
