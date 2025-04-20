import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LayoutStyleButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick() {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("step", "layoutStyles");
    router.push(`/main/editor?${newParams.toString()}`);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change layout style"
      onClick={handleClick}
    >
      <LayoutDashboardIcon className="size-5" />
    </Button>
  );
}
