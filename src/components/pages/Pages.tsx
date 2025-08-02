"use client";
import React, { useState } from 'react';
import PageBody from '@/components/pagenew/PageBody';
import PageHeader from '@/components/pagenew/PageHeader';
import PageFooter from '@/components/pagenew/PageFooter';
import PagePreview from '@/components/pagenew/PagePreview';

function Pages() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };
  

  return (
    <div className="flex flex-col space-y-4 p-4">
      {step === 1 && <PageBody onNext={handleNext} onBack={handleBack} />}
      {step === 2 && <PageHeader onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <PagePreview onBack={handleBack}  />}
    </div>
  );
}

export default Pages;