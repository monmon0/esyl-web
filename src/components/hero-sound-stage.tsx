"use client";

/**
 * Wraps the hero video with a click-to-toggle-sound control, replacing the
 * mouse cursor with a glowing wand-and-star cursor while hovering — blue and
 * silent, gold and singing once the video's music is unmuted.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { NARISS_ACCENT_BLUE, NARISS_GOLD } from "@/lib/colors";

export function HeroSoundStage({
  src,
  mobileSrc,
  poster,
  onReady,
  children,
}: {
  src: string;
  /** Smaller/lower-bitrate rendition served to narrow (mobile) viewports. */
  mobileSrc?: string;
  /** First-frame still shown instantly while the video buffers. */
  poster?: string;
  /** Fires once the video has enough data to play through. */
  onReady?: () => void;
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      void video.play();
    }
    setMuted(nextMuted);
  };

  return (
    <div
      ref={containerRef}
      onClick={toggleSound}
      data-pop
      className="relative h-full w-full overflow-hidden [@media(pointer:fine)]:cursor-none"
    >
      <HeroWaveReveal className="absolute inset-0 z-0 h-full w-full">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover md:h-[100vw] md:w-[100dvh] md:rotate-[-90deg]"
          poster={poster}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={onReady}
        >
          {/* Narrow viewports get the smaller, lower-bitrate rendition —
              the browser picks the first matching <source> once, on load,
              so this is evaluated at initial viewport width. */}
          {mobileSrc && <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />}
          <source src={src} type="video/mp4" />
        </video>
      </HeroWaveReveal>
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
