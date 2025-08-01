'use client';
import React, { useEffect, useState } from 'react';
import PageDropdown from '../ui/pagedropdown/pagedropdown';
import TextHeading from '../ui/textheader/TextHeader';
import { apiUrl } from "@/utils/config";
import { RipleLoader } from '../ui/loading/ripleloader';


interface PageOption {
    icon: string;
    name: string;
    author?: string;
    pagepath: string;
}

function PageHeader({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
    const [options, setOptions] = useState<PageOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
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
                    name: item.attributes.name,
                    author: item.attributes.author || 'Unknown',
                    pagepath: item.attributes.pagepath,
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
        <div className='border-2 border-gray-200 dark:border-gray-700 rounded-lg pb-2 shadow-sm space-y-4'>
            <TextHeading title='Header' />
            <div className="space-y-3 w-full px-8 mx-auto">
                {loading ? (
                    // Array(options.length || 3).fill(undefined).map((_, index) => (
                    //     <div key={index} className="mx-auto w-80 max-w-sm rounded-xl border p-4">
                    //         <div className="flex animate-pulse space-x-4">
                    //             <div className="size-10 rounded-full bg-gray-200"></div>
                    //             <div className="flex-1 space-y-6 py-1">
                    //                 <div className="h-2 rounded bg-gray-200"></div>
                    //                 <div className="space-y-3">
                    //                     <div className="grid grid-cols-3 gap-4">
                    //                         <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                    //                         <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    //                     </div>
                    //                     {/* <div className="h-2 rounded bg-gray-200"></div> */}
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </div>
                    // ))
                    <div className="justify-center items-center flex h-64">
                        <RipleLoader />
                    </div>
                ) : (
                    <div className="space-y-10 w-full mb-10 mx-auto">
                        <PageDropdown options={options} nameformat={{
                            label: "Header",
                            labelname: "Select a header*",
                            optionname: "Choose a header"
                        }} />
                        <PageDropdown options={options} nameformat={{
                            label: "Footer",
                            labelname: "Select a footer*",
                            optionname: "Choose a footer"
                        }} />
                    </div>
                )}
            <button
                onClick={onNext}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Next
            </button>
            <button
                onClick={onBack}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded ml-2"
            >
                Back
            </button>
            </div>

        </div>
    );
}

export default PageHeader;
