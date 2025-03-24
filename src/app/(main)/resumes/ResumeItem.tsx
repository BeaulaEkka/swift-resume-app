"use client";

import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import ResumePreviewSection from "../editor/ResumePreviewSection";
import { mapToResumeValues } from "@/lib/utils";
import ResumePreview from "@/components/ResumePreview";

interface ResumeItemProps {
  resume: ResumeServerData;
}
export default function ResumeItem({ resume }: ResumeItemProps) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return (
    <div className="group rounded-lg border border-transparent p-2 hover:border-gray-100 hover:bg-gray-50 hover:shadow-sm">
      <div>
        <Link
          href={`/editor?/resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-1 text-gray-500">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:MM a")}
          </p>
        </Link>
        <Link href={`editor?resumeId=${resume.id}`} className="inline-block w-full">
        <ResumePreview resumeData={mapToResumeValues(resume)}/></Link>
      </div>
    </div>
  );
}
