import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React from "react";

interface ResumePreviwProps {
  resumeData: ResumeValues;
  className?: string;
}
export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviwProps) {
  return <div className={cn("", className)}></div>;
}
