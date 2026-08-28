"use client";

/**
 * Wraps the hero gif with a click-to-toggle-sound control, replacing the
 * mouse cursor with a glowing wand-and-star cursor while hovering — blue
 * and silent, gold and singing once the site-wide background music (see
 * music-context.tsx) is unmuted.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { useMusic } from "@/components/music-context";
import { NARISS_ACCENT_BLUE, NARISS_GOLD } from "@/lib/colors";

export function HeroSoundStage({
  src,
  onReady,
  children,
}: {
  /** Path to the animated hero gif. */
  src: string;
  /** Fires once the gif has finished loading. */
  onReady?: () => void;
  children?: ReactNode;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { muted, toggleMuted } = useMusic();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  // A cache-warm gif can finish loading — and fire its native "load" event
  // — before React hydrates and attaches the onLoad listener below,
  // dropping the event entirely and leaving onReady never called.
  // Checking `complete` on mount catches that race.
  useEffect(() => {
    if (imgRef.current?.complete) {
      onReady?.();
    }
  }, [onReady]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = container.getBoundingClientRect();
      setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };
    const handleLeave = () => setCursor(null);

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={toggleMuted}
      data-pop
      className="relative h-full w-full overflow-hidden [@media(pointer:fine)]:cursor-none"
    >
      <HeroWaveReveal className="absolute inset-0 z-0 h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- animated
            gif; next/image would flatten it to a static first frame. */}
        <img
          ref={imgRef}
          src={src}
          alt=""
          className="absolute top-1/2 left-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover md:h-[100vw] md:w-[100dvh] md:rotate-[-90deg]"
          onLoad={() => onReady?.()}
        />
      </HeroWaveReveal>
      {/* Hints the browser to start fetching this before it would otherwise
          get around to discovering the <img> element's src, so the gif can
          start displaying sooner on a slow mobile connection. */}
      <link rel="preload" as="image" href={src} />

      {children}
      {cursor && (
        <div
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: cursor.x, top: cursor.y }}
        >
          <MagicWandCursor muted={muted} />
        </div>
      )}
    </div>
  );
}

function MagicWandCursor({ muted }: { muted: boolean }) {
  const glow = muted ? NARISS_ACCENT_BLUE : NARISS_GOLD;

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      className="animate-pulse"
      style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
      aria-hidden
    >
      <line
        x1="12"
        y1="34"
        x2="28"
        y2="16"
        stroke={glow}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M30 6 L31.6 10.4 L36 12 L31.6 13.6 L30 18 L28.4 13.6 L24 12 L28.4 10.4 Z"
        fill={glow}
      />
      <circle cx="16" cy="12" r="1.4" fill={glow} opacity="0.8" />
      <circle cx="22" cy="7" r="1" fill={glow} opacity="0.6" />
      {muted ? (
        <g stroke={glow} strokeWidth="2" strokeLinecap="round">
          <line x1="8" y1="38" x2="16" y2="30" />
          <line x1="8" y1="30" x2="16" y2="38" />
        </g>
      ) : (
        <path
          d="M8 36 v-8 l7 -1.7 v8"
          stroke={glow}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
