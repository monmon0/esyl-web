"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import gsap from "gsap";

/**
 * Wraps its children in a liquid-wave mask that reveals them from the
 * bottom up on mount, with a living sine-wave crest. Mask coordinates are
 * in objectBoundingBox space (0-1) so this works at any element size.
 */

export const wavePath = (level: number, t: number, segments = 40) => {
  const base = 1 - level;
  const amp = 0.05 * Math.sin(Math.PI * Math.min(Math.max(level, 0), 1));
  const step = 1 / segments;
  let d = "";
  for (let x = 0; x <= 1 + 1e-6; x += step) {
    const y =
      base +
      amp *
        (0.7 * Math.sin(x * 22 + t * 2.3) + 0.3 * Math.sin(x * 50 - t * 3.6));
    d += `${x === 0 ? "M" : "L"} ${x.toFixed(4)} ${y.toFixed(4)} `;
  }
  return `${d}L 1 1 L 0 1 Z`;
};

export function HeroWaveReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskId = `hero-wave-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The sine-wave mask reveal is a desktop-only flourish. Coarse-pointer
    // (mobile) devices skip it entirely — no mask, no scale-in — and get a
    // plain blur-to-sharp fade on load instead, which is both cheaper (no
    // continuous mask/compositing work) and what the wave was standing in
    // for on small screens anyway.
    const isCoarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;

    if (isCoarsePointer) {
      container.style.mask = "none";
      container.style.webkitMask = "none";
      const tween = gsap.fromTo(
        container,
        { opacity: 0, filter: "blur(16px)" },
        { opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
      );
      return () => {
        tween.kill();
      };
    }

    const state = { level: 0, t: 0 };
    const apply = () => {
      pathRef.current?.setAttribute("d", wavePath(state.level, state.t));
    };

    const tl = gsap.timeline({ onUpdate: apply });
    tl.to(state, { level: 1.05, duration: 2, ease: "power2.inOut" }, 0);
    tl.to(state, { t: 7, duration: 2, ease: "none" }, 0);
    tl.fromTo(
      container,
      { scale: 1.15, filter: "blur(12px)" },
      { scale: 1, filter: "blur(0px)", duration: 2, ease: "power2.inOut" },
      0,
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        mask: `url(#${maskId})`,
        WebkitMask: `url(#${maskId})`,
      }}
    >
      {children}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <mask id={maskId} maskContentUnits="objectBoundingBox">
            <path ref={pathRef} d={wavePath(0, 0)} fill="#fff" />
          </mask>
        </defs>
      </svg>
    </div>
  );
}
