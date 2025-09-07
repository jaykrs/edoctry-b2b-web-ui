'use client';
import React, { useEffect, useRef } from 'react';
import grapesjs, { Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import TextHeading from '@/components/ui/textheader/TextHeader';
import { footerBlocks, generalBlocks } from '@/data/blocksData';

type DesignYourFooterProps = {
  data: {
    footer_html_element: string;
    [key: string]: any;
  };
  onChange: (newData: Partial<DesignYourFooterProps['data']>) => void;
  onNext: () => void;
  onBack: () => void;
};

function DesignYourFooter({ data, onChange, onNext, onBack }: DesignYourFooterProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const gjsInstanceRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Prevent re-initialization
    if (gjsInstanceRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: false,
      storageManager: false,
      blockManager: {
        appendTo: '#blocks',
      },
        canvas: {
    styles: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    ],
    scripts: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    ]
  }
    });

    // Add blocks dynamically
    const blockManager = editor.BlockManager;
    [...generalBlocks, ...footerBlocks].forEach((block: any) => {
      blockManager.add(block.id, block);
    });

    // Load saved footer if available
    if (data.footer_html_element) {
      editor.setComponents(data.footer_html_element);
    }

    gjsInstanceRef.current = editor;

    // Cleanup on unmount
    return () => {
      if (gjsInstanceRef.current) {
        gjsInstanceRef.current.destroy();
        gjsInstanceRef.current = null;
      }
    };
  }, [data.footer_html_element]);

  const handleSaveAndNext = () => {
  if (gjsInstanceRef.current) {
    const wrapper = gjsInstanceRef.current.getWrapper();
    // Sirf children ka HTML collect karo (body skip)
    const html = wrapper
      ? wrapper.components().map((cmp: any) => cmp.toHTML()).join('')
      : '';
    const css = gjsInstanceRef.current.getCss();

      onChange({ footer_html_element: `${html}<style>${css}</style>` });
      onNext();
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading title="Design Your Footer" />
      </div>

      {/* Editor Section */}
      <div className="flex flex-1 overflow-auto">
        <div
          id="blocks"
          className="w-64 flex-col h-screen border-r bg-white overflow-y-auto"
        ></div>
        <div
          ref={editorRef}
          className="flex-1 border h-screen border-gray-300 bg-white"
        ></div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t bg-white px-6 py-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleSaveAndNext}
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
        >
          Publish & Next →
        </button>
      </div>
    </div>
  );
}

export default DesignYourFooter;
