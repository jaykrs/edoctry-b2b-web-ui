"use client";

import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { generalBlocks, emailBlocks } from "@/data/blocksData";

type EmailGrapesEditorProps = {
  value?: string; // html_element
  onChange: (html: string, css: string) => void;
};

function EmailGrapesEditor({ value, onChange }: EmailGrapesEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const gjsInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current || gjsInstanceRef.current) return;

    gjsInstanceRef.current = grapesjs.init({
      container: editorRef.current,
      fromElement: false,
      height: "100%",
      storageManager: false,

      blockManager: {
        appendTo: "#email-blocks",
      },

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

    // 🔗 link traits (same as page builder)
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

    // 🔹 blocks (reuse existing ones)
    const blockManager = editor.BlockManager;
    generalBlocks.forEach((block: any) => {
      blockManager.add(block.id, block);
    });
    emailBlocks.forEach((block: any) => {
      blockManager.add(block.id, block);
    });

    // 🔹 restore html_element if edit mode
    if (value) {
      editor.setComponents(value);
    }

    // 🔹 sync on change
    editor.on("update", () => {
      const wrapper = editor.getWrapper();
      const html = wrapper
        .components()
        .map((cmp: any) => cmp.toHTML())
        .join("");
      const css = editor.getCss();

      onChange(html, css);
    });
  }, [value, onChange]);

  return (
    <div className="flex flex-col h-screen">

      <div className="flex flex-1 overflow-hidden border ">
        {/* Blocks */}
        <div
          id="email-blocks"
          className="w-1/4 bg-gray-50 border-r overflow-y-auto"
        />

        {/* Editor */}
        <div
          ref={editorRef}
          className="flex-1 overflow-y-auto"
        />
      </div>
    </div>
  );
}

export default EmailGrapesEditor;
