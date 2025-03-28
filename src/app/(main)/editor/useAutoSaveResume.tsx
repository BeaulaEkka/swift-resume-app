import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { saveResume } from "./actions";

export default function useAutoSaveResume(resumeData: ResumeValues | undefined | null) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const debouncedResumeData = useDebounce(resumeData, 1500);

  // const [resumeId, setResumeId] = useState(resumeData.id);
  // const [lastSavedData, setLastSavedData] = useState(resumeData);
  const [resumeId, setResumeId] = useState(resumeData?.id ?? null);
  const [lastSavedData, setLastSavedData] = useState(resumeData ?? {});

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  const save = useCallback(async () => {
    setIsSaving(true);
    try {
      // const newData = structuredClone(debouncedResumeData);
      const newData = {
        ...structuredClone(debouncedResumeData),
        skills: debouncedResumeData.skills ?? [], // Ensure skills is an array
        title: debouncedResumeData.title ?? "", // Ensure title is a string
        description: debouncedResumeData.description ?? "", // Ensure description is a string
        summary: debouncedResumeData.summary ?? "", // Ensure summary is a string
      };

      const updatedResume = await saveResume({
        ...newData,
        ...(lastSavedData.photo?.toString() === newData.photo?.toString()
          ? { photo: undefined }
          : {}),
        id: resumeId,
      });

      setResumeId(updatedResume.id);
      setLastSavedData(debouncedResumeData);

      // Update URL if resume ID changes
      if (searchParams.get("resumeId") !== String(updatedResume.id)) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("resumeId", updatedResume.id);
        window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
      }
    } catch (error) {
      setIsError(true);
      console.error(error);

      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Could not save changes</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                save();
              }}
            >
              Retry
            </Button>
          </div>
        ),
      });
    } finally {
      setIsSaving(false);
    }
  }, [debouncedResumeData, lastSavedData, resumeId, searchParams, toast]);

  useEffect(() => {
    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSavedData,
    isError,
    save,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
