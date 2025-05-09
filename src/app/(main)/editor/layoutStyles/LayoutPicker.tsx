import { mockupResumeData } from "@/lib/mockupResumeData";
import {
  CleanLayout,
  DefaultLayout,
  ElegantLayout,
  LayoutType,
  MinimalLayout,
  ModernLayout,
  CreativeLayout,
} from "./layoutStyles";
import { cn } from "@/lib/utils";

interface LayoutPickerProps {
  selected: LayoutType;
  onSelect: (type: LayoutType) => void;
}

const layoutComponents: Record<LayoutType, React.ComponentType<any>> = {
  [LayoutType.DEFAULT]: DefaultLayout,
  [LayoutType.MODERN]: ModernLayout,
  [LayoutType.MINIMAL]: MinimalLayout,
  [LayoutType.CLEAN]: CleanLayout,
  [LayoutType.ELEGANT]: ElegantLayout,
  [LayoutType.CREATIVE]: CreativeLayout,
};

const layoutLabels: Record<LayoutType, string> = {
  [LayoutType.DEFAULT]: "Default",
  [LayoutType.MODERN]: "Modern",
  [LayoutType.MINIMAL]: "Minimal",
  [LayoutType.CLEAN]: "Clean",
  [LayoutType.ELEGANT]: "Elegant",
  [LayoutType.CREATIVE]: "Creative",
};

export default function LayoutPicker({
  selected,
  onSelect,
}: LayoutPickerProps) {
  return (
    <div className="flex flex-col space-y-2 border-l p-5">
      <h2 className="text-sm font-medium uppercase text-muted-foreground">
        Choose a Layout
      </h2>
      <div className="flex w-full flex-col gap-4">
        {Object.entries(layoutComponents).map(([type, Component]) => (
          <button
            key={type}
            onClick={() => onSelect(type as LayoutType)}
            className={cn(
              "flex flex-col transition-all",
              selected === type
                ? "border-primary ring-2 ring-primary"
                : "ring-muted hover:ring-1",
            )}
          >
            <div className="relative aspect-[794/1123] w-full max-w-[160px] overflow-hidden rounded border bg-white shadow">
              <div className="pointer-events-none absolute left-0 top-0 h-[1123px] w-[794px] origin-top-left scale-[0.15]">
                <Component resumeData={mockupResumeData} />
              </div>
            </div>
            <p className="mt-2 text-center text-sm font-semibold">
              {layoutLabels[type as LayoutType]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
