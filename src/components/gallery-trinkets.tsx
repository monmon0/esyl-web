/**
 * Decorative alchemy trinkets (asset1/2/4/5.png — the same prop-art set as
 * asset3.png, already used as the dialogue box's ink-and-quill flourish)
 * pinned at the four corners of the page, like charms scattered around the
 * edges of the board the photos are taped to. Absolutely (not fixed)
 * positioned against `main`, so they scroll away with the page instead of
 * staying glued to the viewport and painting over the site footer below.
 */

import Image from "next/image";

const CORNER_TRINKETS = [
  { src: "/asset1.png", className: "top-20 -left-10 -rotate-12" },
  { src: "/asset2.png", className: "top-16 -right-10 rotate-12" },
  { src: "/asset4.png", className: "bottom-10 -left-12 rotate-6" },
  { src: "/asset5.png", className: "bottom-10 -right-10 -rotate-6" },
] as const;

export function GalleryTrinkets() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      {CORNER_TRINKETS.map((trinket) => (
        <div
          key={trinket.src}
          className={`absolute h-48 w-48 opacity-60 ${trinket.className}`}
          style={{ filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.25))" }}
        >
          <Image
            src={trinket.src}
            alt=""
            fill
            sizes="192px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
