"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextHeading from "@/components/ui/textheader/TextHeader";
import { apiUrl } from "@/utils/config";
import EmailGrapesEditor from "@/components/emailgrapeseditor/EmailGrapesEditor";

export default function EmailTemplateClient({ pid }: { pid?: string }) {
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
                setJson(attr?.json ? JSON.stringify(attr.json, null, 2) : "");
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
                    type: "email-templates",
                },
            }),
        });

        router.push("/admin/email-templates");
    };

    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="min-h-screen"> {/* Header */} <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-3 shadow-sm"> <TextHeading title={isEditMode ? "Edit Email Template" : "Create Email Template"} icon="📧" savebuttonprops={{ buttonTitle: isEditMode ? "Update Template" : "Save Template", icon: "✓", onClick: handleSave, }} thirdbuttonprops={{ buttonTitle: "Back to Templates", icon: "←", onClick: () => router.push("/admin/email-templates"), }} /> </div> {/* Form */} <div className="h-[calc(100vh-80px)] overflow-y-auto"> {/* SECTION 1: FORM */} <div className="p-6 space-y-6 bg-white"> {/* Name */} <div> <label className="block text-sm font-medium text-gray-600 mb-1"> Template Name </label> <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border px-4 py-2" placeholder="Welcome Email Template" /> </div> {/* Description */} <div> <label className="block text-sm font-medium text-gray-600 mb-1"> Description </label> <textarea value={template} onChange={(e) => setTemplate(e.target.value)} className="w-full rounded-lg border px-4 py-2 min-h-[100px]" placeholder="Templates description" /> </div> {/* JSON */} <div> <label className="block text-sm font-medium text-gray-600 mb-1"> JSON </label> <textarea value={json} onChange={(e) => setJson(e.target.value)} className="w-full rounded-lg border px-4 py-2 min-h-[160px] font-mono text-sm" placeholder='{ "content": "Create personalized email templates..." }' /> </div> </div> {/* SECTION 2: GRAPESJS */} <EmailGrapesEditor value={htmlElement} onChange={(html) => setHtmlElement(html)} /> </div> </div>
    );
}
