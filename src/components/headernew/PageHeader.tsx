'use client';
import React, { useEffect, useState } from 'react';
import PageDropdown from '../ui/pagedropdown/pagedropdown';
import TextHeading from '../ui/textheader/TextHeader';
import { apiUrl } from "@/utils/config";
import { RipleLoader } from '../ui/loading/ripleloader';
import { useRouter } from 'next/navigation';
import { Table, TableRow, TableHeader, TableCell, TableBody } from '../ui/table';
import { EyeIcon, PencilIcon } from '@/icons';


interface PageOption {
    headerfooterid: number;
    icon: string;
    name: string;
    author?: string;
    published?: boolean;
    clientsidelibs?: string;
    pagepath?: string;
    onClick: () => void;
}

function PageHeader() {
    const [options, setOptions] = useState<PageOption[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('jwt');
            try {
                const res = await fetch(`${apiUrl}/api/headerfooters`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const json = await res.json();
                const formatted = json?.data?.map((item: any) => ({
                    icon: '📄',
                    headerfooterid: item.id,
                    name: item.attributes.name,
                    author: item.attributes.author || 'Unknown',
                    published: item.attributes.published,
                    clientsidelibs: item.attributes.clientsidelibs || 'N/A',
                    pagepath: item.attributes.pagepath,
                    onClick: () => router.push('/admin/createheader')
                }));

                setOptions(formatted);
            } catch (error) {
                console.error('Failed to fetch:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);

    return (
        <div >
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="Header/Footer"
                    icon="📑"
                    buttonprops={{
                        buttonText: "+",
                        title: "Create New Header/Footer",
                        content: "Add custom header/footer with unique designs to enhance your user experience.",
                        onClick: () => router.push('/admin/createheader'),
                    }}
                />
            </div>
            <div className="space-y-3 w-full mx-auto">
                {loading ? (
                    Array(options.length || 3).fill(undefined).map((_, index) => (
                        <div key={index} className="mx-auto border p-4">
                            <div className="flex animate-pulse space-x-4">
                                <div className="size-10 rounded-full bg-gray-200"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 rounded bg-gray-200"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                                            <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                                        </div>
                                        {/* <div className="h-2 rounded bg-gray-200"></div> */}
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
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                H/F Name
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Published
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                HF ID
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                Client-side Libs
                                            </TableCell>
                                            <TableCell
                                                isHeader
                                                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                            >
                                                <PencilIcon className="w-4 h-4 text-blue-500" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                        {options.map((opt, idx) => (
                                            <TableRow key={idx} >
                                                <TableCell className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-14 h-14">
                                                            <img
                                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(opt.name)}&background=random&color=fff`}
                                                                alt={opt.name}
                                                                className="rounded-xl object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-800 text-sm">
                                                                {opt.name}
                                                            </div>
                                                            <div className="text-xs text-gray-500">{opt.author}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 ps-8 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <span
                                                        className={`inline-block w-3 h-3 rounded-full ${opt.published ? 'bg-green-500' : 'bg-red-500'
                                                            }`}
                                                    ></span>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    {opt.headerfooterid}
                                                </TableCell>
                                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <div className="truncate">
                                                        {opt.clientsidelibs && opt.clientsidelibs.length > 10
                                                            ? `${opt.clientsidelibs.slice(0, 17)}...`
                                                            : opt.clientsidelibs || 'N/A'}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                    <PencilIcon className="w-4 h-4 text-blue-500" />
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

export default PageHeader;
