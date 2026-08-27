"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { useLoading } from "@/components/loading-context";
import { NARISS_BLUE } from "@/lib/colors";

export default function SettingsPage() {
  const { setLoaded } = useLoading();
  const [imageReady, setImageReady] = useState(false);
  const loreImageRef = useRef<HTMLImageElement>(null);

  // Same opening-load gate as the home page's hero: keep the hamburger
  // hidden until there's something on screen worth navigating away from.
  useEffect(() => {
    setLoaded(false);
    return () => setLoaded(true);
  }, [setLoaded]);

  const handleImageReady = () => {
    setImageReady(true);
    setLoaded(true);
  };

  // A cache-warm image can finish loading — and fire its native "load"
  // event — before React attaches the onLoad handler below, permanently
  // stranding `loaded` at false and hiding the hamburger menu. `complete`
  // catches that race on mount.
  useEffect(() => {
    if (loreImageRef.current?.complete) {
      handleImageReady();
    }
    // Intentionally mount-only — handleImageReady is idempotent, and
    // re-running this on every render would defeat the point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-6 py-24"
      style={{ backgroundColor: NARISS_BLUE }}
    >
      <HeroWaveReveal className="absolute inset-0 h-full w-full">
        <Image
          src="/Nariss/gallery/nariss-bg.jpg"
          alt=""
          aria-hidden
          fill
          priority
          quality={65}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </HeroWaveReveal>
      <HeroAtmosphere className="-z-10" />
      <Image
        ref={loreImageRef}
        src="/lore-nariss.jpg"
        alt="Nariss lore — Before the Light Fades"
        width={1294}
        height={2200}
        priority
        sizes="(min-width: 768px) 32rem, 90vw"
        className={`relative z-10 h-auto w-full max-w-md rounded-sm shadow-2xl transition-opacity duration-700 ${
          imageReady ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageReady}
      />
    </main>
  );
}
