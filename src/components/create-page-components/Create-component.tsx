"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { apiUrl } from "@/utils/config";
import {
    Editor,
    EditorProvider,
    Toolbar,
    BtnBold,
    BtnItalic,
    BtnUnderline,
    BtnLink,
    BtnBulletList,
    BtnNumberedList,
    BtnUndo,
    BtnRedo
} from "react-simple-wysiwyg";
export default function CreateComponent({ pid }: { pid?: string }) {
    const router = useRouter();
    const isEditMode = Boolean(pid);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [template, setTemplate] = useState("");
    const [json, setJson] = useState("");
    const [htmlElement, setHtmlElement] = useState("");

    useEffect(() => {
        if (!isEditMode) return;

        const jwt = localStorage.getItem("jwt");
        setLoading(true);

        fetch(`${apiUrl}/api/templates/${pid}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                const attr = res.data.attributes;

                setName(attr?.name || "");
                setTemplate(attr?.template || "");
                setJson(
                    attr?.json ? JSON.stringify(attr.json, null, 2) : ""
                );
                setHtmlElement(attr?.html_element || "");
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [isEditMode, pid]);

    const handleSave = async () => {
        const jwt = localStorage.getItem("jwt");

        const payload = {
            name,
            template,
            json: json ? JSON.parse(json) : null,
            html_element: htmlElement,
        };

        const url = isEditMode
            ? `${apiUrl}/api/templates/${pid}`
            : `${apiUrl}/api/templates`;

        const method = isEditMode ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    ...payload,
                    type: "page-templates",
                },
            }),
        });

        router.push("/admin/page-components");
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    const decodeHtml = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };
    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-3 shadow-sm">
                <TextHeading
                    title={
                        isEditMode
                            ? "Edit Page Component"
                            : "Create Page Component"
                    }
                    icon="📧"
                    savebuttonprops={{
                        buttonTitle: isEditMode
                            ? "Update Component"
                            : "Save Component",
                        icon: "✓",
                        onClick: handleSave,
                    }}
                    thirdbuttonprops={{
                        buttonTitle: "Back to Components",
                        icon: "←",
                        onClick: () =>
                            router.push("/admin/page-components"),
                    }}
                />
            </div>

            {/* Form + Editor */}
            <div className="h-[calc(100vh-80px)] overflow-y-auto">
                {/* SECTION 1: FORM */}
                <div className="p-6 space-y-6 bg-white">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Component Name
                        </label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2"
                            placeholder="Welcome Page Component"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 min-h-[100px]"
                            placeholder="Component description"
                        />
                    </div>

                    {/* JSON */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            JSON
                        </label>
                        <textarea
                            value={json}
                            onChange={(e) => setJson(e.target.value)}
                            className="w-full rounded-lg border px-4 py-2 min-h-[160px] font-mono text-sm"
                            placeholder='{ "content": "Create personalized page components..." }'
                        />
                    </div>
                </div>

                {/* SECTION 2: HTML */}
                <div className="md:col-span-2 mx-6">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                        Html Element <span className="text-red-500">*</span>
                    </label>

                    <EditorProvider>
                        <div className="border rounded-lg bg-white overflow-hidden">
                            <Toolbar>
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                                <BtnLink />
                                <BtnBulletList />
                                <BtnNumberedList />
                                <BtnUndo />
                                <BtnRedo />
                            </Toolbar>

                            <Editor
                                value={htmlElement}
                                onChange={(e) => setHtmlElement(e.target.value)}
                                className="min-h-[200px] px-3 py-2"
                            />
                        </div>
                    </EditorProvider>
                </div>

                {/* Live Preview */}
                <div className="md:col-span-2 mx-6">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Live Preview
                    </label>

                    <div className="border rounded-lg bg-white p-4 min-h-[200px]">
                        {htmlElement ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: decodeHtml(htmlElement),
                                }}
                            />
                        ) : (
                            <p className="text-gray-400 text-sm">
                                Start typing to see preview...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}