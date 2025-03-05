import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import React, { useEffect, useState } from "react";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const debouncedResumeData = useDebounce(resumeData, 1500);
  const [lastSaveData, setLastSaveData] = useState(structuredClone(resumeData));

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function save() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSaveData(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSaveData);

    if (hasUnsavedChanges && debouncedResumeData) {
      save();
    }
  }, [debouncedResumeData, isSaving, lastSaveData]);
  return { isSaving, hasUnsavedChanges: JSON.stringify(lastSaveData) };
}
