"use client";

/**
 * Fixed bottom-left button that mutes/unmutes the site-wide background
 * music (see music-context.tsx).
 */

import { useMusic } from "@/components/music-context";
import { NARISS_BADGE_BORDER, NARISS_BADGE_CREAM, NARISS_BADGE_INK } from "@/lib/colors";

export function MusicController() {
  const { muted, toggleMuted } = useMusic();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Play background music" : "Mute background music"}
      aria-pressed={!muted}
      className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-lg"
      style={{
        backgroundColor: NARISS_BADGE_CREAM,
        borderColor: NARISS_BADGE_BORDER,
        color: NARISS_BADGE_INK,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 9v6h4l5 4V5L8 9H4Z"
          fill="currentColor"
        />
        {!muted && (
          <path
            d="M16.5 8.5a5 5 0 0 1 0 7M19 6a9 9 0 0 1 0 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {muted && (
          <path
            d="M16 9.5 20 14.5M20 9.5 16 14.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        )}
      </svg>
    </button>
  );
}
