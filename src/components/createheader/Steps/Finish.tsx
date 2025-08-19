"use client";
import React, { useState } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";

function FinishPage({ onPublish }: { onPublish: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = async () => {
    try {
      setLoading(true);
      await onPublish(); // ✅ parent se aayi API call
      setPublished(true);
    } catch (err) {
      console.error("❌ Error publishing:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4">
        <TextHeading title="Finish & Publish" />
      </div>

      {/* Before Publish */}
      {!published && (
        <div className="my-6 p-6 rounded-xl border shadow bg-white text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            🚀 Ready to publish your page?
          </h2>
          <p className="text-gray-600">
            Click below to publish and make your page live.
          </p>

          <button
            onClick={handlePublish}
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white shadow transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Publishing..." : "Publish Page"}
          </button>
        </div>
      )}

      {/* After Publish */}
      {published && (
        <div className="my-6 p-6 rounded-xl border shadow bg-white text-center space-y-4">
          <h2 className="text-2xl font-semibold text-green-700">
            🎉 Your page is live!
          </h2>
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
      )}
    </div>
  );
}

export default FinishPage;
