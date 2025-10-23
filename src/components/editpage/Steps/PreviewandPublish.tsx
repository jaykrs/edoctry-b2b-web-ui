'use client';
import React, { useEffect, useState } from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';
import { apiUrl } from '@/utils/config';
import HoverPopover from '@/components/ui/popupbutton/HoverPopover';

interface PreviewAndPublishProps {
  onNext: () => void;
  onBack: () => void;
  data: any;
}

const PreviewAndPublish: React.FC<PreviewAndPublishProps> = ({ onNext, onBack, data }) => {
  const [headerHtml, setHeaderHtml] = useState('');
  const [footerHtml, setFooterHtml] = useState('');
  const [clientsideLibs, setClientsideLibs] = useState<string>('');
  const [loading, setLoading] = useState(true); // 👈 default true
  const [showModal, setShowModal] = useState(false);

  // 🔹 Fetch header/footer HTML (with async/await)
  useEffect(() => {
    const fetchHeaderFooter = async () => {
      if (!data?.headerfooterid) {
        setLoading(false);
        return;
      }

      console.log("Fetching header/footer for ID:", data.headerfooterid);
      setLoading(true);

      try {
        const token = localStorage.getItem('jwt');
        const res = await fetch(`${apiUrl}/api/headerfooters/${data.headerfooterid}?populate=*`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const result = await res.json();
        const attrs = result?.data?.attributes || {};

        setHeaderHtml(attrs?.header_html_element || '');
        setFooterHtml(attrs?.footer_html_element || '');
        setClientsideLibs(attrs?.clientsidelibs || '');
      } catch (err) {
        console.error('❌ Error fetching header/footer:', err);
      } finally {
        setLoading(false); // ✅ only stop loading after async call completes
      }
    };

    fetchHeaderFooter();
  }, [data?.headerfooterid]);

  // 🔹 Parse external libs
  let libs: string[] = [];
  try {
    if (typeof clientsideLibs === 'string') {
      libs = clientsideLibs.trim().startsWith('[')
        ? JSON.parse(clientsideLibs)
        : clientsideLibs.split(',').map((lib) => lib.trim());
    } else if (Array.isArray(clientsideLibs)) {
      libs = clientsideLibs;
    }
  } catch (e) {
    console.error('❌ Error parsing clientsideLibs:', e);
  }

  const cssTags = libs
    .filter((lib) => lib.endsWith('.css'))
    .map((link) => `<link rel="stylesheet" href="${link}" />`)
    .join('\n');

  const jsTags = libs
    .filter((lib) => lib.endsWith('.js'))
    .map((src) => `<script src="${src}"></script>`)
    .join('\n');

  // 🔹 Final HTML
  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data?.name || 'Web Page'}</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  ${cssTags}
  <style>${data?.pagecss || ''}</style>
</head>
<body>
  ${headerHtml}
  ${data?.page_html_body || ''}
  ${footerHtml}
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  ${jsTags}
</body>
</html>
`;

  // 🔹 Save HTML file
  const saveFile = async () => {
    try {
      const pageName = data?.name || 'untitled';
      const res = await fetch('/api/saveFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ htmlContent: finalHtml, pageName })
      });

      const response = await res.json();
      alert(response.message);
    } catch (err) {
      console.error('❌ Error saving file:', err);
    }
  };

  // 🔹 Fullscreen preview
  const setFullscreen = () => setShowModal(true);

  useEffect(() => {
    if (!showModal) return;

    const elem = document.getElementById('preview-container');
    if (elem) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if ((elem as any).webkitRequestFullscreen) (elem as any).webkitRequestFullscreen();
      else if ((elem as any).msRequestFullscreen) (elem as any).msRequestFullscreen();
    }

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setShowModal(false);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [showModal]);

  return (
    <div className="w-full">
      <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <TextHeading title="🚀 Preview & Publish" />
      </div>

      <div className="flex-1 overflow-x-hidden p-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <HoverPopover
              buttonText="⛶"
              title="Preview your changes"
              content="Click to see a live preview of your page."
              onClick={setFullscreen}
            />
          </div>

          {/* 👇 Condition added here */}
          {loading ? (
            <p className="text-gray-600">⏳ Loading header/footer...</p>
          ) : headerHtml || footerHtml ? (
            <div
              className="border rounded-md p-3 bg-gray-50"
              dangerouslySetInnerHTML={{ __html: finalHtml }}
            />
          ) : (
            <p className="text-gray-600">
              No preview available. Please design your page first.
            </p>
          )}
        </div>
      </div>

      <div className="my-6 p-6 rounded-xl border shadow bg-white text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">You're ready to go!</h2>
        <p className="text-gray-600">Click the button below to publish your page or go back to make changes.</p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            ← Back
          </button>
          <button
            onClick={saveFile}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow"
          >
            Save File 💾
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition shadow"
          >
            Publish 🚀
          </button>
        </div>
      </div>

      {showModal && (
        <div
          id="preview-container"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        >
          <div className="w-full h-full overflow-auto">
            <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: finalHtml }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewAndPublish;
