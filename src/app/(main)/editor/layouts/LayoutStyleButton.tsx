import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LayoutStyleButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      title="change layout style"
      onClick={() => router.push("/editor/layouts")}
    >
      <LayoutDashboardIcon className="size-5" />
      Change Layout
    </Button>
  );
}
