"use client";

/**
 * Hero + keyhole reveal — the hero stays pinned (sticky) and static on
 * screen while a keyhole-shaped clip-path laid on top of it grows in
 * lockstep with scroll, revealing the next section through the hole until
 * it fills the whole frame.
 *
 * Both layers live inside the SAME sticky box (not two separate sticky
 * elements) so they pin together as one unit — the growing clip-path is
 * applied to a plain descendant, never to an ancestor of the sticky element,
 * which is what would break its sticky behavior (see the note this replaced
 * in flipbook-page-turn's history).
 */

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const KEYHOLE_PATH =
  "M 9 2.5 C 11.37 2.5 13.3 4.43 13.3 6.8 C 13.3 8.44 12.42 9.85 11.2 10.49 L 12.62 15.43 C 12.77 15.96 12.37 16.5 11.81 16.5 L 6.19 16.5 C 5.63 16.5 5.23 15.96 5.38 15.43 L 6.8 10.49 C 5.58 9.85 4.7 8.44 4.7 6.8 C 4.7 4.43 6.63 2.5 9 2.5 Z";
const KEYHOLE_CX = 9;
const KEYHOLE_CY = 9.5;
const WAIST = 2.4; // closest outline point to the center — the circle/stem junction

const KEYHOLE_NUMS = KEYHOLE_PATH.match(/-?\d*\.?\d+/g)!.map(Number);

function keyholeClip(s: number, cx: number, cy: number) {
  const out: number[] = [];
  for (let k = 0; k < KEYHOLE_NUMS.length; k += 2) {
    const dx = (KEYHOLE_NUMS[k] - KEYHOLE_CX) * s;
    const dy = (KEYHOLE_NUMS[k + 1] - KEYHOLE_CY) * s;
    out.push(cx + dx, cy + dy);
  }
  let j = 0;
  const d = KEYHOLE_PATH.replace(/-?\d*\.?\d+/g, () => out[j++].toFixed(2));
  return `path("${d}")`;
}

export function HeroKeyholeReveal({
  hero,
  next,
}: {
  hero: ReactNode;
  next: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = root.current;
    const mask = maskRef.current;
    if (!r || !mask) return;

    mask.style.clipPath = "polygon(50% 50% ,50% 50%, 50% 50%)";

    const cx = mask.clientWidth / 2;
    const cy = mask.clientHeight / 2;
    const maxScale = (Math.hypot(cx, cy) / WAIST) * 1.12;

    const st = ScrollTrigger.create({
      trigger: r,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        mask.style.clipPath = keyholeClip(self.progress * maxScale, cx, cy);
      },
    });

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(r);

    return () => {
      st.kill();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="relative h-[200dvh] w-full">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {hero}
        <div ref={maskRef} className="absolute inset-0 z-10 overflow-hidden">
          {next}
        </div>
      </div>
      {/* Scroll target for links into the fully-revealed section behind the
          keyhole — anchoring here (rather than the root's own top) lands the
          jump at "bottom bottom" of the scroll range, once the hole is fully
          open. */}
      <div id="profile" className="pointer-events-none absolute bottom-0 h-px w-full" />
    </div>
  );
}
