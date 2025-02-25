import { Button } from "@/components/ui/button";
import { Squircle } from "lucide-react";
import React from "react";

interface BorderStyleButtonProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string | undefined) => void;
}
export default function BorderStyleButton({
  borderStyle,
  onChange,
}: BorderStyleButtonProps) {
  function handleClick() {}
  return (
    <Button
      variant="outline"
      size="icon"
      title="change border style"
      onClick={handleClick}
    >
      <Squircle className="size-5" />
    </Button>
  );
}
