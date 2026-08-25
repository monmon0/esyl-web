"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Monsieur_La_Doulaise } from "next/font/google";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { HeroSoundStage } from "@/components/hero-sound-stage";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { HeroWaveTransition } from "@/components/hero-wave-transition";
import { DialogueBox } from "@/components/dialogue-box";
import { useLoading } from "@/components/loading-context";
import { NarissDesignPicker } from "@/components/nariss-design-picker";
import { NarissPortrait } from "@/components/nariss-portrait";
import { Signature } from "@/components/signature";
import { SocialLinks } from "@/components/social-links";
import { Skiper16 } from "@/components/ui/skiper-ui/skiper16";
import {
  NARISS_ACCENT_BLUE,
  NARISS_BADGE_BORDER,
  NARISS_BADGE_CREAM,
  NARISS_BADGE_INK,
  NARISS_BLACK,
  NARISS_BLUE,
} from "@/lib/colors";
import { NARISS_DESIGNS, type NarissDesign } from "@/lib/nariss-designs";
import { NARISS_STACK_IMAGES } from "@/lib/nariss-stack";

const PROFILE_STATS = ["Race", "Element", "Domain", "Affinity"];

const NARISS_DIALOGUE = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
];

const narissTitleFont = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const { setLoaded } = useLoading();
  const [heroReady, setHeroReady] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<NarissDesign["id"]>(1);
  const activeDesign =
    NARISS_DESIGNS.find((design) => design.id === selectedDesign) ??
    NARISS_DESIGNS[0];

  // Gate the shared chrome (hamburger menu) on this page's hero, then
  // release the gate on the way out so other pages aren't affected.
  useEffect(() => {
    setLoaded(false);
    return () => setLoaded(true);
  }, [setLoaded]);

  const markReady = () => {
    setHeroReady(true);
    setLoaded(true);
  };

  // Only the media the current breakpoint actually renders should gate
  // readiness — the other one loads in the background regardless.
  const handleVideoReady = () => {
    if (!window.matchMedia("(min-width: 768px)").matches) markReady();
  };
  const handleImageReady = () => {
    if (window.matchMedia("(min-width: 768px)").matches) markReady();
  };

  return (
    <>
      <HeroWaveTransition
        hero={
          <section
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ backgroundColor: NARISS_BLUE }}
          >
            <div className="relative h-full w-full overflow-hidden">
              {/* Mobile keeps the vertical hero video; desktop gets the
                  horizontally-framed still instead. */}
              <div className="absolute inset-0 h-full w-full md:hidden">
                <HeroSoundStage
                  src="/Nariss/final-optimized.mp4"
                  mobileSrc="/Nariss/final-mobile.mp4"
                  poster="/Nariss/final-poster.jpg"
                  onReady={handleVideoReady}
                />
              </div>
              <HeroWaveReveal className="absolute inset-0 z-0 hidden h-full w-full md:block">
                <Image
                  src="/Nariss/desktop-horizontal.png"
                  alt="Nariss"
                  fill
                  priority
                  sizes="100vw"
                  className="h-full w-full object-cover"
                  onLoad={handleImageReady}
                />
              </HeroWaveReveal>
              <HeroAtmosphere className="z-[5]" />
              <div
                className={`absolute top-1/2 left-1/2 z-10 flex w-[90vw] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-opacity duration-700 md:w-auto md:max-w-[70vw] ${
                  heroReady ? "opacity-100" : "opacity-0"
                }`}
              >
                <Signature
                  text="Nariss"
                  color={NARISS_BLUE}
                  fontSize={48}
                  duration={1.5}
                  delay={2}
                  className="h-auto w-full"
                />
                <SocialLinks className="flex items-center gap-5" />
                <p
                  className="rounded-full border-2 px-5 py-1.5 text-sm tracking-wide shadow-sm sm:text-base"
                  style={{
                    backgroundColor: NARISS_BADGE_CREAM,
                    borderColor: NARISS_BADGE_BORDER,
                    color: NARISS_BADGE_INK,
                  }}
                >
                  Character created by Esyl
                </p>
              </div>
            </div>
          </section>
        }
        next={
          <section
            className="relative h-full w-full overflow-hidden"
            style={{ backgroundColor: NARISS_BLACK }}
          >
            <Image
              src="/Nariss/Nariss 22 4 2026.png"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="pointer-events-none object-cover opacity-20"
            />

            <div className="relative z-10 grid h-full w-full grid-cols-1 overflow-y-auto md:grid-cols-[5rem_1.3fr_1fr] md:overflow-visible">
              <NarissDesignPicker
                selected={selectedDesign}
                onSelect={setSelectedDesign}
                className="order-2 flex items-center justify-center gap-4 pb-4 md:order-1 md:h-full md:flex-col md:justify-center md:gap-5 md:pb-0"
              />

              <div className="order-1 relative h-[56vh] pt-28 pr-6 pl-6 md:order-2 md:h-full md:py-6">
                <NarissPortrait src={activeDesign.src} className="relative h-full w-full" />
                <DialogueBox
                  lines={NARISS_DIALOGUE}
                  speaker="Nariss"
                  speakerClassName={narissTitleFont.className}
                  className="absolute bottom-2 left-1/2 z-20 max-h-52 -translate-x-1/2 sm:bottom-4 sm:max-h-60 md:top-1/2 md:bottom-auto md:max-h-56 md:-translate-y-1/2"
                />
              </div>

              <div className="order-3 relative flex min-h-0 flex-col items-center justify-end gap-6 p-6 pb-12 text-center md:justify-center md:gap-8 md:pb-6">
                <div className="relative flex aspect-[1200/537] w-72 items-center justify-center sm:w-96 md:w-[28rem]">
                  <Image
                    src="/name-border.png"
                    alt=""
                    aria-hidden
                    fill
                    sizes="(min-width: 600px) 28rem, 24rem"
                    className="object-contain"
                  />
                  <h2
                    className={`${narissTitleFont.className} relative text-4xl text-slate-900 sm:text-5xl md:text-6xl`}
                  >
                    Introduction
                  </h2>
                </div>

                <div className="max-w-md space-y-4">
                  {/* <h2
                    className={`${narissTitleFont.className} align-left text-3xl text-white sm:text-2xl md:text-5xl`}
                  >
                    Profile
                  </h2> */}
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>

            {/* corner ornaments — border.png is authored as the bottom-left
                piece; the other three corners reuse it rotated 90° at a time
                (rotating 90° CW moves the bottom-left corner's content to the
                top-left, 180° to the top-right, 270° to the bottom-right). */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-24 w-24 md:h-50 md:w-50">
              <Image
                src="/border.png"
                alt=""
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
            <div className="pointer-events-none absolute top-[-7] left-0 z-20 h-24 w-24 rotate-90 md:h-50 md:w-50">
              <Image
                src="/border.png"
                alt=""
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
            <div className="pointer-events-none absolute top-0 right-[-7] z-20 h-24 w-24 rotate-180 md:h-50 md:w-50">
              <Image
                src="/border.png"
                alt=""
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
            <div className="pointer-events-none absolute right-0 bottom-[-7] z-20 h-24 w-24 -rotate-90 md:h-50 md:w-50">
              <Image
                src="/border.png"
                alt=""
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
          </section>
        }
      />

      {/* Portrait wall — every curated Nariss look, stacking and scaling
          down as you continue to scroll past the hero. */}
      <Skiper16 images={NARISS_STACK_IMAGES} />
    </>
  );
}
