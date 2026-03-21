"use client";
import React, { useEffect, useState } from 'react';
import InputPageDetail from './Steps/InputPageDetail';
import DesignYourPage from './Steps/DesignYourPage';
import PreviewAndPublish from './Steps/PreviewandPublish';
import FinishPage from './Steps/Finish';
import { apiUrl } from '@/utils/config';

function CreatePage() {
    const [step, setStep] = useState(1);
    const [isPublished, setIsPublished] = useState(false);
    const [pageName, setPageName] = useState("");
    const [pagePath, setPagePath] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        pagepath: "",
        author: "",
        type: "",
        headerfooterid: "",
        seo: "",
        metadata: "",
        css: "",
        pagecss: "",
        pagejs: "",
        page_html_body: "",
        page_html_hero: "",
        page_html_promo: "",
        published: false,
        page_html_menu: "",
        menu: ""
    });


    const updateFormData = (newData: any) => {
        if (newData.name !== undefined) {
            setPageName(newData.name);
        }
        if (newData.pagepath !== undefined) {
            setPagePath(newData.pagepath);
        }


        setFormData((prev) => ({ ...prev, ...newData }));
    };



    const handleSubmit = async () => {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        const staffDataString = localStorage.getItem("staffData");
        const staffData = staffDataString ? JSON.parse(staffDataString) : null;
        const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;



        try {
            const response = await fetch(`${apiUrl}/api/pages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: {
                        ...formData,
                        vendoruuid: vendoruuid
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create page");
            }

            const data = await response.json();
            setStep(4);
            setIsPublished(true);

        } catch (error) {
            console.error("Error creating page:", error);
        }
    };

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

    const steps = [
        { id: 1, label: "Add Page Details", subtext: "Enter basic information about your page" },
        { id: 2, label: "Design Your Page", subtext: "Customize the layout and design of your page" },
        { id: 3, label: "Preview and Publish", subtext: "Review your changes before publishing" },
        { id: 4, label: "Finish", subtext: "Complete the setup of your page" }
    ];



    return (
        <div className="createpage-container ">
            <div className="stepper-container mb-4" style={{ userSelect: 'none' }}>
                {steps.map((s) => {
                    let className = "flex-col step-item ";
                    if (step > s.id || (s.id === 4 && isPublished)) {
                        className += "completed-step";
                    } else if (step === s.id) {
                        className += "active-step";
                    }

                    return (
                        // onClick={() => setStep(s.id)} for future
                        <div key={s.id} className={className} >
                            <div className="step-label">{s.label}</div>
                            <div className="step-subtext">{s.subtext}</div>
                        </div>
                    );
                })}
            </div>

            <div className="step-content">
                {step === 1 && (
                    <InputPageDetail
                        data={formData}
                        onChange={updateFormData}
                        onNext={handleNext}
                    />
                )}
                {step === 2 && (
                    <DesignYourPage
                        data={formData}
                        onChange={updateFormData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {step === 3 && (
                    <PreviewAndPublish
                        data={formData}
                        onNext={() => {
                            setIsPublished(true);
                            setStep(4);
                        }}
                        onBack={handleBack}
                    />
                )}
                {step === 4 && (
                    <FinishPage
                        data={formData}
                        pageName={pageName}
                        pagePath={pagePath}
                    />
                )}
            </div>
        </div>
    );
}

export default CreatePage;
