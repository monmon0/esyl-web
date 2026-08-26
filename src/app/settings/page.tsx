"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { useLoading } from "@/components/loading-context";
import { NARISS_BLUE } from "@/lib/colors";

export default function SettingsPage() {
  const { setLoaded } = useLoading();
  const [imageReady, setImageReady] = useState(false);

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
        src="/Lore Nariss.png"
        alt="Nariss lore — Before the Light Fades"
        width={5000}
        height={8500}
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
