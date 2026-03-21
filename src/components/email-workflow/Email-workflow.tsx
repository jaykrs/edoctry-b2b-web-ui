"use client";
import React, { useState, useEffect } from "react";
import TextHeading from "../ui/textheader/TextHeader";
import { Table, TableCell, TableHeader, TableBody, TableRow } from "../ui/table";
import { apiUrl } from "@/utils/config";
import Select from "react-select";
import { Pencil, EyeIcon, DocsIcon, PencilIcon } from "@/icons/index";

function EmailWorkflow() {
    const [showModal, setShowModal] = useState(false);

    const [options, setOptions] = useState<any[]>([]);
    const [recepientList, setRecepientList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [workflowList, setWorkflowList] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const [newWorkflow, setNewWorkflow] = useState({
        name: "",
        trigger: "",
        template: "",
        audience: "[]",
        sendOption: "now",
    });


    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) return;

        fetch(`${apiUrl}/api/templates?filters[type][$eq]=email-templates`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {

                const mappedOptions =
                    res?.data?.map((item: any) => ({
                        id: item.id,
                        name: item.attributes?.name || "Untitled",
                        html_element: item.attributes?.html_element || "",
                    })) || [];

                setOptions(mappedOptions);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Template API Error:", err);
                setLoading(false);
            });
    }, []);


    useEffect(() => {
        const fetchRecipients = async () => {

            const jwt = localStorage.getItem("jwt");
            const staffDataString = localStorage.getItem("staffData");

            if (!jwt || !staffDataString) return;

            const staffData = JSON.parse(staffDataString);

            const vendoruuid =
                staffData?.data?.[0]?.attributes?.vendoruuid;

            if (!vendoruuid) return;

            const res = await fetch(
                `${apiUrl}/api/recepientlists?filters[vendoruuid][$eq]=${vendoruuid}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );

            const data = await res.json();

            const recepients =
                data?.data?.map((item: any) => ({
                    value: item.id,
                    label: item.attributes?.name,
                })) || [];

            setRecepientList(recepients);
        };

        fetchRecipients();
    }, []);


    useEffect(() => {
        if (showModal) {
            document.body.classList.add("hide-app-layout");
        } else {
            document.body.classList.remove("hide-app-layout");
        }
        return () => document.body.classList.remove("hide-app-layout");
    }, [showModal]);


    const openEditModal = (workflow: any) => {
        setIsEditing(true);
        setEditId(workflow.id);

        setNewWorkflow({
            name: workflow.name,
            trigger: workflow.trigger,
            template: workflow.template,
            audience: JSON.stringify(workflow.audience),
            sendOption: workflow.trigger ? "others" : "now",
        });

        setShowModal(true);
    };


    const getTodayLocalDate = () => {

        const today = new Date();

        const offset = today.getTimezoneOffset();

        const localDate = new Date(today.getTime() - offset * 60000);

        return localDate.toISOString().split("T")[0];
    };

    useEffect(() => {
        if (newWorkflow.sendOption === "now" && !newWorkflow.trigger) {

            setNewWorkflow((prev) => ({
                ...prev,
                trigger: getTodayLocalDate(),
            }));
        }
    }, [newWorkflow.sendOption]);


    const handleSaveWorkflow = async () => {

        try {

            const jwt = localStorage.getItem("jwt");

            const staffData = JSON.parse(localStorage.getItem("staffData") || "{}");

            const vendorid = staffData?.data?.[0]?.attributes?.vendoruuid;

            const selectedTemplate = options.find(
                (t) => t.id == newWorkflow.template
            );

            const payload = {

                data: {
                    name: newWorkflow.name,
                    templateid: Number(newWorkflow.template),
                    recepientlistid: JSON.parse(newWorkflow.audience),
                    templatedata: selectedTemplate?.html_element || "",
                    execute: false,
                    executiondt:
                        newWorkflow.sendOption === "now"
                            ? getTodayLocalDate()
                            : newWorkflow.trigger,
                    vendorid: vendorid
                }
            };

            await fetch(`${apiUrl}/api/emailworkflows`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(payload),
            });

            setShowModal(false);

        } catch (error) {

            console.error("Workflow create error:", error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
                <TextHeading
                    title="Email Workflow"
                    icon="📩"
                    buttonprops={{
                        buttonText: "+",
                        title: "Add events",
                        content:
                            "Create and manage automated email sequences to engage customers at the right time.",
                        onClick: () => setShowModal(true),
                    }}
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Workflow Name
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Trigger Event
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Selected Template
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Target Audience
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Status
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Last Updated
                                    </TableCell>

                                    <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                                {workflowList.length === 0 ? (
                                    <TableRow>
                                        <TableCell className="px-5 py-6 text-center text-gray-400">
                                            No workflows created yet
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    workflowList.map((wf) => (
                                        <TableRow key={wf.id}>
                                            <TableCell className="px-5 py-6 sm:px-6 text-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 overflow-hidden rounded-lg">
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${wf.name}&background=random`}
                                                            alt={wf.name}
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                            {wf.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="flex flex-col px-5 py-3 mt-5 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <span>{wf.trigger}</span>
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                                <div className="flex flex-col">
                                                    <span className="text-blue-600 font font-bold">
                                                        {options.find((t) => t.id == wf.template)?.name || "-"}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <span>{wf.audience.length} Selected</span>
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                                    {wf.status}
                                                </span>
                                            </TableCell>

                                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                                <span>{wf.updatedAt}</span>
                                            </TableCell>

                                            <TableCell>
                                                <button
                                                    onClick={() => openEditModal(wf)}
                                                    className="ps-6 flex justify-end text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                                >
                                                    <PencilIcon />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* MODAL (UNCHANGED UI) */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl w-[90%] max-w-2xl shadow-xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Add Email Workflow
                            </h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* body */}
                        <div className="p-6 space-y-5">

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Workflow Name
                                </label>

                                <input
                                    type="text"
                                    className="w-full border rounded-xl px-3 py-2 text-sm"
                                    value={newWorkflow.name}
                                    onChange={(e) =>
                                        setNewWorkflow({ ...newWorkflow, name: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Send Time
                                </label>

                                <select
                                    className="w-full border rounded-xl px-3 py-2 text-sm"
                                    value={newWorkflow.sendOption}
                                    onChange={(e) => {

                                        const value = e.target.value;

                                        setNewWorkflow({
                                            ...newWorkflow,
                                            sendOption: value,
                                            trigger: value === "now" ? getTodayLocalDate() : "",
                                        });
                                    }}
                                >
                                    <option value="now">Now</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                            {newWorkflow.sendOption === "others" && (

                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">
                                        Trigger Date
                                    </label>

                                    <input
                                        type="date"
                                        className="w-full border rounded-xl px-3 py-2 text-sm show-date-icon"
                                        value={newWorkflow.trigger}
                                        onChange={(e) =>
                                            setNewWorkflow({ ...newWorkflow, trigger: e.target.value })
                                        }
                                    />
                                </div>
                            )}

                            <div>

                                <label className="block text-xs text-gray-500 mb-1">
                                    Selected Template
                                </label>

                                <select
                                    className="w-full border rounded-xl px-3 py-2 text-sm"
                                    value={newWorkflow.template}
                                    onChange={(e) =>
                                        setNewWorkflow({
                                            ...newWorkflow,
                                            template: e.target.value,
                                        })
                                    }
                                >

                                    <option value="">Choose Template</option>

                                    {options.map((t) => (

                                        <option key={t.id} value={t.id}>
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-1">
                                    Target Audience
                                </label>

                                <Select
                                    isMulti
                                    closeMenuOnSelect={false}
                                    options={recepientList}

                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    maxMenuHeight={180}

                                    styles={{
                                        menuPortal: (base) => ({
                                            ...base,
                                            zIndex: 9999,
                                        }),
                                    }}

                                    value={JSON.parse(newWorkflow.audience)
                                        .map((val: any) =>
                                            recepientList.find((o) => o.value === val)
                                        )
                                        .filter(Boolean)}

                                    onChange={(selected) =>
                                        setNewWorkflow({
                                            ...newWorkflow,
                                            audience: JSON.stringify(
                                                selected.map((o) => o.value)
                                            ),
                                        })
                                    }
                                />
                            </div>

                        </div>

                        {/* footer */}

                        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">

                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSaveWorkflow}
                                className="px-5 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                            >
                                {isEditing ? "Update Workflow" : "Save Workflow"}
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default EmailWorkflow;