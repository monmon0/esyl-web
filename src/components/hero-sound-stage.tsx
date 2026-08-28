"use client";

/**
 * Wraps the hero video (visual only — the video's own audio track stays
 * muted) with a click-to-toggle-sound control, replacing the mouse cursor
 * with a glowing wand-and-star cursor while hovering — blue and silent,
 * gold and singing once the site-wide background music (see
 * music-context.tsx) is unmuted. Tapping here is just another entry point
 * to that single shared music toggle, so the video's audio never plays
 * alongside it.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { useMusic } from "@/components/music-context";
import { NARISS_ACCENT_BLUE, NARISS_GOLD } from "@/lib/colors";

export function HeroSoundStage({
  src,
  mobileSrc,
  poster,
  onReady,
  children,
}: {
  /** Used only when `mobileSrc` isn't given. */
  src: string;
  /**
   * Smaller/lower-bitrate rendition — used directly whenever provided,
   * with no media-query-based source selection. This component is already
   * only ever rendered inside a mobile-gated wrapper by its caller, so a
   * `<source media="...">` fallback here just risked mismatching that
   * outer breakpoint and silently falling through to a missing/desktop
   * file instead of playing anything.
   */
  mobileSrc?: string;
  /** First-frame still shown instantly while the video buffers. */
  poster?: string;
  /** Fires once the video has actually started playing. */
  onReady?: () => void;
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { muted, toggleMuted } = useMusic();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  // The video starts loading as soon as the server-rendered <video autoPlay>
  // tag is parsed, which on a fast/cached load can fire the native
  // "playing" event before React hydrates and attaches the onPlaying
  // listener below — dropping the event entirely and leaving onReady never
  // called. Checking play state on mount catches that race.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onReady) return;
    if (!video.paused && !video.ended && video.readyState > 2) {
      onReady();
    }
  }, [onReady]);

  // JSX's `muted` prop sets the attribute, but some mobile browsers check
  // the live DOM property when deciding whether to honor autoplay, and
  // React attaching that attribute after hydration can lose the race —
  // autoplay then gets silently blocked and the browser falls back to
  // showing its native tap-to-play button. Setting the property directly
  // and kicking off playback ourselves avoids that fallback entirely.
  //
  // A single attempt on mount can also lose the race on a slow mobile
  // connection — .play() called before the browser has buffered enough
  // gets silently rejected rather than queued, so it's retried on canplay
  // (enough data to start) too, in case the connection was too slow for
  // the first attempt to succeed.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;

    const tryPlay = () => void video.play().catch(() => {});
    tryPlay();

    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

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
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover md:h-[100vw] md:w-[100dvh] md:rotate-[-90deg]"
          poster={poster}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          src={mobileSrc ?? src}
          onPlaying={() => onReady?.()}
        />
      </HeroWaveReveal>
      {/* Hints the browser to start fetching this before it would otherwise
          get around to discovering the <video> element's src, so playback
          can start sooner on a slow mobile connection. */}
      <link rel="preload" as="video" href={mobileSrc ?? src} />

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
