"use client";
import { apiUrl } from "@/utils/config";
import React, { useState } from "react";
import TextHeading from "../ui/textheader/TextHeader";

const MediaLibrary = () => {
  const [folders, setFolders] = useState([
    { name: "web", folderCount: 0, assetCount: 3 },
    { name: "interview-prep", folderCount: 1, assetCount: 0 },
    { name: "career", folderCount: 0, assetCount: 6 },
    { name: "career-development", folderCount: 0, assetCount: 6 },
  ]);

  const [folderName, setFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      alert("Asset uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const createFolder = async (name: string) => {
    const jwt = localStorage.getItem("jwt");
    try {
      const response = await fetch(`${apiUrl}/api/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: { name },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Folder created:", data);

      setFolders((prev) => [
        ...prev,
        { name, folderCount: 0, assetCount: 0 },
      ]);

      alert("Folder created successfully.");
    } catch (error) {
      console.error("Error creating folder:", error);
      alert("Failed to create folder.");
    }
  };

  return (
    <div className="">
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="Media Library"
          icon="📁"
          buttonprops={{
            buttonText: "+ Folder",
            title: "Add new folder",
            content: "Here you can create a new folder in the media library.",
            onClick: () => {
              const folderNameInput = prompt("Enter folder name:");
              if (folderNameInput) {
                createFolder(folderNameInput);
              }
            }
          }}
          secondbuttonprops={{
            buttonText: "+ Assets",
            title: "Add new assets",
            content: "Here you can add new assets to the media library.",
            onClick: () => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = '*/*';
              fileInput.onchange = (e: any) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  uploadFile(selectedFile);
                }
              };
              fileInput.click();
            }
          }}
        />

      </div>

      <div className="flex items-center gap-4 mx-2 my-4">
        <select className="border border-gray-300 rounded px-3 py-2 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
          <option>Most recent uploads</option>
          <option>Oldest uploads</option>
        </select>
        <button className="bg-gray-100 px-3 py-2 rounded font-medium text-gray-700 text-start text-theme-xs dark:text-gray-400">Filters</button>
      </div>

      <div className="grid grid-cols-1 mx-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded shadow"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 7v4a4 4 0 004 4h10a4 4 0 004-4V7"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-600 text-start text-theme-md dark:text-gray-400">{folder.name}</p>
              <p className="text-sm text-gray-500">
                {folder.folderCount} folder, {folder.assetCount} assets
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;
