"use client";
import "grapesjs/dist/css/grapes.min.css";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import { apiUrl } from "@/utils/config";

interface Props {
  pageId: string | null;
  onNext?: () => void;
  onBack?: () => void;
}

export default function DesignYourPage({ pageId, onNext, onBack }: Props) {
  const editorRef = useRef<any>(null);
  const editorContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Initialize GrapesJS
  useEffect(() => {
    if (!editorRef.current && editorContainer.current) {
      editorRef.current = grapesjs.init({
        container: editorContainer.current,
        height: "90vh",
        fromElement: false,
        storageManager: false,
        // Add basic panels and plugins if needed
      });
    }
  }, []);

  // 🔹 Fetch page HTML and load into GrapesJS
  useEffect(() => {
const fetchPageData = async () => {
  if (!pageId || !editorRef.current) {
    setLoading(false);
    return;
  }

  setLoading(true);
  const token = localStorage.getItem("jwt");
  try {
    const res = await fetch(`${apiUrl}/api/pages/${pageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const html = data?.data?.attributes?.page_html_body || "";

    const wrappedHtml = `<body>${html}</body>`;

    editorRef.current.DomComponents.clear();
    editorRef.current.setComponents(wrappedHtml);

  } catch (err) {
    console.error("Error fetching page:", err);
    alert("❌ Failed to fetch page data");
  } finally {
    setLoading(false);
  }
};


    fetchPageData();
  }, [pageId]);

  // 🔹 Save edited HTML back to Strapi
  const handleSave = async () => {
    if (!pageId || !editorRef.current) return;
    setSaving(true);
    const token = localStorage.getItem("jwt");
    const html = editorRef.current.getHtml();

    try {
      const res = await fetch(`${apiUrl}/api/pages/${pageId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { page_html_body: html },
        }),
      });

      if (res.ok) alert("✅ Page updated successfully!");
      else alert("❌ Failed to update page");
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
    <div>
      <div
        ref={editorContainer}
        style={{ height: "90vh", border: "1px solid #ccc" }}
      ></div>

      <div className="flex justify-end gap-2 mt-4">
        {onBack && (
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onBack}
          >
            Back
          </button>
        )}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
