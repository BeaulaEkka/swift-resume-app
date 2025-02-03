"use client";

import React, { useState } from "react";
import { steps } from "./steps";
import { useSearchParams } from "next/navigation";
import BreadCrumbs from "./BreadCrumbs";
import Footer from "./Footer";
import { resumeValues } from "@/lib/validation";

export default function ResumeEditor() {
  const [resumeData, setResumeData] = useState<resumeValues>({});
  const searchparams = useSearchParams();

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
          <div className="w-full p-3 md:w-1/2">
            {/* <GeneralInfoForm /> */}
            {/* <PersonalInfoForm /> */}
            <BreadCrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <div className="hidden w-1/2 md:flex">right</div>
        </div>
      </main>
      <Footer currentStep={currentStep} setCurrentStep={setStep} />
    </div>
  );
}
