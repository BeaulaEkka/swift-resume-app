import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface FooterProps {
  currentString: string;
  setCurrentStep: (step: string) => void;
}
export default function Footer() {
  return (
    <footer className="w-full border border-t border-green-500 px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="secondary">Previous Step</Button>
          <Button variant="secondary">Next Step</Button>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">Saving...</p>
        </div>
      </div>
    </footer>
  );
}
