"use client";

/**
 * Adds a bit of friction where scroll crosses a section boundary: the first
 * wheel/touch tick that would carry the page across the line is absorbed
 * and scrolling briefly holds still, instead of continuing straight
 * through. Resets once the page has scrolled clearly away from the
 * boundary, so the next approach (in either direction) resists again.
 */

import { useEffect, useRef } from "react";

const RESISTANCE_ZONE_PX = 150;
const RESISTANCE_DELAY_MS = 550;

export function ScrollResistance({ boundaryId }: { boundaryId: string }) {
  const lockedRef = useRef(false);
  const resistedRef = useRef(false);

  useEffect(() => {
    const boundary = document.getElementById(boundaryId);
    if (!boundary) return;

    const getBoundaryY = () => boundary.getBoundingClientRect().top + window.scrollY;

    const resist = () => {
      lockedRef.current = true;
      resistedRef.current = true;
      window.setTimeout(() => {
        lockedRef.current = false;
      }, RESISTANCE_DELAY_MS);
    };

    const maybeResist = (currentY: number, projectedY: number, boundaryY: number) => {
      const crossed =
        (currentY < boundaryY && projectedY >= boundaryY) ||
        (currentY > boundaryY && projectedY <= boundaryY);

      if (crossed && !resistedRef.current) {
        resist();
        return true;
      }

      if (Math.abs(currentY - boundaryY) > RESISTANCE_ZONE_PX) {
        resistedRef.current = false;
      }

      return false;
    };

    const onWheel = (event: WheelEvent) => {
      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const currentY = window.scrollY;
      const boundaryY = getBoundaryY();
      if (Math.abs(currentY - boundaryY) > RESISTANCE_ZONE_PX) return;

      if (maybeResist(currentY, currentY + event.deltaY, boundaryY)) {
        event.preventDefault();
      }
    };

    let touchY: number | null = null;

    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (lockedRef.current) {
        event.preventDefault();
        return;
      }

      const nextTouchY = event.touches[0]?.clientY;
      if (touchY == null || nextTouchY == null) return;

      const delta = touchY - nextTouchY; // finger moving up => scrolling down
      touchY = nextTouchY;

      const currentY = window.scrollY;
      const boundaryY = getBoundaryY();
      if (Math.abs(currentY - boundaryY) > RESISTANCE_ZONE_PX) return;

      if (maybeResist(currentY, currentY + delta, boundaryY)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [boundaryId]);

  return null;
}
