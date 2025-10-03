// "use client";
// import { ApexOptions } from "apexcharts";
// import dynamic from "next/dynamic";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { MoreDotIcon } from "@/icons";
// import { useState, useEffect } from "react";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { apiUrl } from "@/utils/config";

// // Dynamically import the ReactApexChart component
// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// export default function MonthlyTarget() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [targetPercentage, setTargetPercentage] = useState(0);
//   const [growthPercentage, setGrowthPercentage] = useState(0);
//   const [series, setSeries] = useState<number[]>([0]);

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   function closeDropdown() {
//     setIsOpen(false);
//   }

//   useEffect(() => {
//     fetchStudentList();
//   }, []);

//   const fetchStudentList = async () => {
//     try {
//       const staffDataString = localStorage.getItem("staffData");
//       const staffData = staffDataString ? JSON.parse(staffDataString) : null;
//       const jwt = localStorage.getItem("jwt");
//       const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

//       if (vendorid && jwt) {
//         const res = await fetch(
//           `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${jwt}`,
//             },
//           }
//         );

//         const data = await res.json();

//         const now = new Date();
//         const currentMonth = now.getMonth();
//         const currentYear = now.getFullYear();

//         let currentMonthCount = 0;
//         let nextMonthCount = 0;

//         data.data.forEach((student: any) => {
//           const createdAt = student.attributes.createdAt;
//           const date = new Date(createdAt);

//           if (date.getFullYear() === currentYear) {
//             if (date.getMonth() === currentMonth) {
//               currentMonthCount++;
//             }
//             if (date.getMonth() === currentMonth + 1) {
//               nextMonthCount++;
//             }
//           }
//         });

//         const monthlyTarget = 100;
//         const percentage = Math.min(
//           Math.round((currentMonthCount / monthlyTarget) * 100),
//           100
//         );

//         const growth = currentMonthCount === 0
//           ? 100
//           : Math.round(((nextMonthCount - currentMonthCount) / currentMonthCount) * 100);

//         setTargetPercentage(percentage);
//         setGrowthPercentage(growth);
//         setSeries([percentage]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch student list:", error);
//     }
//   };

//   const options: ApexOptions = {
//     colors: ["#465FFF"],
//     chart: {
//       fontFamily: "Outfit, sans-serif",
//       type: "radialBar",
//       height: 330,
//       sparkline: {
//         enabled: true,
//       },
//     },
//     plotOptions: {
//       radialBar: {
//         startAngle: -85,
//         endAngle: 85,
//         hollow: {
//           size: "80%",
//         },
//         track: {
//           background: "#E4E7EC",
//           strokeWidth: "100%",
//           margin: 5,
//         },
//         dataLabels: {
//           name: {
//             show: false,
//           },
//           value: {
//             fontSize: "36px",
//             fontWeight: "600",
//             offsetY: -40,
//             color: "#1D2939",
//             formatter: function (val) {
//               return val + "%";
//             },
//           },
//         },
//       },
//     },
//     fill: {
//       type: "solid",
//       colors: ["#465FFF"],
//     },
//     stroke: {
//       lineCap: "round",
//     },
//     labels: ["Progress"],
//   };

//   return (
//     <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
//       <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
//         <div className="flex justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//               Monthly Target
//             </h3>
//             <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
//               Target you’ve set for each month
//             </p>
//           </div>
//           <div className="relative inline-block">
//             <button onClick={toggleDropdown} className="dropdown-toggle">
//               <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
//             </button>
//             <Dropdown
//               isOpen={isOpen}
//               onClose={closeDropdown}
//               className="w-40 p-2"
//             >
//               <DropdownItem
//                 tag="a"
//                 onItemClick={closeDropdown}
//                 className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//               >
//                 View More
//               </DropdownItem>
//               <DropdownItem
//                 tag="a"
//                 onItemClick={closeDropdown}
//                 className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//               >
//                 Delete
//               </DropdownItem>
//             </Dropdown>
//           </div>
//         </div>
//         <div className="relative">
//           <div className="max-h-[330px]">
//             <ReactApexChart
//               options={options}
//               series={series}
//               type="radialBar"
//               height={330}
//             />
//           </div>

//           <span className={`absolute mt-12 left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium ${growthPercentage >= 0
//               ? "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500"
//               : "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500"
//             }`}>
//             {growthPercentage >= 0 ? "+" : ""}
//             {growthPercentage}%
//           </span>
//         </div>
//         <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
//           You added {Math.round((targetPercentage * 100) / 100)} students this month, it's compared to your target.
//         </p>
//       </div>

//       <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
//         <div>
//           <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
//             Target
//           </p>
//           <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
//             100
//           </p>
//         </div>

//         <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

//         <div>
//           <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
//             Revenue
//           </p>
//           <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
//             20K
//           </p>
//         </div>

//         <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

//         <div>
//           <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
//             Today
//           </p>
//           <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
//             2K
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { MoreDotIcon } from "@/icons";
import { useState, useEffect } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { apiUrl } from "@/utils/config";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetPercentage, setTargetPercentage] = useState(0);
  const [growthPercentage, setGrowthPercentage] = useState(0);
  const [series, setSeries] = useState<number[]>([0]);
  const [options, setOptions] = useState<ApexOptions>({
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              const monthlyTarget = 100;
              const percentage = Math.min(Math.round((val / monthlyTarget) * 100), 100);
              return percentage + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  });

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const jwt = localStorage.getItem("jwt");
      const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (vendorid && jwt) {
        const res = await fetch(
          `${apiUrl}/api/students?filters[vendoruuid][$eq]=${vendorid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const data = await res.json();

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        let currentMonthCount = 0;
        let nextMonthCount = 0;

        data.data.forEach((student: any) => {
          const createdAt = student.attributes.createdAt;
          const date = new Date(createdAt);

          if (date.getFullYear() === currentYear) {
            if (date.getMonth() === currentMonth) {
              currentMonthCount++;
            }
            if (date.getMonth() === currentMonth + 1) {
              nextMonthCount++;
            }
          }
        });

        const monthlyTarget = 100;
        const percentage = Math.min(
          Math.round((currentMonthCount / monthlyTarget) * 100),
          100
        );

        const growth =
          currentMonthCount === 0 && nextMonthCount === 0
            ? 0
            : currentMonthCount === 0 && nextMonthCount > 0
              ? 100
              : Math.round(((nextMonthCount - currentMonthCount) / currentMonthCount) * 100);


        setTargetPercentage(percentage);
        setGrowthPercentage(growth);

        // Properly update series after API call
        setSeries([currentMonthCount]);
      }
    } catch (error) {
      console.error("Failed to fetch student list:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Websites Performance
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Perfomance of all websites in {new Date().toLocaleString("default", { month: "long" })}
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div className="relative">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className={`absolute mt-12 left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium ${growthPercentage >= 0
            ? "bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500"
            : "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500"
            }`}>
            {growthPercentage >= 0 ? "+" : ""}
            {growthPercentage}%
          </span>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          You added {series[0]} students this month, it's compared to your target.
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Target
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            100
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Revenue
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            20K
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Today
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            2K
          </p>
        </div>
      </div>
    </div>
  );
}
