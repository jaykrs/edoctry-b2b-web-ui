import React from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';

type InputPageDetailProps = {
  onNext: () => void;
  data: any;
  onChange: (newData: Partial<InputPageDetailProps['data']>) => void;
};

function InputPageDetail({ onNext, data, onChange }: InputPageDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading title="📝 Page Details" />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onNext();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter page name"
              value={data.name || ""}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Page Path */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Page Path</label>
            <input
              type="text"
              placeholder="/example-path"
              value={data.slug || ""}
              onChange={(e) => onChange({ slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Author</label>
            <input
              type="text"
              placeholder="Your name"
              value={data.author || ""}
              onChange={(e) => onChange({ author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Type</label>
            <select
              value={data.type || ""}
              onChange={(e) => onChange({ type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select type</option>
              <option value="landing">Landing Page</option>
              <option value="blog">Blog Post</option>
              <option value="product">Product Page</option>
            </select>
          </div>

          {/* Header/Footer ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Header/Footer ID</label>
            <input
              type="text"
              placeholder="e.g., hf123"
              value={data.header_footer_id || ""}
              onChange={(e) => onChange({ header_footer_id: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Menu */}
          <div>
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
          <div className='md:col-span-2'>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-1">Metadata</label>
            <textarea
              rows={4}
              placeholder='{"key":"value"}'
              value={data.metadata || ""}
              onChange={(e) => onChange({ metadata: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Button */}
      <div className="border-t bg-white px-6 py-4 flex justify-end items-center">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default InputPageDetail;
