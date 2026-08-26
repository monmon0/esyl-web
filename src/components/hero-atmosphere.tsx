"use client";

/**
 * Purely decorative light-ray layer for the hero. Sits underneath the
 * video/image backdrop (negative z-index) with pointer-events disabled, so
 * it never intercepts the sound-toggle click or the wave-transition scroll,
 * and only peeks out around the backdrop's edges rather than washing over
 * the character art. Static — the rays animate on their own internal
 * shader clock, not the mouse.
 */

import LightRays from "@/components/light-rays";

export function HeroAtmosphere({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <LightRays
        backgroundColor="transparent"
        raysColor={{ mode: "single", color: "#ffffff" }}
        intensity={13}
        rays={32}
        reach={16}
        position={50}
        animation={{ animate: true, speed: 6 }}
        style={{ zIndex: 0, mixBlendMode: "overlay", opacity: 0.2 }}
      />
    </div>
  );
}
