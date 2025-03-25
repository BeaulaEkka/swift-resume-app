"use client";

import { ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
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
          className="max-h-30 inline-block w-full  text-center pb-4"
        >

          <div className="flex min-h-[40px] flex-col items-center justify-center">
            <p className="line-clamp-1 flex-1 font-semibold capitalize">
              {resume.title || "No title"}
            </p>
            <p className="line-clamp-1 flex-1 text-gray-500">
              {resume.description || "No description"}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:MM a")}
          </p>
        </Link>
        <div className="shadow-md">
          <Link
            href={`editor?resumeId=${resume.id}`}
            className="relative inline-block w-full"
          >
            <ResumePreview
              resumeData={mapToResumeValues(resume)}
              className="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
            />
            <div className="from-white-transparent absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t" />
          </Link>
        </div>
      </div>
    </div>
  );
}
