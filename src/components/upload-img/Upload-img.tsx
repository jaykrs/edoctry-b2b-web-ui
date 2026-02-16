'use client';
import React, { useState } from 'react';
import TextHeading from '../ui/textheader/TextHeader';

export default function UploadImg() {
    const [preview, setPreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const uploadImage = async (file: File) => {
        const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");
        const ftpUser = staffData?.data?.[0]?.attributes?.ftp;

        if (!ftpUser) {
            alert("FTP user missing");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("ftpUser", ftpUser);

        try {
            setUploading(true);

            const res = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error);
                return;
            }

            setImageUrl(data.imageUrl);
            alert(" Image Uploaded Successfully");

        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        // Preview
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        await uploadImage(file);
    };

    return (
        <>
            {/* <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="All Customer"
                    icon="📋"
                />
            </div> */}
            <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">

                <div className="p-6 w-full max-w-md border rounded-lg shadow bg-white space-y-4">

                    <h2 className="text-xl font-semibold text-center">
                        📤 Upload Image
                    </h2>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="
        w-full 
        border 
        rounded-md 
        bg-gray-100 
        text-gray-500 
        file:bg-gray-300 
        file:text-gray-700 
        file:border-0 
        file:px-4 
        file:py-2 
        file:mr-4 
        file:rounded-md
        hover:file:bg-gray-400
      "
                    />

                    {uploading && (
                        <p className="text-blue-600 text-center animate-pulse">
                            ⏳ Uploading & Compressing...
                        </p>
                    )}

                    {preview && (
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2">Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="mx-auto max-h-64 rounded shadow"
                            />
                        </div>
                    )}

                    {imageUrl && (
                        <div className="text-center space-y-2">
                            <p className="text-green-600 text-sm">
                                Uploaded Path:
                            </p>
                            <p className="text-xs break-all bg-gray-100 p-2 rounded">
                                {imageUrl}
                            </p>
                        </div>
                    )}

                </div>

            </div>
        </>
    );
}
