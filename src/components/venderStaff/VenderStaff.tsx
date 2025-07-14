"use client";
import React, { useEffect, useState } from 'react';
import { apiUrl } from "@/utils/config";
import { Pencil, EyeIcon } from "@/icons/index"; 

function VendorStaff() {
  const [vendor, setVendor] = useState([]);

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
        setVendor(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch vendor staff list:", error);
    }
  };

  useEffect(() => {
    vendorStaff();
  }, []);




  return (
    <>
            <div className="flex justify-between items-center p-10 bg-gradient-to-b from-[#EEEDF4] to-[#DBDAE5] rounded-t-2xl">
          <h1 className="text-4xl uppercase text-gray-700 pb-2 font-bold ">
            <span className="text-[#2143BE] border-b-4 border-red-500">All</span> Staff
          </h1>
          <button
            
            className="bg-[#2143BE] text-white text-2xl px-4 py-2 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
          >
            <Pencil />
          </button>
        </div>
        {/* header end */}
<ul className="space-y-4  p-4 pt-4">
  {vendor.length > 0 ? (
    vendor.map((vendorStaff) => {
      const staff = vendorStaff.attributes || {};
      return (
        <li
          key={staff.id}
            className="flex justify-between items-center border-b border-[#2143BE] py-5 px-4 shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300 rounded-2xl"
        >
          <div className="flex items-center space-x-4">
            <img
              src={`https://ui-avatars.com/api/?name=${staff.name}&background=random`}
              alt={staff.name}
              width={40}
                height={40}
              className="rounded-full"
            />
              <div>
                <p className="font-semibold">{staff.name}</p>
                <p className="text-sm text-gray-500">{staff.staffType}</p>
              </div>
          </div>
            <div className="flex gap-2">
              <button
                className="bg-[#2143BE] text-white px-3 py-1 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
              >
                <EyeIcon />
              </button>
            </div>
        </li>
      );
    })
  ) : (
    <p>No staff found</p>
  )}
</ul>

    </>
  );
}

export default VendorStaff;

