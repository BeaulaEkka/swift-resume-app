import React from "react";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { auth } from "@clerk/nextjs/server";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};
export default async function page({ searchParams }: PageProps) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: {
          id: resumeId,
          userId,
        },
        include: 
      })
    : null;

  return (
    <div>
      <ResumeEditor />
    </div>
  );
}
