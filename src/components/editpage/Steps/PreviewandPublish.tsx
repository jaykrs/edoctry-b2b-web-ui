"use client";
import React, { useEffect, useState } from "react";
import TextHeading from "@/components/ui/textheader/TextHeader";
import HoverPopover from "@/components/ui/popupbutton/HoverPopover";
import { apiUrl } from "@/utils/config";

interface Props {
  data: any;
  onBack: () => void;
  onPublish: () => void;
}

const PreviewAndPublish: React.FC<Props> = ({
  data,
  onBack,
  onPublish,
}) => {

  const [headerHtml, setHeaderHtml] = useState("");
  const [footerHtml, setFooterHtml] = useState("");
  const [clientsideLibs, setClientsideLibs] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewWidth, setPreviewWidth] = useState("100%");
  const [showModal, setShowModal] = useState(false);

  // fetch header/footer
  useEffect(() => {
    const fetchHeaderFooter = async () => {

      if (!data?.headerfooterid) {
        setLoading(false);
        return;
      }

      try {

        const token = localStorage.getItem("jwt");

        const res = await fetch(
          `${apiUrl}/api/headerfooters/${data.headerfooterid}?populate=*`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        const result = await res.json();
        const attrs = result?.data?.attributes || {};

        setHeaderHtml(attrs?.header_html_element || "");
        setFooterHtml(attrs?.footer_html_element || "");
        setClientsideLibs(attrs?.clientsidelibs || "");

      } catch (err) {

        console.error("Header/footer error:", err);

      } finally {

        setLoading(false);

      }
    };
    fetchHeaderFooter();

  }, [data?.headerfooterid]);

  // parse client libs
  let libs: string[] = [];

  try {
    if (typeof clientsideLibs === "string") {

      libs = clientsideLibs.trim().startsWith("[")
        ? JSON.parse(clientsideLibs)
        : clientsideLibs.split(",").map((lib) => lib.trim());

    }
  } catch (e) {
    console.error("client libs parse error:", e);
  }

  const cssTags = libs
    .filter((lib) => lib.endsWith(".css"))
    .map((link) => `<link rel="stylesheet" href="${link}" />`)
    .join("\n");

  const jsTags = libs
    .filter((lib) => lib.endsWith(".js"))
    .map((src) => `<script src="${src}"></script>`)
    .join("\n");

  // build final HTML
  const finalHtml = `

<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${data?.name || "Web Page"}</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"/>

${cssTags}

<style>
${data?.pagecss || ""}
</style>

</head>

<body>

${headerHtml}

${data?.page_html_body || ""}

${footerHtml}

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

${jsTags}

</body>
</html>
`;

  // publish FTP
  const publishToFtp = async () => {
    const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
    const ftpUser = staffData?.data?.[0]?.attributes?.ftp;

    if (!ftpUser) {
      alert("Missing FTP info");
      return;
    }

    const res = await fetch("/api/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        htmlContent: finalHtml,
        ftpUser,
        pageName: data?.name
      })
    });

    if (!res.ok) {
      alert("FTP publish failed");
      return;
    }

    onPublish();
  };

  const setFullscreen = () => setShowModal(true);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
        <TextHeading title="🚀 Preview & Publish" />
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-x-hidden p-4">

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">

          {/* Device controls */}
          <div className="flex justify-end gap-2 mb-3">

            <HoverPopover
              buttonText="📱"
              title="Mobile Preview"
              content="Preview in mobile view"
              onClick={() => setPreviewWidth("375px")}
            />

            <HoverPopover
              buttonText="📲"
              title="Tablet Preview"
              content="Preview in tablet view"
              onClick={() => setPreviewWidth("768px")}
            />

            <HoverPopover
              buttonText="🖥"
              title="Desktop Preview"
              content="Preview in desktop view"
              onClick={() => setPreviewWidth("100%")}
            />

            <HoverPopover
              buttonText="⛶"
              title="Fullscreen Preview"
              content="Fullscreen preview"
              onClick={setFullscreen}
            />

          </div>

          {/* Preview iframe */}
          {loading ? (
            <p className="text-gray-600">Loading header/footer...</p>
          ) : (

            <div className="w-full flex justify-center items-start bg-black rounded-md">

              <iframe
                style={{
                  width: previewWidth,
                  height: "90vh"
                }}
                className="bg-white border rounded-md shadow-xl"
                srcDoc={finalHtml}
              />

            </div>

          )}

        </div>

      </div>

      {/* Action buttons */}
      <div className="my-6 p-6 rounded-xl border shadow bg-white text-center">

        <div className="flex justify-center gap-4">

          <button
            onClick={onBack}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            ← Back
          </button>

          <button
            onClick={publishToFtp}
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Publish 🚀
          </button>

        </div>

      </div>

    </div>
  );
};

export default PreviewAndPublish;
