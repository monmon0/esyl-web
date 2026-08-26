"use client";

/**
 * Scroll-driven wave reveal between two full-screen sections — the hero
 * stays pinned (sticky) and static on screen while a living sine-wave crest
 * rises from the bottom in lockstep with scroll, revealing the next section
 * beneath it until it fully covers the frame.
 *
 * Both layers live inside the SAME sticky box (not two separate sticky
 * elements) so they pin together as one unit — the growing mask is applied
 * to a plain descendant, never to an ancestor of the sticky element, which
 * is what would break its sticky behavior (see the note this replaced in
 * flipbook-page-turn's history).
 */

import { useEffect, useId, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wavePath } from "@/components/hero-wave-reveal";

gsap.registerPlugin(ScrollTrigger);

export function HeroWaveTransition({
  hero,
  next,
}: {
  hero: ReactNode;
  next: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskId = `hero-wave-transition-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const r = root.current;
    if (!r) return;

    const state = { level: 0, t: 0 };
    const apply = () => {
      pathRef.current?.setAttribute("d", wavePath(state.level, state.t));
    };
    apply();

    const st = ScrollTrigger.create({
      trigger: r,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        state.level = self.progress * 1.05;
        apply();
      },
    });

    // Keeps the crest alive (living sine wave) even while scroll is idle.
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      state.t += dt * 2.3;
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(r);

    return () => {
      st.kill();
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="relative h-[200dvh] w-full">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {hero}
        <div
          className="absolute inset-0 z-10 overflow-hidden"
          style={{
            mask: `url(#${maskId})`,
            WebkitMask: `url(#${maskId})`,
          }}
        >
          {next}
        </div>
        <svg width="0" height="0" aria-hidden className="absolute">
          <defs>
            <mask id={maskId} maskContentUnits="objectBoundingBox">
              <path ref={pathRef} d={wavePath(0, 0)} fill="#fff" />
            </mask>
          </defs>
        </svg>
      </div>
      {/* Scroll target for links into the fully-revealed section behind the
          wave. The sticky box (h-dvh) is pinned for exactly one viewport
          height of scroll inside this h-[200dvh] root — i.e. while the
          anchor's container-relative offset is within [0, 100dvh] — and the
          wave finishes rising (state.level hits 1) at progress ≈ 0.952 of
          that same range, i.e. ~95.2dvh. Anchoring past 100dvh (e.g. at the
          root's own bottom-0) lands scrollIntoView's target after the pin
          has already released into NarissCardStack. Sitting inside the
          [95.2dvh, 100dvh] window keeps the jump on the fully-revealed,
          still-pinned "next" section instead. */}
      <div id="profile" className="pointer-events-none absolute top-[97dvh] h-px w-full" />
    </div>
  );
}
