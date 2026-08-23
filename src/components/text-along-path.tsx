"use client";

/**
 * Text gliding endlessly in one direction along a curved SVG path.
 *
 * The original text-along-path demo repeats a SHORT phrase along a LONG
 * wavy path, so staggered copies never overlap. Ours is the opposite: a
 * long phrase on a short arc — the phrase's rendered length is close to the
 * path's own length, so a second copy's head/tail always collides with the
 * first somewhere along the curve, no matter how the copies are spaced. The
 * fix is a single copy that travels from fully off-path on the left to
 * fully off-path on the right, then resets — since both ends are off-path
 * (nothing rendered there), the reset happens while invisible, so the loop
 * reads as seamless with no overlap and no visible jump.
 */

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

export function TextAlongPath({
  text,
  color = "currentColor",
  className,
}: {
  text: string;
  color?: string;
  className?: string;
}) {
  const pathId = `text-along-path-${useId().replace(/:/g, "")}`;
  const textPathRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const path = textPathRef.current;
    if (!path) return;

    const tween = gsap.fromTo(
      path,
      { attr: { startOffset: "-100%" } },
      {
        attr: { startOffset: "100%" },
        duration: 10,
        ease: "none",
        repeat: -1,
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <svg viewBox="0 0 300 60" className={className} fill="none" aria-hidden>
      <path id={pathId} d="M10,50 C 80,5 220,5 290,50" fill="none" />
      <text fill={color} className="text-[13px] tracking-[0.35em] uppercase">
        <textPath ref={textPathRef} href={`#${pathId}`} startOffset="-100%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
