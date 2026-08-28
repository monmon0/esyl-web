"use client";

/**
 * Mobile-only replacement for scrolling between the hero, profile, and card
 * stack sections: an up/down arrow pair fixed to the right edge moves
 * through them one at a time, symmetrically in both directions — nothing
 * skipped, and going back always reverses exactly what going forward did.
 *
 * Hero and profile are simple full-height slides, moved between via a CSS
 * transform (no scroll). The card stack can't join them as a transform
 * slide — its stacking animation is driven by real window scroll via
 * framer-motion, and needs actual scrollable height to play out — so
 * "arriving" there is a smooth-scroll instead, tracked via
 * IntersectionObserver so the buttons know which mode they're in: the down
 * arrow scrolls it into view once already on the last slide, and the up
 * arrow (once past the slides) scrolls back up to the profile slide rather
 * than being a dead end.
 *
 * Starts on the profile slide if the URL already points at #profile (e.g.
 * the hamburger menu's "Profile" link), so that deep link still works now
 * that a plain hash-scroll wouldn't land on the right slide.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { NARISS_ACCENT_BLUE } from "@/lib/colors";

const SLIDE_COUNT = 2;

export function MobileSectionPager({
  hero,
  profile,
  nextSectionId,
}: {
  hero: ReactNode;
  profile: ReactNode;
  /** id of the section that follows in normal flow (scrolled into view past the last slide). */
  nextSectionId: string;
}) {
  const [index, setIndex] = useState(0);
  const [pastSlides, setPastSlides] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#profile") {
      setIndex(1);
    }
  }, []);

  useEffect(() => {
    const target = document.getElementById(nextSectionId);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastSlides(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [nextSectionId]);

  // `overflow-hidden` on the root only clips its contents visually — it
  // doesn't stop the page itself from scrolling, so a swipe would move the
  // whole document past this block instead of respecting the transform
  // slide. Block wheel/touch scrolling that originates inside this block
  // while still on the paged slides, forcing the arrow buttons; scoped to
  // this subtree (via rootRef) rather than the whole window so it doesn't
  // also block scrolling inside the portaled info modal.
  useEffect(() => {
    if (pastSlides) return;
    const root = rootRef.current;
    if (!root) return;
    const prevent = (event: Event) => {
      if (root.contains(event.target as Node)) {
        event.preventDefault();
      }
    };
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [pastSlides]);

  const goForward = () => {
    if (pastSlides) return;
    if (index === SLIDE_COUNT - 1) {
      document
        .getElementById(nextSectionId)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setIndex(index + 1);
  };

  const goBack = () => {
    if (pastSlides) {
      setIndex(SLIDE_COUNT - 1);
      rootRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setIndex(Math.max(index - 1, 0));
  };

  const atStart = !pastSlides && index === 0;

  return (
    <div ref={rootRef} className="relative h-dvh w-full overflow-hidden">
      <div
        className="flex h-full w-full flex-col transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        <div className="h-dvh w-full shrink-0">{hero}</div>
        <div id="profile" className="h-dvh w-full shrink-0">
          {profile}
        </div>
      </div>

      <div className="fixed top-1/2 right-4 z-40 flex -translate-y-1/2 flex-col gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={atStart}
          aria-label="Previous section"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-opacity disabled:opacity-30"
          style={{ color: NARISS_ACCENT_BLUE }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goForward}
          disabled={pastSlides}
          aria-label="Next section"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-opacity disabled:opacity-30"
          style={{ color: NARISS_ACCENT_BLUE }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
