"use client";

/**
 * A visual-novel-style dialogue box built from frame.png — an 818×1111
 * ornate portrait frame, rotated 90° into a landscape banner better suited
 * to a wide line of dialogue. The frame art is pre-sized to its own swapped
 * proportions (818/1111 and 1111/818 of the button box) before rotating so
 * it lands back on the button's edges exactly, instead of distorting or
 * spilling past them. The text panel stays unrotated on top. Tapping/
 * clicking advances through `lines`, looping after the last one. (A tap
 * here also triggers the site-wide screen-ripple effect, same as any other
 * click — see screen-ripple.tsx — no extra wiring needed here.)
 *
 * Deliberately has no `position` utility of its own — callers position it
 * via `className` (always `absolute`/`fixed`). Mixing a `relative` here
 * with an `absolute` from the caller on the same element is a real Tailwind
 * footgun: both are single-class selectors, so whichever one happens to
 * come later in the generated stylesheet wins, regardless of class order
 * in the markup — that ambiguity is what made this box vanish on desktop.
 * Sizing is width-driven (aspect-ratio derives height) rather than the
 * reverse, which is the more broadly-supported direction for `aspect-ratio`
 * on a block box.
 */

import Image from "next/image";
import { useState } from "react";
import { NARISS_GOLD } from "@/lib/colors";

export function DialogueBox({
  lines,
  speaker,
  speakerClassName,
  className,
}: {
  lines: string[];
  speaker?: string;
  /** Extra classes (e.g. a display font) applied to the speaker name. */
  speakerClassName?: string;
  /** Must include a `position` utility (e.g. `absolute ...`). */
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const advance = () => setIndex((prev) => (prev + 1) % lines.length);

  return (
    <button
      type="button"
      onClick={advance}
      aria-label="Show next line"
      className={`block aspect-[1111/818] w-45 max-w-full transition-transform active:scale-[0.98] sm:w-64 md:w-72 ${className ?? ""}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-sm bg-black/55" />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90"
        style={{ width: "73.63%", height: "135.82%" }}
      >
        <Image
          src="/Nariss/frame.png"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 768px) 32vw, 70vw"
          className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        />
      </div>
      <div className="absolute inset-[16%] flex flex-col items-center justify-center gap-1.5 overflow-hidden px-2 text-center">
        {speaker && (
          <p
            className={`text-sm sm:text-base ${speakerClassName ?? ""}`}
            style={{ color: NARISS_GOLD }}
          >
            {speaker}
          </p>
        )}
        <p
          className="line-clamp-3 font-serif text-[11px] leading-snug text-white/90 italic sm:text-xs"
          aria-live="polite"
        >
          {lines[index]}
        </p>
        {lines.length > 1 && (
          <span
            className="mt-0.5 animate-bounce text-[9px] tracking-wide uppercase"
            style={{ color: NARISS_GOLD }}
            aria-hidden
          >
            tap ▼
          </span>
        )}
      </div>
    </button>
  );
}
