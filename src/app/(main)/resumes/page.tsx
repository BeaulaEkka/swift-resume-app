import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

//page title
export const metadata: Metadata = {
  title: "Your Resumes",
};
export default function page() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 border border-red-500 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" /> New Resume
        </Link>
      </Button>
      <p>hier will all the resumes be</p>
    </main>
  );
}
