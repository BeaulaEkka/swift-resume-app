import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";

export default function LayoutStyleButton() {
  function handleClick() {
    // Logic to change the layout style goes here
    console.log("Layout style changed!");
  }
  return (
    <Button
      variant="outline"
      size="icon"
      title="change layout style"
      onClick={handleClick}
    >
      <LayoutDashboardIcon className="size-5" />
    </Button>
  );
}
