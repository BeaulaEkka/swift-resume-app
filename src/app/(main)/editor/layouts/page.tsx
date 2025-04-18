"use client";

import { layoutStyles } from "@/lib/layoutStyles";
import { useRouter } from "next/navigation";

export default function LayoutSelectionPage() {
  const router = useRouter();

  const handleSelect = (layoutId: string) => {
    router.push(`/?selectedLayout=${layoutId}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 md:grid-cols-3">
      {Object.values(layoutStyles).map((layout) => (
        <div
          key={layout.id}
          className="cursor-pointer rounded border p-4 shadow hover:bg-gray-100"
          onClick={() => handleSelect(layout.id)}
        >
          <h3 className="text-lg font-semibold">{layout.name}</h3>
          {/* optionally preview layout thumbnails */}
          <div className={`h-40 w-full ${layout.className}`}>
            [Preview Here]
          </div>
        </div>
      ))}
    </div>
  );
}
