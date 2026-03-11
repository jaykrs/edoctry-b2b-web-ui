"use client";
import "grapesjs/dist/css/grapes.min.css";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { generalBlocks } from "@/data/blocksData";
import { hero } from "@/data/pageBlockData";
import { apiUrl } from "@/utils/config";

interface Props {
  pageId?: string | null;
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DesignYourPage({
  pageId,
  data,
  onChange,
  onNext,
  onBack,
}: Props) {

  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [apiBlocks, setApiBlocks] = useState<any[]>([]);
  const [clientsideLibs, setClientsideLibs] = useState<string>("");

  // parse client libs
  const parsedLibs = React.useMemo(() => {
    let libs: string[] = [];
    try {
      if (typeof clientsideLibs === "string") {
        libs = clientsideLibs.trim().startsWith("[")
          ? JSON.parse(clientsideLibs)
          : clientsideLibs.split(",").map((l) => l.trim());
      }
    } catch (e) {
      console.error("Lib parse error:", e);
    }

    return libs;

  }, [clientsideLibs]);

  const cssLibs = parsedLibs.filter((lib) => lib.endsWith(".css"));
  const jsLibs = parsedLibs.filter((lib) => lib.endsWith(".js"));

  useEffect(() => {

    if (!editorRef.current) {
      console.log("❌ GrapesJS editor not ready yet");
      return;
    }

    const doc = editorRef.current.Canvas.getDocument();

    console.log("🎨 Injecting CSS libs:", cssLibs);

    cssLibs.forEach((href: string) => {

      const existing = doc.querySelector(`link[href="${href}"]`);

      if (!existing) {

        const link = doc.createElement("link");
        link.rel = "stylesheet";
        link.href = href;

        doc.head.appendChild(link);

        console.log("✅ CSS injected:", href);

      } else {

        console.log("⚠️ CSS already exists:", href);

      }

    });

  }, [cssLibs]);

  useEffect(() => {

    if (!editorRef.current) {
      console.log("❌ GrapesJS editor not ready yet");
      return;
    }

    const doc = editorRef.current.Canvas.getDocument();

    console.log("⚙️ Injecting JS libs:", jsLibs);

    jsLibs.forEach((src: string) => {

      const existing = doc.querySelector(`script[src="${src}"]`);

      if (!existing) {

        const script = doc.createElement("script");
        script.src = src;

        doc.body.appendChild(script);

        console.log("✅ JS injected:", src);

      } else {

        console.log("⚠️ JS already exists:", src);

      }

    });

  }, [jsLibs]);

  // load template blocks
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const res = await fetch(
          `${apiUrl}/api/templates?filters[type][$eq]=page-templates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();

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

      } catch (err) {
        console.error("Template fetch error:", err);
      }
    };

    fetchTemplates();

  }, []);

  // load page data
  useEffect(() => {
    if (!containerRef.current || editorRef.current) return;

    editorRef.current = grapesjs.init({
      container: containerRef.current,
      height: "90vh",
      storageManager: false,
      blockManager: { appendTo: "#gjs-blocks" },

      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
          ...cssLibs,
        ],
        scripts: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
          ...jsLibs,
        ],
      },
    });

    const editor = editorRef.current;
    const blockManager = editor.BlockManager;

    [...generalBlocks, ...hero].forEach((block: any) =>
      blockManager.add(block.id, block)
    );

    // restore HTML
    if (data?.page_html_body) {
      editor.setComponents(data.page_html_body);
    }
  }, [cssLibs.length, jsLibs.length]);

  // inject API blocks
  useEffect(() => {
    if (editorRef.current && apiBlocks.length > 0) {
      const blockManager = editorRef.current.BlockManager;

      apiBlocks.forEach((block) => blockManager.add(block.id, block));
    }


  }, [apiBlocks]);

  // fetch headerfooter libs
  useEffect(() => {
    const fetchLibs = async () => {

      if (!data?.headerfooterid) return;

      try {
        const token = localStorage.getItem("jwt");

        const res = await fetch(
          `${apiUrl}/api/headerfooters/${data.headerfooterid}?fields=clientsidelibs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const result = await res.json();

        setClientsideLibs(
          result?.data?.attributes?.clientsidelibs || ""
        );

      } catch (err) {
        console.error("Header libs error:", err);
      }
    };

    fetchLibs();
  }, [data?.headerfooterid]);

  // save design
  const handleNextClick = () => {
    if (!editorRef.current) return;

    const html = editorRef.current.getHtml();
    const css = editorRef.current.getCss();

    onChange({
      page_html_body: html,
      pagecss: css,
    });

    onNext();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TextHeading title="🎨 Design Your Page" />

      <div className="flex flex-row flex-1 overflow-hidden">

        {/* blocks */}
        <div
          id="gjs-blocks"
          className="w-1/4 bg-gray-50 max-h-screen border-r overflow-y-auto"
        ></div>

        {/* editor */}
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto bg-white"
          style={{ height: "90vh" }}
        ></div>

      </div>

      <div className="flex justify-between p-4 border-t bg-white">

        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>

        <button
          onClick={handleNextClick}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save & Next →
        </button>

      </div>

    </div>

  );
}
