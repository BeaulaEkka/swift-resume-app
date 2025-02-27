"use client";

import React, { useState } from "react";
import { steps } from "./steps";
import { useSearchParams } from "next/navigation";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { ResumeValues } from "@/lib/validation";
import ResumePreview from "@/components/ResumePreview";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";

export default function ResumeEditor() {
  const [resumeData, setResumeData] = useState<ResumeValues>({});
  const searchparams = useSearchParams();
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const currentStep = searchparams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchparams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;
  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically
        </p>
      </header>
      <main className="grow">
        <div className="flex w-full">
          <div
            className={
              (cn("w-full space-y-6 overflow-y-auto p-3 md:w-1/2"),
              showSmResumePreview && "hidden")
            }
          >
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />

          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
          {/* <pre>{JSON.stringify(resumeData, null, 2)}</pre> */}
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
      />
    </div>
  );
}
