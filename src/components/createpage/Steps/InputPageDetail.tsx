import React, { useState, useEffect, useRef } from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';
import { apiUrl } from '@/utils/config';
type InputPageDetailProps = {
  onNext: () => void;
  data: any;
  onChange: (newData: Partial<InputPageDetailProps['data']>) => void;
};

function InputPageDetail({ onNext, data, onChange }: InputPageDetailProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [headerFooters, setHeaderFooters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (formRef.current) {
      if (formRef.current.checkValidity()) {
        setIsSaved(true); // Save success → button changes to Next
      } else {
        formRef.current.reportValidity(); // Show validation messages
      }
    }
  };

  const handleNext = () => {
    if (isSaved) {
      onNext();
    }
  };

  useEffect(() => {
    const fetchHeaderFooters = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("jwt");
        const res = await fetch(`${apiUrl}/api/headerfooters`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await res.json();
        setHeaderFooters(result.data || []);
      } catch (error) {
        console.error("Error fetching header/footers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeaderFooters();
  }, []);

  useEffect(() => {
    const staffData = localStorage.getItem("staffData");
    if (staffData) {
      const parsed = JSON.parse(staffData);
      const staffName = parsed?.data?.[0]?.attributes?.name;
      if (staffName) {
        onChange({ author: staffName }); // default author set
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading title="📝 Page Details" />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity()) {
              onNext();
            } else {
              form.reportValidity();
            }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className='p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Enter page name"
                value={data.name || ""}
                onChange={(e) => onChange({ name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Page Path */}
            <div className='p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Page Path <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="/example-path"
                value={data.slug || ""}
                onChange={(e) => onChange({ slug: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Author */}
            <div className='p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Author</label>
              <input
                type="text"
                placeholder={data.author || ""}
                value={data.author || ""}
                readOnly
                onChange={(e) => onChange({ author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
            </div>

            {/* Type */}
            <div className='p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Type <span className="text-red-500">*</span></label>
              <select
                value={data.type || ""}
                onChange={(e) => onChange({ type: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select type</option>
                <option value="landing">Landing Page</option>
                <option value="blog">Blog Post</option>
                <option value="product">Product Page</option>
              </select>
            </div>

            {/* 🔹 Header/Footer Dropdown (NEW) */}
            <div className='p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Header/Footer <span className="text-red-500">*</span></label>
              <select
                value={data.headerfooterid || ""}
                onChange={(e) => onChange({ headerfooterid: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Header/Footer</option>
                {loading ? (
                  <option>Loading...</option>
                ) : (
                  headerFooters.map((hf) => (
                    <option key={hf.id} value={hf.id}>
                      {hf.attributes?.name || `HeaderFooter ${hf.id}`}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Menu */}
            <div className='p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Menu </label>
              <input
                type="text"
                placeholder="e.g., Main Menu"
                value={data.menu || ""}
                onChange={(e) => onChange({ menu: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* SEO */}
            <div className='md:col-span-2 p-4'>
              <label className="block text-sm font-semibold text-gray-800 mb-1">SEO</label>
              <textarea
                rows={4}
                placeholder="Keywords, tags, etc."
                value={data.seo || ""}
                onChange={(e) => onChange({ seo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              ></textarea>
            </div>

            {/* Metadata */}
            <div className="md:col-span-2 p-4">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Metadata</label>
              <textarea
                rows={4}
                placeholder='{"key":"value"}'
                value={data.metadata || ""}
                onChange={(e) => onChange({ metadata: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              ></textarea>
            </div>
          </div>
          {/* input field end */}
          <div className="border-t w-full bg-white px-6 py-4 flex justify-end items-center">
            {
              !isSaved ? (
                <button
                  type="submit"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
                >
                  Save & Next →
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
                >
                  Next →
                </button>
              )
            }
          </div>
        </form>
      </div>

      {/* Button */}

    </div>
  );
}

export default InputPageDetail;
