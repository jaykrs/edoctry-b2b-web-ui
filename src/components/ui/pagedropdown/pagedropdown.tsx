"use client";
import React, { useState } from "react";

interface Option {
  icon: string;
  name: string;
  author?: string;
  pagepath: string;
}
interface nameFormat {
    label: string;
    labelname: string;
    optionname: string;
}

interface PageDropdownProps {
  options: Option[];
  nameformat: nameFormat;
}

function PageDropdown({ options, nameformat }: PageDropdownProps) {
  const [selected, setSelected] = useState<string>("");

  if (!options || options.length === 0) return null;
  

  return (
    <div className="w-full  mx-auto">
    <label htmlFor={nameformat.label} className="block mb-8 text-sm font-medium text-gray-700">
        {nameformat.labelname}
      </label>
      <select
        id="page-select"
        className="border border-gray-300 rounded-md p-4 w-full"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option   value="" disabled>{nameformat.optionname}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.name}>
            {opt.name} — {opt.pagepath}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageDropdown;
