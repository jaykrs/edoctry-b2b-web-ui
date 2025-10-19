"use client";
import React, { useState } from "react";
import { apiUrl } from "@/utils/config";
import TextHeading from "../ui/textheader/TextHeader";

export function Templates() {
    const [templateName, setTemplateName] = useState("");
    const [jsonData, setJsonData] = useState("");
    const [htmlElement, setHtmlElement] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [savedTemplate, setSavedTemplate] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const token = localStorage.getItem("jwt");

        try {
            const response = await fetch(`${apiUrl}/api/templates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        name: templateName,
                        template: "grapesjs",
                        json: jsonData,
                        html_element: htmlElement,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create template");
            }

            const data = await response.json();
            setSavedTemplate(data.data);
            setTemplateName("");
            setJsonData("");
            setHtmlElement("");
            setStatus("success");
        } catch (error) {
            console.error("Error posting templates:", error);
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading title="📝 Templates Details" />
            </div>


            <form onSubmit={handleSubmit} className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    {/* Template Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Templates Name<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                    </div>

                    {/* Templates (readonly) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Templates
                        </label>
                        <input
                            type="text"
                            value="grapesjs"
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                        />
                    </div>

                    {/* JSON */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Json
                        </label>
                        <textarea
                            rows={4}
                            value={jsonData}
                            onChange={(e) => setJsonData(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        ></textarea>
                    </div>

                    {/* HTML Element */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            Html Element<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            rows={4}
                            value={htmlElement}
                            onChange={(e) => setHtmlElement(e.target.value)}
                            placeholder={`<style>..</style>\n<div>..</div>\n<script>..</script>`}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        ></textarea>
                    </div>
                </div>

                {/* Footer with Submit */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4 flex justify-end items-center shadow-md">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-50"
                    >
                        {status === "loading" ? "Saving..." : "Save & Next →"}
                    </button>
                </div>
            </form>


            {/* Fullscreen Success Overlay */}
            {status === "success" && savedTemplate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-8 w-3/4 max-w-2xl text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Template Saved Successfully!</h2>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Name:</span> {savedTemplate.attributes?.name}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Html:</span> {savedTemplate.attributes?.html_element?.slice(0, 20)}...
                        </p>
                        <p className="text-gray-800 font-medium mt-4">
                            is set as a template 🎉
                        </p>

                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {status === "error" && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-96 text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-4">❌ Failed to Save Template</h2>
                        <p className="text-gray-600">Please try again.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
