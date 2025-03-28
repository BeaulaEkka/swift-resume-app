import React from "react";
import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";
import prisma from "@/lib/prisma";

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
          userId: userId || undefined,
        },
        include: resumeDataInclude,
      })
    : null;

  return (
    <div>
      <ResumeEditor resumeToEdit={resumeToEdit} />
    </div>
  );
}
