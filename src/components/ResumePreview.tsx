import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React, { RefObject, useRef } from "react";

import {
  CleanLayout,
  CreativeLayout,
  DefaultLayout,
  ElegantLayout,
  LayoutType,
  MinimalLayout,
  ModernLayout,
} from "@/app/(main)/editor/layoutStyles/layoutStyles";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  selectedLayout?: LayoutType;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export default function ResumePreview({
  resumeData,
  selectedLayout = LayoutType.DEFAULT,
  contentRef,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef as RefObject<HTMLElement>);

  const layoutComponents: Record<LayoutType, React.ComponentType<any>> = {
    [LayoutType.DEFAULT]: DefaultLayout,
    [LayoutType.MODERN]: ModernLayout,
    [LayoutType.MINIMAL]: MinimalLayout,
    [LayoutType.CLEAN]: CleanLayout,
    [LayoutType.ELEGANT]: ElegantLayout,
    [LayoutType.CREATIVE]: CreativeLayout,
  };

  const LayoutComponent = layoutComponents[selectedLayout] || DefaultLayout;

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        <LayoutComponent resumeData={resumeData} />
      </div>
    </div>
  );
}
