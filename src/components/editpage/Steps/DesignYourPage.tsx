"use client";
import "grapesjs/dist/css/grapes.min.css";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { headerBlocks, generalBlocks, footerBlocks } from "@/data/blocksData";
import { hero } from "@/data/pageBlockData";
import { apiUrl } from "@/utils/config";

interface Props {
  pageId?: string | null;
  onNext?: (data: { page_html_body: string; pagecss: string; headerfooterid: string | null; name: string }) => void;
}

export default function DesignYourPage({ pageId, onNext }: Props) {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [apiBlocks, setApiBlocks] = useState<any[]>([]);
  const [headerFooterId, setHeaderFooterId] = useState<string | null>(null);
  const [pageName, setPageName] = useState<string>("Untitled");


  //  Fetch custom template blocks
  useEffect(() => {
    const fetchTemplates = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await fetch(
          `${apiUrl}/api/templates?filters[template][$eq]=grapesjs`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        const mappedBlocks = result.data.map((tpl: any, index: number) => ({
          id: `tpl-${tpl.id}-${index}`,
          label: `
            <div style="width:100%;height:60px;border:1px solid #ddd;
              border-radius:4px;background:#f9f9f9;display:flex;
              align-items:center;justify-content:center;font-size:11px;
              font-weight:bold;color:#555;">
              ${tpl.attributes.name}
            </div>
          `,
          content: tpl.attributes.html_element,
          category: "Custom Templates",
        }));

        setApiBlocks(mappedBlocks);
      } catch (error) {
        console.error("❌ Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  //  Initialize GrapesJS editor
  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    editorRef.current = grapesjs.init({
      container: containerRef.current,
      height: "90vh",
      storageManager: false,
      fromElement: false,
      blockManager: { appendTo: "#gjs-blocks" },
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        ],
      },
    });

    const editor = editorRef.current;

    // Custom traits for <a> links
    editor.DomComponents.addType("link", {
      model: {
        defaults: {
          traits: [
            "href",
            "title",
            {
              type: "checkbox",
              name: "target",
              label: "Open in new tab",
              valueTrue: "_blank",
              valueFalse: "_self",
            },
          ],
        },
      },
    });

    const blockManager = editor.BlockManager;

    // Add static blocks ...footerBlocks
    [...generalBlocks, ...hero ].forEach(
      (block: any) => blockManager.add(block.id, block)
    );

    //  Fetch and load HTML & CSS from page
    const loadPageData = async () => {
      if (!pageId) return;
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(`${apiUrl}/api/pages/${pageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const { data } = await res.json();
          const html = data?.attributes?.page_html_body || "";
          const css = data?.attributes?.pagecss || "";
          setHeaderFooterId(data?.attributes?.headerfooterid || null);
          setPageName(data?.attributes?.name || "Untitled");


          editor.DomComponents.clear();
          editor.CssComposer.clear();

          editor.setComponents(`<body>${html}</body>`);
          editor.setStyle(css);
        }
      } catch (err) {
        console.error("❌ Error loading page data:", err);
      }
    };

    loadPageData();
  }, [pageId]);

  //  Inject API blocks dynamically
  useEffect(() => {
    if (editorRef.current && apiBlocks.length > 0) {
      const blockManager = editorRef.current.BlockManager;
      apiBlocks.forEach((block) => blockManager.add(block.id, block));
    }
  }, [apiBlocks]);

  //  Save page HTML + CSS
  const handleSave = async () => {
    if (!editorRef.current || !pageId) return alert("Editor not ready!");

    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();
    const token = localStorage.getItem("jwt");

    try {
      const res = await fetch(`${apiUrl}/api/pages/${pageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: { page_html_body: html, pagecss: css },
        }),
      });

      if (res.ok) console.log("✅ Page updated successfully!");
      else console.error("❌ Failed to update page");
    } catch (err) {
      console.error("Save error:", err);
      console.error("❌ Error saving page");
    }
  };

const handleSaveAndNext = async () => {
  if (!editorRef.current) return;
  await handleSave();
  const html = editorRef.current.getHtml();
  const css = editorRef.current.getCss();

  if (onNext) {
    onNext({
      page_html_body: html,
      pagecss: css,
      headerfooterid: headerFooterId,
      name: pageName,
    });
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <TextHeading title="🎨 Design Your Page" />

      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Sidebar (Blocks) */}
        <div
          id="gjs-blocks"
          className="w-1/4 bg-gray-50 max-h-screen border-r overflow-y-auto"
        ></div>

        {/* Editor */}
        <div
          ref={containerRef}
          id="gjs-editor"
          className="flex-1 overflow-y-auto bg-white"
          style={{ height: "90vh", minHeight: "500px" }}
        ></div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end p-4 border-t bg-white">
        <button
          onClick={handleSaveAndNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save & Next →
        </button>
      </div>
    </div>
  );
}
