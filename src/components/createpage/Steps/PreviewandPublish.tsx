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
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewWidth, setPreviewWidth] = useState('100%');


  // 🔹 Fetch header/footer HTML
  useEffect(() => {
    const fetchHeaderFooter = async () => {
      if (!data?.headerfooterid) return;

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
        setLoading(false);
      }
    };

    fetchHeaderFooter();
  }, [data?.headerfooterid]);

  // 🔹 Parse external libs
  let libs: string[] = [];
  try {
    if (typeof clientsideLibs === 'string') {
      if (clientsideLibs.trim().startsWith('[')) {
        libs = JSON.parse(clientsideLibs);
      } else {
        libs = clientsideLibs.split(',').map((lib) => lib.trim());
      }
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


  // metadata

  let metadata = {};

  try {
    metadata =
      typeof data?.metadata === "string"
        ? JSON.parse(data.metadata)
        : data.metadata || {};
  } catch (e) {
    console.error("❌ Invalid metadata JSON");
  }


  const generateMetaTags = (metadata: any) => {
    return Object.entries(metadata)
      .map(([key, value]) => {
        if (key.startsWith("og:")) {
          return `<meta property="${key}" content="${value}" />`;
        }
        return `<meta name="${key}" content="${value}" />`;
      })
      .join("\n");
  };

  const metaTags = generateMetaTags(metadata);

  // 🔹 Final HTML for preview
  const finalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${data?.name || 'Web Page'}</title>
${metaTags}
  <!-- Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />

  <!-- External CSS Libraries -->
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

  // Publish to FTP server
  const publishToFtp = async () => {
    const token = localStorage.getItem("jwt");
    const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
    const ftpUser = staffData?.data?.[0]?.attributes?.ftp;
    const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;

    try {

      // Save to database 
      const dbRes = await fetch(`${apiUrl}/api/pages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            ...data,
            vendoruuid: vendoruuid
          }
        })
      });

      if (!dbRes.ok) {
        alert("Database save failed");
        return;
      }

      //publish to FTP
      const ftpRes = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          htmlContent: finalHtml,
          ftpUser,
          pageName: data?.name,
          path : data?.pagepath
        })
      });

      if (!ftpRes.ok) {
        alert("FTP publish failed");
        return;
      }

      // 🔹 3. Go to finish page
      onNext();

    } catch (err) {
      console.error("Publish error:", err);
    }
  };



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
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <TextHeading title="🚀 Preview & Publish" />
      </div>

      {/* Preview Section */}
      <div className="flex-1 overflow-x-hidden p-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="flex justify-end  ">
            <HoverPopover
              buttonText="📱"
              title="Mobile Preview"
              content="Click to see a live preview of your page in mobile view."
              onClick={() => setPreviewWidth('375px')}
            />
            <HoverPopover
              buttonText="📲"
              title="Tablet Preview"
              content="Click to see a live preview of your page."
              onClick={() => setPreviewWidth('768px')}
            />
            <HoverPopover
              buttonText="🖥"
              title="Desktop Preview"
              content="Click to see a live preview of your page in desktop view."
              onClick={() => setPreviewWidth('100%')}
            />
            <HoverPopover
              buttonText="⛶"
              title="Preview your changes"
              content="Click to see a live preview of your page."
              onClick={setFullscreen}
            />
          </div>

          {loading ? (
            <p className="text-gray-600">Loading header/footer...</p>
          ) : finalHtml.trim() ? (
            <div className="w-full h-80vh flex justify-center items-start bg-black">
              <iframe
                style={{ width: previewWidth, height: '100vh' }}
                className="h-full bg-white border rounded-md shadow-xl"
                srcDoc={finalHtml}
              />
            </div>
          ) : (
            <p className="text-gray-600">No preview available. Please design your page first.</p>
          )}
        </div>
      </div>

      {/* Footer Action Box */}
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
            onClick={publishToFtp}
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition shadow"
          >
            Publish 🚀
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div
          id="preview-container"
          className="fixed inset-0 z-50 bg-black bg-opacity-80"
        >
          <div className="w-full h-full relative">

            {/* 👉 Perfect Fullscreen Center */}
            <div className="w-full h-full flex justify-center items-center overflow-hidden">
              <iframe
                style={{ width: previewWidth, height: '100%' }}
                className="bg-white border rounded-lg shadow-2xl"
                srcDoc={finalHtml}
              />
            </div>

            {/* 👉 Bottom Controls */}
            <div className="flex justify-center gap-4 bg-white/20 backdrop-blur absolute bottom-4 w-full p-4">
              <button
                onClick={() => setPreviewWidth('375px')}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                📱 Mobile
              </button>
              <button
                onClick={() => setPreviewWidth('768px')}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                📲 Tablet
              </button>
              <button
                onClick={() => setPreviewWidth('100%')}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                🖥 Desktop
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewAndPublish;
