"use client";

/**
 * A visual-novel-style dialogue box: the unrolled paper-scroll.webp image
 * itself IS the bubble (no rectangle behind/around it), with asset3.png (ink
 * bottle + quill) hanging off its bottom-left corner, and the speaker's name
 * in a small tag that overlaps the top-left corner. Tapping/clicking
 * advances through `lines`, looping after the last one. (A tap here also
 * triggers the site-wide screen-ripple effect, same as any other click —
 * see screen-ripple.tsx — no extra wiring needed here.)
 *
 * The button is locked to the scroll image's own aspect ratio (477:350) and
 * padded well clear of its curled ends and torn top/bottom edges, so text
 * only ever sits on the flat parchment in the middle.
 *
 * Deliberately has no `position` utility of its own on the root — callers
 * position it via `className` (always `absolute`/`fixed`). Mixing a
 * `relative` here with an `absolute` from the caller on the same element is
 * a real Tailwind footgun: both are single-class selectors, so whichever
 * one happens to come later in the generated stylesheet wins, regardless of
 * class order in the markup — that ambiguity is what made this box vanish
 * on desktop.
 */

import Image from "next/image";
import { useState } from "react";
import {
  NARISS_BADGE_BORDER,
  NARISS_BADGE_CREAM,
  NARISS_BADGE_INK,
  NARISS_DEEP_BLUE,
} from "@/lib/colors";

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
    <div
      className={`w-64 max-w-full sm:w-[18rem] md:w-[20rem] ${className ?? ""}`}
    >
      {speaker && (
        <div
          className="relative z-10 ml-10 inline-flex w-fit items-center gap-1.5 rounded-t-lg rounded-br-lg border-2 px-3 py-1 text-xs font-medium  sm:text-sm"
          style={{
            backgroundColor: NARISS_DEEP_BLUE,
            borderColor: NARISS_BADGE_BORDER,
            color: NARISS_BADGE_CREAM,
          }}
        >
          <span aria-hidden>✦</span>
          <span className={speakerClassName}>{speaker}</span>
        </div>
      )}
      <button
        type="button"
        onClick={advance}
        aria-label="Show next line"
        className={`relative block aspect-[477/350] w-full bg-contain bg-center bg-no-repeat px-16 py-10 text-left transition-transform active:scale-[0.99] sm:px-20 sm:py-12 ${
          speaker ? "-mt-3" : ""
        }`}
        style={{ backgroundImage: "url('/paper-scroll.webp')" }}
      >
        <Image
          src="/asset3.png"
          alt=""
          aria-hidden
          width={1063}
          height={2008}
          className="pointer-events-none absolute -bottom-3 left-6 h-auto w-10 drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)] sm:w-14"
        />
        <p
          className="line-clamp-3 pl-5 text-xs leading-relaxed sm:text-sm"
          style={{ color: NARISS_BADGE_INK }}
          aria-live="polite"
        >
          {lines[index]}
        </p>
        {lines.length > 1 && (
          <span
            className="mt-1 block pr-5 md:pr-10 animate-bounce text-right text-[9px]  uppercase opacity-60"
            style={{ color: NARISS_BADGE_INK }}
            aria-hidden
          >
            tap ▼
          </span>
        )}
      </button>
    </div>
  );
}
