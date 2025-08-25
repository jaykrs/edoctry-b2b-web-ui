'use client';
import React, { useEffect, useState } from 'react';
import TextHeading from '@/components/ui/textheader/TextHeader';
import { apiUrl } from '@/utils/config';
import HoverPopover from '@/components/ui/popupbutton/HoverPopover';

function PreviewAndPublish({ onNext, onBack, data }: { onNext: () => void; onBack: () => void; data: any }) {
    const [headerHtml, setHeaderHtml] = useState('');
    const [footerHtml, setFooterHtml] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // 🔹 Fetch header/footer HTML based on selected ID
    useEffect(() => {
        const fetchHeaderFooter = async () => {
            if (!data.headerfooterid) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                const res = await fetch(`${apiUrl}/api/headerfooters/${data.headerfooterid}?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await res.json();
                const attrs = result?.data?.attributes || {};
                setHeaderHtml(attrs?.header_html_element || "");
                setFooterHtml(attrs?.footer_html_element || "");
            } catch (err) {
                console.error("Error fetching header/footer:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHeaderFooter();
    }, [data.headerfooterid]);

    // 🔹 Combine header + body + footer
    const finalHtml = `
      <style>
        ${data?.pagecss || ""}
      </style>
      ${headerHtml}
      ${data?.page_html_body || ""}
      ${footerHtml}
    `;

    const setFullscreen = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (showModal) {
            const elem = document.getElementById("preview-container");
            if (elem) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if ((elem as any).webkitRequestFullscreen) {
                    (elem as any).webkitRequestFullscreen();
                } else if ((elem as any).msRequestFullscreen) {
                    (elem as any).msRequestFullscreen();
                }
            }
        }

        // 🔹 Handle fullscreen exit (ESC ya exitFullscreen pe modal band ho)
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setShowModal(false);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, [showModal]);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
                <TextHeading title="🚀 Preview & Publish" />
            </div>

            {/* Preview Section */}
            <div className="flex-1 overflow-auto p-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className='flex justify-between'>
                        <h3 className="text-lg font-semibold mb-2">Preview</h3>
                        <HoverPopover
                            buttonText="⛶"
                            title="Preview your changes"
                            content="Click to see a live preview of your page."
                            onClick={() => setFullscreen()}
                        />
                    </div>
                    {loading ? (
                        <p className="text-gray-600">Loading header/footer...</p>
                    ) : finalHtml.trim() ? (
                        <div
                            className="border rounded-md p-3 bg-gray-50"
                            dangerouslySetInnerHTML={{ __html: finalHtml }}
                        />
                    ) : (
                        <p className="text-gray-600">No preview available. Please design your page first.</p>
                    )}
                </div>
            </div>

            {/* Footer Box */}
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
                        onClick={onNext}
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                >
                    <div className=" rounded-none shadow-lg w-full h-full overflow-auto">
                        <div
                            className="overflow-auto"
                            dangerouslySetInnerHTML={{ __html: finalHtml }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PreviewAndPublish;
