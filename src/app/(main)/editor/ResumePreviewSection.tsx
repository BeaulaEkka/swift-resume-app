import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/lib/validation";
import React from "react";
import ColorPicker from "./ColorPicker";
import { colors } from "@clerk/themes/dist/clerk-js/src/ui/foundations/colors";
import BorderStyleButton from "./BorderStyleButton";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="group relative hidden md:flex">
      <div className="lg-left-3 lg-top-3 absolute left-1 flex flex-none flex-col gap-3 opacity-50 xl:opacity-100 group-hover:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl border "
        />
      </div>
    </div>
  );
}
