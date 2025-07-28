"use client";
import React, { useState } from 'react';
import OptionItem from '../optionpage/OptionItem';

interface Option {
    icon: string;
    name: string;
    author?: string;
    pagepath: string;
}

interface PageDropdownProps {
    options: Option[];
}

function PageDropdown({ options }: PageDropdownProps) {
    const [selected, setSelected] = useState<string>('');

    if (!options) return null; // 👈 safety check


    return (
        <div className="space-y-3 w-full max-w-xs mx-auto">
            {options.map((opt, idx) => (
                <OptionItem
                    key={idx}
                    icon={opt.icon}
                    name={opt.name}
                    author={opt.author}
                    pagepath={opt.pagepath}
                    isSelected={selected === opt.name}
                    onClick={() => setSelected(opt.name)}
                />
            ))}
        </div>
    );
}

export default PageDropdown;
