'use client';
import React from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';

function FinishPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4">
        <TextHeading title="✅ Page Published" />
      </div>

      {/* Success Box */}
      <div className="my-6 p-6 rounded-xl border shadow bg-white text-center space-y-4">
        <h2 className="text-2xl font-semibold text-green-700">🎉 Your page is live!</h2>
        <p className="text-gray-600">
          Congratulations! Your page has been successfully published.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <a
            href="https://example.com/my-page"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          >
            🔗 View Live Page
          </a>
        </div>
      </div>
    </div>
  );
}

export default FinishPage;
