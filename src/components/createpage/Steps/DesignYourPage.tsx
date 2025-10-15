"use client";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { headerBlocks, generalBlocks, footerBlocks } from "@/data/blocksData";
import { hero } from "@/data/pageBlockData";
import { apiUrl } from "@/utils/config";

type DesignYourPageProps = {
  onNext: () => void;
  onBack: () => void;
  data: {
    page_html_body: string;
    pagecss: string;
    [key: string]: any;
  };
  onChange: (newData: Partial<DesignYourPageProps["data"]>) => void;
};

function DesignYourPage({ onNext, onBack, data, onChange }: DesignYourPageProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const gjsInstanceRef = useRef<any>(null);
  const [apiBlocks, setApiBlocks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await fetch(
          `${apiUrl}/api/templates?filters[template][$eq]=grapesjs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        console.log("Fetched templates:", result);

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
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    if (editorRef.current && !gjsInstanceRef.current) {
      gjsInstanceRef.current = grapesjs.init({
        container: editorRef.current,
        fromElement: false,
        storageManager: false,
        plugins: [],
        blockManager: { appendTo: "#blocks" },
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

      const editor = gjsInstanceRef.current;

      // Custom link traits
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

      // Static blocks
      [...generalBlocks, ...hero, ...footerBlocks].forEach((block: any) => {
        blockManager.add(block.id, block);
      });

      // Restore saved components
      if (data.page_html_body) {
        editor.setComponents(data.page_html_body);
      }
    }
  }, [data.page_html_body]);

  // 🔹 Inject API blocks once they are fetched
  useEffect(() => {
    if (gjsInstanceRef.current && apiBlocks.length > 0) {
      const blockManager = gjsInstanceRef.current.BlockManager;
      apiBlocks.forEach((block) => {
        blockManager.add(block.id, block);
      });
    }
  }, [apiBlocks]);

  const handleNextClick = () => {
    const wrapper = gjsInstanceRef.current.getWrapper();
    const htmlContent = wrapper
      .components()
      .map((cmp: any) => cmp.toHTML())
      .join("");
    const cssContent = gjsInstanceRef.current.getCss();

    onChange({ page_html_body: htmlContent, pagecss: cssContent });
    onNext();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TextHeading title="🎨 Design Your Page" />

      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Blocks Panel */}
        <div
          id="blocks"
          className="w-1/4 bg-gray-50 max-h-screen border-r overflow-y-auto"
        ></div>

        {/* Editor */}
        <div
          ref={editorRef}
          className="flex-1 overflow-y-auto max-h-screen"
        ></div>
      </div>


      <div className="flex justify-between p-4 border-t bg-white">
        <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
        <button onClick={handleNextClick} className="px-4 py-2 bg-blue-600 text-white rounded">
          Next →
        </button>
      </div>
    </div>
  );
}

export default DesignYourPage;
