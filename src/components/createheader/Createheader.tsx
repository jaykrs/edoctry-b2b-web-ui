"use client";
import React, { useState } from "react";
import InputHeaderDetail from "./Steps/InputHeaderDetail";
import DesignYourHeader from "./Steps/DesignYourHeader";
import DesignYourFooter from "./Steps/DesignYourFooter";
import FinishPage from "./Steps/Finish";
import { apiUrl } from "@/utils/config";

function CreateHeader() {
  const [step, setStep] = useState(1);
  const [isPublished, setIsPublished] = useState(false); 

  const [formData, setFormData] = useState({
    name: "",
    published: false,
    author: "",
    header_html_element: "",
    footer_html_element: "",
    header_footer_json: [
      {
        type: "heading",
        level: 1,
        format: null,
        children: [{ text: "", type: "text" }],
      },
    ],
    clientsidelibs: "",
  });

  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Final submit
  const handleSubmit = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch(`${apiUrl}/api/headerfooters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to create header");

      const data = await response.json();
      console.log("✅ Header created successfully:", data);

      setStep(4);
      setIsPublished(true);
    } catch (error) {
      console.error("❌ Error creating header:", error);
    }
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const steps = [
    { id: 1, label: "Add Header Details", subtext: "Enter basic information about your header" },
    { id: 2, label: "Design Your Header", subtext: "Customize the layout and design of your header" },
    { id: 3, label: "Design your Footer", subtext: "Customize the layout and design of your footer" },
    { id: 4, label: "Finish", subtext: "Complete the setup of your header" },
  ];

  return (
    <div className="createpage-container">
      <div className="stepper-container mb-4" style={{ userSelect: 'none' }}>
        {steps.map((s) => {
          let className = "flex-col step-item ";
          if (step > s.id || (s.id === 4 && isPublished)) {
            className += "completed-step"; 
          } else if (step === s.id) {
            className += "active-step";
          }

          return (
            //onClick={() => setStep(s.id)}
            <div key={s.id}  className={className} >
              <div className="step-label">{s.label}</div>
              <div className="step-subtext">{s.subtext}</div>
            </div>
          );
        })}
      </div>

      <div className="step-content">
        {step === 1 && (
          <InputHeaderDetail
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <DesignYourHeader
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <DesignYourFooter
            data={formData}
            onChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 4 && <FinishPage onPublish={handleSubmit} />}
      </div>
    </div>
  );
}

export default CreateHeader;
