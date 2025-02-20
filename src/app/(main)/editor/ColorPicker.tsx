import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PaletteIcon } from "lucide-react";
import React, { useState } from "react";
import { Color, ColorChangeHandler } from "react-color";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}
export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setshowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setshowPopover}>
      <PopoverTrigger asChild>
        <Button>
          <PaletteIcon />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
