// app/main/editor/layoutStyles/LayoutPicker.tsx

import { LayoutType } from "./layoutStyles";

interface LayoutPickerProps {
  selected: LayoutType;
  onSelect: (layout: LayoutType) => void;
}

export default function LayoutPicker({
  selected,
  onSelect,
}: LayoutPickerProps) {
  return (
    <div className="flex gap-4">
      {Object.values(LayoutType).map((layout) => (
        <button
          key={layout}
          onClick={() => onSelect(layout)}
          className={`rounded border px-4 py-2 ${selected === layout ? "bg-black text-white" : "bg-white text-black"}`}
        >
          {layout}
        </button>
      ))}
    </div>
  );
}
