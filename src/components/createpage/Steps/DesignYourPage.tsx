'use client';
import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import TextHeading from '@/components/ui/textheader/TextHeader';
import axios from 'axios';
import { on } from 'events';
import { headerBlocks, generalBlocks, footerBlocks } from '@/data/blocksData';
import { hero } from '@/data/pageBlockData';

type DesignYourPageProps = {
  onNext: () => void;
  onBack: () => void;
  data: {
    page_html_body: string;
    pagecss: string;
    [key: string]: any;
  }
  onChange: (newData: Partial<DesignYourPageProps['data']>) => void;
};

function DesignYourPage({ onNext, onBack, data, onChange }: DesignYourPageProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const gjsInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && !gjsInstanceRef.current) {
      gjsInstanceRef.current = grapesjs.init({
        container: editorRef.current,
        fromElement: false,
        storageManager: false,
        plugins: [],
        style: '',
        blockManager: {
          appendTo: '#blocks',
        },
      });

      const blockManager = gjsInstanceRef.current.BlockManager;
      [...generalBlocks, ...headerBlocks, ...footerBlocks, ...hero].forEach((block: any) => {
        blockManager.add(block.id, block);
      });

      if (data.page_html_body) {
        gjsInstanceRef.current.setComponents(data.page_html_body);
      }
    }
  }, [data.page_html_body]);



  const handleNextClick = async () => {
    const wrapper = gjsInstanceRef.current.getWrapper();
    const htmlContent = wrapper.toHTML();
    const cssContent = gjsInstanceRef.current.getCss();
    onChange({ page_html_body: htmlContent, pagecss: cssContent });
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading title="Design Your Page" />
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
          onClick={handleNextClick}
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
        >
          Publish & Next →
        </button>
      </div>
    </div>
  );
}

export default DesignYourPage;
