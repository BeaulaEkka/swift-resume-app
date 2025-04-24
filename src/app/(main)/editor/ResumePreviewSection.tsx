import { ResumeValues } from "@/lib/validation";
import React from "react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";
import { cn } from "@/lib/utils";
import {
  CleanLayout,
  DefaultLayout,
  LayoutType,
  MinimalLayout,
  ModernLayout,
} from "./layoutStyles/layoutStyles";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
  layout: LayoutType;
}
export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
  layout,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2", className)}
    >
      <div className="absolute left-3 top-3 flex flex-none flex-col gap-3 opacity-50 transition-opacity group-hover:opacity-100 lg:left-36 xl:opacity-100">
        <div className="mx-auto flex gap-3">
          <ColorPicker
            color={resumeData?.colorHex ?? "#000000"}
            onChange={(color) =>
              setResumeData({ ...resumeData, colorHex: color.hex })
            }
          />
          <BorderStyleButton
            borderStyle={resumeData?.borderStyle ?? undefined}
            onChange={(borderStyle) =>
              setResumeData({ ...resumeData, borderStyle })
            }
          />
        </div>
      </div>

      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3 pt-14">
        {/* <ResumePreview resumeData={resumeData} className="max-w-2xl border" /> */}
        <div className={cn("preview-container", className)}>
          {layout === LayoutType.DEFAULT && (
            <DefaultLayout
              resumeData={resumeData}
              className="max-w-2xl border"
            />
          )}
          {layout === LayoutType.MODERN && (
            <ModernLayout
              resumeData={resumeData}
              className="max-w-2xl border"
            />
          )}
          {layout === LayoutType.MINIMAL && (
            <MinimalLayout
              resumeData={resumeData}
              className="max-w-2xl border"
            />
          )}
          {layout === LayoutType.CLEAN && (
            <CleanLayout resumeData={resumeData} className="max-w-2xl border" />
          )}
          {layout === LayoutType.ELEGANT && (
            <CleanLayout resumeData={resumeData} className="max-w-2xl border" />
          )}
          {layout === LayoutType.CREATIVE && (
            <CleanLayout resumeData={resumeData} className="max-w-2xl border" />
          )}
        </div>
      </div>
    </div>
  );
}
