"use client";

import { NARISS_DESIGNS, type NarissDesign } from "@/lib/nariss-designs";

/**
 * Fixed-size rail of swatch buttons for picking which design the portrait
 * frame displays. Kept separate from the frame so it can sit in its own
 * column, sized to its content rather than stretching with the layout.
 */
export function NarissDesignPicker({
  selected,
  onSelect,
  className,
}: {
  selected: NarissDesign["id"];
  onSelect: (id: NarissDesign["id"]) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {NARISS_DESIGNS.map((design) => (
        <button
          key={design.id}
          type="button"
          aria-label={`Show ${design.label} design`}
          aria-pressed={design.id === selected}
          onClick={() => onSelect(design.id)}
          className={`h-7 w-7 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-black transition ${
            design.id === selected
              ? "ring-white"
              : "ring-white/30 hover:ring-white/60"
          }`}
          style={{ backgroundColor: design.swatch }}
        />
      ))}
    </div>
  );
}
