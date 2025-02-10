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
  return (
    <div className={cn("aspect-[210/297] h-fit w-full bg-red-500", className)}>
      <h1 className="p-6 text-3xl font-bold">
        This text should change with the size of the container{" "}
      </h1>
    </div>
  );
}
