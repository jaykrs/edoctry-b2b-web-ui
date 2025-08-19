"use client";
import React, { useState } from "react";
import OptionItem from "../optionpage/OptionItem";

interface Option {
  icon: string;
  name: string;
  author?: string;
  pagepath?: string;
  type?: string;
  published?: boolean;
  headerfooterid?: number;
  clientsidelibs?: number;
  onClick: () => void;
}
interface tableName {
  T1?: string;
  T2?: string;
  T3?: string;
  T4?: string;
  T5?: string;
  T6?: string;
  T7?: string;
}

interface PageDropdownProps {
  options: Option[];
  tableNames: tableName;
}

function PageDropdown({ options, tableNames }: PageDropdownProps) {
  const [selected, setSelected] = useState<string>("");
  console.log(options);

  if (!options || options.length === 0) return null;

  return (
    <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900 overflow-hidden">
      {/* ✅ Static Header Here */}
      <div className="flex items-center justify-between font-semibold text-gray-500 text-sm border-b py-6 mb-2 px-4 dark:text-gray-400">
        <div className="w-1/5">{tableNames.T1}</div>
        <div className="w-1/5">{tableNames.T2}</div>
        <div className="w-1/5">{tableNames.T3}</div>
        <div className="w-1/5">{tableNames.T4}</div>
        <div className="w-1/5">{tableNames.T5}</div>
        <div className="w-1/5">{tableNames.T6}</div>
        <div className="w-1/5 text-right">{tableNames.T7}</div>
      </div>

      {/* ✅ Dynamic Rows */}
      {options.map((opt, idx) => (
        <OptionItem
          key={idx}
          icon={opt.icon}
          name={opt.name}
          author={opt.author}
          pagepath={opt.pagepath ?? ""}
          type={opt.type}
          published={opt.published }
          headerfooterId={opt.headerfooterid}
          onClick={opt.onClick}
        />
      ))}
    </div>
  );
}

export default PageDropdown;
