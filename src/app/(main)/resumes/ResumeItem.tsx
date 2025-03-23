"use client";

import { ResumeServerData } from "@/lib/types";

interface ResumeItemProps {
  resume: ResumeServerData;
}
export default function ResumeItem({ resume }: ResumeItemProps) {
  const wasUpdated = resume.updatedAt !== resume.createdAt;
  return <div>resume Item</div>;
}
