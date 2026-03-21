'use client';
import React, { useEffect, useState } from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';

interface FinishPageProps {
  data: any;
  pageName: string;
  pagePath: string;
}

function FinishPage({ pageName, pagePath }: FinishPageProps) {

  const [website, setWebsite] = useState("");

  useEffect(() => {
    const staffDataRaw = localStorage.getItem("staffData");
    if (!staffDataRaw) return;

    const parsed = JSON.parse(staffDataRaw);
    const site = parsed?.data?.[0]?.attributes?.website;

    if (site) {
      setWebsite(site);
    }
  }, []);
const liveUrl =
  website && pageName
    ? pagePath
      ? `${website}/${pagePath}/${pageName}.html`
      : `${website}/${pageName}.html`
    : "";

  return (
    <div className="w-full">
      <div className="border-b bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4">
        <TextHeading title="✅ Page Published" />
      </div>

      <div className="my-6 p-6 rounded-xl border shadow bg-white text-center space-y-4">
        <h2 className="text-2xl font-semibold text-green-700">
          🎉 Your page is live!
        </h2>

        {liveUrl ? (
          <>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all block"
            >
              {liveUrl}
            </a>

            <button
              onClick={() => window.open(liveUrl, "_blank")}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow"
            >
              🔗 Open Live Page
            </button>
          </>
        ) : (
          <div className="text-red-500">
            Live URL not available
          </div>
        )}
      </div>
    </div>
  );
}

export default FinishPage;
