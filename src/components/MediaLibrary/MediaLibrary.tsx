"use client";
import { apiUrl } from "@/utils/config";
import React, { useState, useEffect } from "react";
import TextHeading from "../ui/textheader/TextHeader";
import { CopyIcon } from "@/icons";

interface FolderType {
  name: string;
  assets: { name: string; url: string; type: "image" | "js" | "css" | "scss" }[];
}

const MediaLibrary = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [clibs, setClibs] = useState<string[]>([]);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [openFolderIndex, setOpenFolderIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadFile = async (file: File) => {
    const token = localStorage.getItem("jwt");
    if (!token) return alert("JWT token not found. Please login first.");

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error(await response.text());

      alert("File uploaded successfully!");
      fetchImages();
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Failed to upload: ${error.message}`);
    }
  };

  const fetchImages = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return console.warn("JWT token not found.");

    try {
      const response = await fetch(`${apiUrl}/api/upload/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(await response.text());

      const result = await response.json();
      const imgs: FolderType = { name: "Images List", assets: [] };
      const libs: FolderType = { name: "Web Resources List", assets: [] };

      for (const item of result) {
        if (
          item.url.endsWith(".js") ||
          item.url.endsWith(".css") ||
          item.url.endsWith(".scss") ||
          item.url.endsWith(".json")
        ) {
          libs.assets.push({
            name: item.url.replace("/uploads/", ""),
            url: item.url,
            type: item.url.endsWith(".scss") ? "scss" : item.url.endsWith(".css") ? "css" : "js",
          });
        }
        else {
          imgs.assets.push({ name: item.url.replace("/uploads/", ""), url: item.url, type: "image" });
        }
      }

      setUrls(imgs.assets.map((a) => a.url));
      setClibs(libs.assets.map((a) => a.url));
      setFolders([imgs, libs]);
    } catch (error: any) {
      console.error("Fetch images failed:", error.message);
    }
  };

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    alert(`Copied: ${link}`);
  };

  return (
    <div className="">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Digital Assets"
          secondbuttonprops={{
            buttonText: "+ Assets",
            title: "Add new assets",
            content: (
              <>
                Upload assets including PNG, CSS, SCSS, and JS files{" "}
                <span className="text-red-500 text-lg font-extrabold">*</span>
              </>
            ),
            onClick: () => {
              const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "*/*";
              fileInput.onchange = (e: any) => {
                const selectedFile = e.target.files[0];
        if (selectedFile) uploadFile(selectedFile);
              };
        fileInput.click();
            },
          }}
        />
      </div>

      {/* Sort/Filter */}
      <div className="flex items-center gap-4 mx-2 my-4">
        <select className="border border-gray-300 rounded px-3 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
          <option>Most recent uploads</option>
          <option>Oldest uploads</option>
        </select>
        <button className="bg-gray-100 px-3 py-2 rounded font-medium text-gray-700 text-start text-theme-xs dark:text-gray-400">Filters</button>
      </div>

      {/* Folder Grid */}
      <div className="grid grid-cols-1 mx-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder, index) => (
          <div
            key={index}
            className={`flex flex-col rounded shadow cursor-pointer ${openFolderIndex === index ? "bg-gray-50" : "bg-white"
              }`}
            onClick={() => setOpenFolderIndex(openFolderIndex === index ? null : index)}
          >
            <div className="flex items-center p-4 gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 7v4a4 4 0 004 4h10a4 4 0 004-4V7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="select-none">
                <p className="font-medium text-gray-600 text-start text-theme-md dark:text-gray-400 select-none">{folder.name}</p>
                <p className="text-sm text-gray-500 select-none">{folder.assets.length} assets</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {openFolderIndex !== null && (
        <div className="mt-6 mx-2 p-5 bg-white rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {folders[openFolderIndex].name} — {folders[openFolderIndex].assets.length} assets
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-5">
            {folders[openFolderIndex].assets.map((asset, i) => (
              <div
                key={i}
                className="group bg-gray-50 hover:bg-gray-100 duration-200 rounded-xl p-3 shadow-sm hover:shadow-md cursor-pointer border"
                onClick={() => copyToClipboard(`${apiUrl}${asset.url}`)}
              >
                <div className="w-full flex justify-center">
                  {asset.type === "image" ? (
                    <img
                      src={`${apiUrl}${asset.url}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div
                      className={`w-24 h-24 flex flex-col items-center justify-center rounded-lg text-xs font-bold relative overflow-hidden
    ${asset.type === "js" ? "bg-yellow-300" : ""}
    ${asset.type === "scss" ? "bg-pink-200" : ""}
    ${asset.type === "css" ? "bg-blue-200" : ""}`
                      }
                    >
                      {/* Folder Top */}
                      <div className="absolute top-0 left-0 w-3/5 h-4 bg-white/40 rounded-b-sm"></div>

                      {/* Folder Label */}
                      <span className="z-10">{asset.type.toUpperCase()}</span>
                    </div>

                  )}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-600 w-full">
                  <p className="truncate w-full">{asset.name}</p>
                  <CopyIcon className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default MediaLibrary;
