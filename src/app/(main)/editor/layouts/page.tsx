"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function LayoutSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const selectLayout = (layoutName: string) => {
    if (!resumeId) return;
    router.push(`/editor?resumeId=${resumeId}&layout=${layoutName}`);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Choose a layout</h1>
      <div className="flex gap-4">
        <button onClick={() => selectLayout("Layout1")} className="border p-4">
          Layout 1
        </button>
        <button onClick={() => selectLayout("Layout2")} className="border p-4">
          Layout 2
        </button>
      </div>
    </div>
  );
}
