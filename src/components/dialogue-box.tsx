"use client";

/**
 * A visual-novel-style dialogue box: a paper-textured bubble with a thin
 * gold border, asset3.png (ink bottle + quill) hanging off its bottom-left
 * corner, and the speaker's name in a small tag that overlaps the top-left
 * corner. Tapping/clicking advances through `lines`, looping after the last
 * one. (A tap here also triggers the site-wide screen-ripple effect, same
 * as any other click — see screen-ripple.tsx — no extra wiring needed
 * here.)
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
import { NARISS_ACCENT_BLUE, NARISS_BADGE_BORDER, NARISS_BADGE_CREAM, NARISS_BADGE_INK } from "@/lib/colors";

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
    <div className={`w-64 max-w-full sm:w-80 md:w-96 ${className ?? ""}`}>
      {speaker && (
        <div
          className="relative z-10 ml-5 inline-flex w-fit items-center gap-1.5 rounded-t-lg rounded-br-lg border-2 px-3 py-1 text-xs font-medium tracking-wide sm:text-sm"
          style={{
            backgroundColor: NARISS_ACCENT_BLUE,
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
        className={`relative block w-full rounded-xl border-2 bg-cover bg-center px-5 py-4 text-left shadow-lg transition-transform active:scale-[0.99] ${speaker ? "-mt-1" : ""}`}
        style={{
          backgroundColor: NARISS_BADGE_CREAM,
          backgroundImage: "url('/paper-bg.jpg')",
          borderColor: NARISS_BADGE_BORDER,
        }}
      >
        <Image
          src="/asset3.png"
          alt=""
          aria-hidden
          width={1063}
          height={2008}
          className="pointer-events-none absolute -bottom-3 -left-3 h-auto w-12 drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)] sm:w-16"
        />
        <p
          className="line-clamp-3 text-xs leading-relaxed sm:text-sm"
          style={{ color: NARISS_BADGE_INK }}
          aria-live="polite"
        >
          {lines[index]}
        </p>
        {lines.length > 1 && (
          <span
            className="mt-1 block animate-bounce text-right text-[9px] tracking-wide uppercase opacity-60"
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
