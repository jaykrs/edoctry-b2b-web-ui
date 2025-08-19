import React from 'react';
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
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading title="📝 Header Details" />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-4">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Enter Header name"
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
            <label className="block text-sm font-semibold text-gray-800 mb-1">Author</label>
            <input
              type="text"
              value={data.author}
              onChange={(e) => onChange({ author: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                  // invalid JSON, ignore
                }
              }}
              placeholder={`{\n  "key": "value"\n}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-mono"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Button */}
      <div className="border-t bg-white px-6 py-4 flex justify-end items-center">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default InputHeaderDetail;
