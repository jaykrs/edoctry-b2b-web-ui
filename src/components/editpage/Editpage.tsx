"use client";
import React, { useState , useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InputPageDetail from "./Steps/InputPageDetail";
import DesignYourPage from "./Steps/DesignYourPage";
import PreviewAndPublish from "./Steps/PreviewandPublish";
import Finish from "./Steps/Finish";
import { apiUrl } from "@/utils/config";

export default function EditPage() {
  const searchParams = useSearchParams();
  const pageId = searchParams?.get("pid");

  const [step, setStep] = useState(1);

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
    setFormData((prev) => ({
      ...prev,
      ...newData
    }));
  };

  const handleNext = () => setStep((prev) => prev + 1);

  const handleBack = () =>
    setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleUpdatePage = async () => {
    const token = localStorage.getItem("jwt");

    try {
      const res = await fetch(`${apiUrl}/api/pages/${pageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: formData
        })
      });

      if (!res.ok) {
        alert("Update failed");
        return;
      }

      setStep(4);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  useEffect(() => {

  const fetchPage = async () => {

    const token = localStorage.getItem("jwt");

    const res = await fetch(`${apiUrl}/api/pages/${pageId}`, {
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    const result = await res.json();
    const attrs = result?.data?.attributes;

    setFormData(attrs);

  };

  if(pageId){
    fetchPage();
  }

},[pageId]);

  return (
    <div className="createpage-container">

      {/* STEP 1 */}
      {step === 1 && (
        <InputPageDetail
          data={formData}
          onChange={updateFormData}
          onNext={handleNext}
        />
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <DesignYourPage
          pageId={pageId}
          data={formData}
          onChange={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <PreviewAndPublish
          data={formData}
          onBack={handleBack}
          onPublish={handleUpdatePage}
        />
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <Finish
          pageName={formData.name}
        />
      )}

    </div>
  );
}