'use client';
import React, { useEffect, useState } from 'react';
import PageDropdown from '../ui/pagedropdown/pagedropdown';
import TextHeading from '../ui/textheader/TextHeader';
import { apiUrl } from "@/utils/config";
import { RipleLoader } from '../ui/loading/ripleloader';
import { useRouter } from 'next/navigation';


interface PageOption {
    headerfooterid: number;
    icon: string;
    name: string;
    author?: string;
    published?: boolean;
    clientsidelibs?: number;
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
        <div className='border-2 border-gray-200 dark:border-gray-700 rounded-lg pb-2 shadow-sm space-y-4'>
            <TextHeading title='Header' buttonprops={{
                buttonText: "+",
                title: "Create New Header/Footer",
                content: "Add custom header/footer with unique designs to enhance your user experience.",
                onClick: () => router.push('/admin/createheader'), 
            }} />
            <div className="space-y-3 w-full px-8 mx-auto">
                {loading ? (
                    Array(options.length || 3).fill(undefined).map((_, index) => (
                        <div key={index} className="mx-auto  rounded-xl border p-4">
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
                    <div className="space-y-10 w-full mb-10 mx-auto">
                        <PageDropdown options={options} tableNames={{
                            T1: "Header Name",

                            T3: "Author",
                            T5: "Published",
                            T6: "HF ID",
                            T7: "Edit"
                        }} />

                    </div>
                )}
            </div>

        </div>
    );
}

export default PageHeader;
