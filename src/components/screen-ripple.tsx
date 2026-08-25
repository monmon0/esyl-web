"use client";

/**
 * Slow, serene water-ripple rings that spawn wherever the user clicks,
 * anywhere on the site, and fade out over a few seconds. Mounted once (see
 * layout.tsx) with a single document-level click listener, rather than
 * wired into every clickable component individually.
 *
 * Rendered through a portal to <body> so the rings sit in true viewport
 * space regardless of any transformed ancestor near the click (several of
 * this site's containers use translate/scale, which would otherwise become
 * the containing block for a plain `position: fixed` element).
 */

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { NARISS_LIGHT_BLUE } from "@/lib/colors";

type Ripple = { id: number; x: number; y: number };

const RING_DELAYS = [0, 0.4];
const RING_DURATION = 2.8;
const RING_SIZE = 560;

let nextRippleId = 0;

function subscribeNever() {
  return () => {};
}

/**
 * True once hydrated on the client, false during SSR and the initial
 * hydration pass — this is the React-sanctioned way to defer client-only
 * rendering (like a portal to `document.body`) without a hydration
 * mismatch. An effect that calls `setState(true)` on mount looks
 * equivalent, but it makes the *first* client render already diverge from
 * the server output (since `useEffect` schedules after that first paint,
 * not before), which is exactly the mismatch this avoids.
 */
function useIsClient() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}

export function ScreenRippleLayer() {
  const isClient = useIsClient();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setRipples((prev) => [
        ...prev,
        { id: nextRippleId++, x: event.clientX, y: event.clientY },
      ]);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  }, []);

  if (!isClient) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <RippleRings
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            onDone={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

function RippleRings({
  x,
  y,
  onDone,
}: {
  x: number;
  y: number;
  onDone: () => void;
}) {
  return (
    <>
      {RING_DELAYS.map((delay, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            translateX: "-50%",
            translateY: "-50%",
            border: `1px solid ${NARISS_LIGHT_BLUE}`,
            boxShadow: `0 0 20px ${NARISS_LIGHT_BLUE}`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.4 }}
          animate={{ width: RING_SIZE, height: RING_SIZE, opacity: 0 }}
          transition={{ duration: RING_DURATION, delay, ease: "easeOut" }}
          onAnimationComplete={i === RING_DELAYS.length - 1 ? onDone : undefined}
        />
      ))}
    </>
  );
}
