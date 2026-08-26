"use client";

/**
 * Site-wide background music: a single <audio> element (Nariss's theme,
 * extracted from the hero video so desktop can play it without the video
 * itself) mounted once here, with a shared muted/toggle state so both the
 * bottom-left MusicController and the mobile hero video's own tap-to-toggle
 * affordance drive the same source instead of layering two audio tracks.
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicContextValue = {
  muted: boolean;
  toggleMuted: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const cancelFallbackRef = useRef<(() => void) | null>(null);

  // Try to start playing unmuted right away. Browsers routinely block
  // unmuted autoplay without prior engagement — when that happens, fall
  // back to unmuting on the first *click* anywhere on the page (not
  // pointerdown/touchstart: those fire before an explicit toggle's own
  // click handler gets a chance to run, so a tap on the toggle itself
  // would get unmuted by this fallback and then immediately re-muted by
  // the toggle reading its now-stale closure — using "click" and having
  // every explicit toggle cancel this listener first avoids that).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const unmute = () => {
      if (cancelled) return;
      cancelFallbackRef.current = null;
      audio.muted = false;
      void audio.play();
      setMuted(false);
    };

    const cancelFallback = () => {
      document.removeEventListener("click", unmute);
    };

    audio.muted = false;
    audio
      .play()
      .then(() => {
        if (!cancelled) setMuted(false);
      })
      .catch(() => {
        if (cancelled) return;
        audio.muted = true;
        void audio.play();
        // Bubble phase (not capture): the click's own target listeners —
        // including an explicit toggle's onClick — run first and get the
        // chance to cancel this before it ever fires.
        document.addEventListener("click", unmute, { once: true });
        cancelFallbackRef.current = cancelFallback;
      });

    return () => {
      cancelled = true;
      cancelFallback();
      cancelFallbackRef.current = null;
    };
  }, []);

  const toggleMuted = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // An explicit toggle supersedes the first-tap-anywhere fallback —
    // cancel it so this same click doesn't get handled twice.
    cancelFallbackRef.current?.();
    cancelFallbackRef.current = null;
    const nextMuted = !muted;
    audio.muted = nextMuted;
    if (!nextMuted) {
      void audio.play();
    }
    setMuted(nextMuted);
  };

  return (
    <MusicContext.Provider value={{ muted, toggleMuted }}>
      <audio ref={audioRef} loop preload="auto" autoPlay muted>
        <source src="/Nariss/final-mobile-audio.m4a" type="audio/mp4" />
        <source src="/Nariss/final-mobile-audio.mp3" type="audio/mpeg" />
      </audio>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
