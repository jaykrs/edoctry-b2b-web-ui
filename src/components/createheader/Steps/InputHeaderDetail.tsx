import React, { useState, useEffect, useRef } from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';

type InputHeaderDetailProps = {
  data: {
    name: string;
    clientsidelibs: string;
    author: string;
    published: boolean;
    header_footer_json: any;
  };
  onChange: (newData: Partial<InputHeaderDetailProps['data']>) => void;
  onNext: () => void;
};

function InputHeaderDetail({ data, onChange, onNext }: InputHeaderDetailProps) {
  const formRef = useRef<HTMLFormElement>(null);

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
        <TextHeading title="📝 Header Details" />
      </div>

      {/* Form */}
      <div className="flex-1 ">
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
          className="flex-1 flex flex-col" 
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder="Enter Header name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* clientsidelibs */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Client-Side Libraries</label>
              <input
                type="text"
                value={data.clientsidelibs}
                onChange={(e) => onChange({ clientsidelibs: e.target.value })}
                placeholder="1.0.0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Author<span className="text-red-500">*</span></label>
              <input
                type="text"
                onChange={(e) => onChange({ author: e.target.value })}
                placeholder={data.author || ""}
                value={data.author || ""}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
            </div>

            {/* Publish */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Publish</label>
              <select
                value={data.published ? 'yes' : 'no'}
                onChange={(e) => onChange({ published: e.target.value === 'yes' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Publish</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* header_footer_json */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Header JSON</label>
              <textarea
                rows={4}
                value={JSON.stringify(data.header_footer_json, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    onChange({ header_footer_json: parsed });
                  } catch {
                  }
                }}
                placeholder={`{\n  "key": "value"\n}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono"
              ></textarea>
            </div>
          </div>

          {/* input field end */}
          <div className="border-t mt-auto w-full bg-white px-6 py-4 flex justify-end items-center">
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
      {/* <div className="border-t bg-white px-6 py-4 flex justify-end items-center">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Next →
        </button>
      </div> */}
    </div>
  );
}

export default InputHeaderDetail;
