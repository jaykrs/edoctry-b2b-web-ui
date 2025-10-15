'use client';
import React, { useEffect, useState } from 'react';
import PageDropdown from '../ui/pagedropdown/pagedropdown';
import TextHeading from '../ui/textheader/TextHeader';
import { apiUrl } from "@/utils/config";
import AssignedToSelect from '../ui/optionpage/OptionItem1';
import { RipleLoader } from '../ui/loading/ripleloader';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import { PencilIcon } from '@/icons';



interface PageOption {
  id: number;
  icon: string;
  name: string;
  author?: string;
  pagepath: string;
  type?: string;
  published?: boolean;
  headerfooterid?: number;
  onClick: () => void;
}

function PageBody() {
  const [options, setOptions] = useState<PageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem('jwt');
      try {
        const res = await fetch(`${apiUrl}/api/pages`, {
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
          id: item.id,
          icon: '📄',
          name: item.attributes.name,
          author: item.attributes.author || 'Unknown',
          pagepath: item.attributes.pagepath,
          type: item.attributes.type || 'Default',
          published: item.attributes.published || false,
          headerfooterid: item.attributes.headerfooterid || 'N/A',
          onClick: () => router.push('/admin/createpage')
        }));

        setOptions(formatted);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      };
    };
    fetchData();
  }, []);



  return (
    <div >
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Pages"
          icon="📑"
          buttonprops={{
            buttonText: "+",
            title: "Create New Page",
            content: "Add custom pages with unique designs to enhance your user experience.",
            onClick: () => router.push('/admin/createpage'),
          }}
        />
      </div>
      <div className="space-y-3 w-full mx-auto">
        {loading ? (
          Array(options.length || 4).fill(undefined).map((_, index) => (
            <div key={index} className="mx-auto w-full rounded-xl border p-4">
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
          // <div className="justify-center items-center flex h-64">
          //     <RipleLoader />
          // </div>
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
                        Page
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Page Path
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Type
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
                        Edit
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {options.map((opt, idx) => (
                      <TableRow key={idx}>
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
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {opt.pagepath}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {opt.type}
                        </TableCell>
                        <TableCell className="px-5 py-4 ps-8 whitespace-nowrap">
                          <span
                            className={`w-3 h-3 rounded-full inline-block ${opt.published ? "bg-green-500" : "bg-red-500"
                              }`}
                          />
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {opt.headerfooterid}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <button
                            onClick={() => router.push(`/admin/editpage?pid=${opt.id}`)}
                            onClickCapture={() => console.log("Edit page", opt.id)}
                            title="Edit Page"
                          >
                            <PencilIcon className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          // <div className="space-y-10 w-full mb-10 mx-auto">
          //   <PageDropdown options={options} tableNames={{
          //     T1: "Page",
          //     T2: "Page Path",
          //     T3: "Author",
          //     T4: "Type",
          //     T5: "Published",
          //     T6: "HF ID",
          //     T7: "Edit"
          //   }} />

          // </div>
        )}
      </div>
    </div>
  );

}

export default PageBody;
