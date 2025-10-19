"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import DesignYourPage from "./Steps/DesignYourPage";
import PreviewAndPublish from "../createpage/Steps/PreviewandPublish";
import FinishPage from "../createpage/Steps/Finish";

export default function EditPage() {
    const searchParams = useSearchParams();
    const pageId = searchParams?.get("pid");
    const [step, setStep] = useState(1);
    const [isPublished, setIsPublished] = useState(false);
    const [pageData, setPageData] = useState<any>(null);


    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

    const steps = [
        { id: 1, label: "Design Your Page", subtext: "Customize the layout and design of your page" },
        { id: 2, label: "Preview and Publish", subtext: "Review your changes before publishing" },
        { id: 3, label: "Finish", subtext: "Complete the setup of your page" },
    ];

    return (
        <div className="createpage-container">
            <div className="stepper-container mb-4" style={{ userSelect: "none" }}>
                {steps.map((s) => {
                    let className = "flex-col step-item ";
                    if (step > s.id || (s.id === 4 && isPublished)) className += "completed-step";
                    else if (step === s.id) className += "active-step";

                    return (
                        //onClick={() => setStep(s.id)}
                        <div key={s.id}  className={className}>
                            <div className="step-label">{s.label}</div>
                            <div className="step-subtext">{s.subtext}</div>
                        </div>
                    );
                })}
            </div>

            <div className="step-content">
                {step === 1 && (
                    <DesignYourPage
                        pageId={pageId}
                        onNext={(data) => {
                            setPageData(data); 
                            handleNext();      
                        }}
                    />
                )}
                {step === 2 && pageData && (
                    <PreviewAndPublish onBack={handleBack} onNext={handleNext} data={pageData} />
                )}

                {step === 3 && <FinishPage />}
            </div>
        </div>
    );
}
