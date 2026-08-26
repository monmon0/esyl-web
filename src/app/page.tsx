"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Dancing_Script, Monsieur_La_Doulaise } from "next/font/google";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { HeroSoundStage } from "@/components/hero-sound-stage";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { HeroWaveTransition } from "@/components/hero-wave-transition";
import { DialogueBox } from "@/components/dialogue-box";
import { useLoading } from "@/components/loading-context";
import { NarissPortrait } from "@/components/nariss-portrait";
import { Signature } from "@/components/signature";
import { SocialLinks } from "@/components/social-links";
import { NarissCardStack } from "@/components/nariss-card-stack";
import { ScrollResistance } from "@/components/scroll-resistance";
import {
  NARISS_ACCENT_BLUE,
  NARISS_BADGE_BORDER,
  NARISS_BADGE_CREAM,
  NARISS_BADGE_INK,
  NARISS_BLACK,
  NARISS_BLUE,
} from "@/lib/colors";
import { NARISS_STACK_IMAGES } from "@/lib/nariss-stack";

const NARISS_STATS: { label: string; value: ReactNode }[] = [
  { label: "Age", value: "???" },
  {
    label: "Height",
    value: (
      <>
         <span className="opacity-60">HUMAN</span> 1m72
      </>
    ),
  },
  { label: "Species", value: "Mermaid" },
];

// Revealed only on hover/focus of the Height scrap — the mermaid's true
// (original) form, tucked behind her everyday human height.
const NARISS_MERMAID_HEIGHT = (
  <>
     <span className="opacity-60">MERMAID</span> 2m6
  </>
);

// Ragged top/bottom edges on an otherwise rectangular scrap, like a strip
// torn off a larger sheet — border/shadow follow this same path since both
// are clipped along with the box.
const TORN_PAPER_CLIP =
  "polygon(0% 6%, 4% 2%, 9% 7%, 14% 1%, 19% 5%, 25% 0%, 31% 4%, 37% 1%, 43% 6%, 50% 2%, 57% 5%, 63% 0%, 69% 4%, 75% 1%, 81% 6%, 87% 2%, 93% 5%, 100% 1%, 100% 94%, 96% 98%, 91% 93%, 86% 99%, 81% 94%, 75% 98%, 69% 95%, 63% 99%, 57% 94%, 50% 98%, 43% 95%, 37% 99%, 31% 94%, 25% 98%, 19% 95%, 14% 99%, 9% 93%, 4% 98%, 0% 94%)";

const NARISS_LORE: Record<"vi" | "en", string[]> = {
  vi: [
    "Rất lâu về trước, có một nàng tiên cá tò mò về thế giới của con người. Nàng thuộc về biển cả và biển cả là nhà của nàng. Nhờ ma thuật, nàng đã rời khỏi đáy biển và hòa vào cuộc sống của con người.",
    "Nàng nghe được nhiều hơn, thấy được xa hơn, cũng yêu và ghét nhiều hơn. Hơn tất cả, nàng thích quan sát con người lao động: họ tạo ra những công cụ, vật dụng hàng ngày phục vụ đời sống; họ tạo ra nhạc cụ, những vật trang trí, trang sức…",
    "Nàng bắt đầu bắt chước, học tập và tự tay làm tất cả những gì nàng thích; nàng mơ về một cửa hàng thoang thoảng hương gỗ và gió biển, một nơi quen thuộc, nơi nàng sống và tạo ra những vật dụng cho riêng mình.",
  ],
  en: [
    "Once upon a time, there was a mermaid who was curious about the human world. She belonged to the sea, and the ocean was her home. Through magic, she left the seabed to immerse herself in human life.",
    "She heard more, saw further, and felt both love and hatred more deeply. Above all, she loved watching humans work: they created daily tools and items for their lives; they crafted musical instruments, ornaments, and jewelry…",
    "She began to imitate, learn, and handcraft everything she liked. She dreamed of a shop filled with the faint scent of wood and the sea breeze—a familiar place where she could live and create things of her very own.",
  ],
};

const NARISS_DIALOGUE = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
];

const narissTitleFont = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
});

const narissSpeakerFont = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  const { setLoaded } = useLoading();
  const [heroReady, setHeroReady] = useState(false);
  const [lang, setLang] = useState<"vi" | "en">("en");

  // Gate the shared chrome (hamburger menu) on this page's hero, then
  // release the gate on the way out so other pages aren't affected.
  useEffect(() => {
    setLoaded(false);
    return () => setLoaded(true);
  }, [setLoaded]);

  const markReady = () => {
    console.log("DEBUG markReady called");
    setHeroReady(true);
    setLoaded(true);
  };

  // Only the media the current breakpoint actually renders should gate
  // readiness — the other one loads in the background regardless.
  const handleVideoReady = () => {
    console.log("DEBUG handleVideoReady called, isDesktop=", window.matchMedia("(min-width: 768px)").matches);
    if (!window.matchMedia("(min-width: 768px)").matches) markReady();
  };
  const handleImageReady = () => {
    console.log("DEBUG handleImageReady called, isDesktop=", window.matchMedia("(min-width: 768px)").matches);
    if (window.matchMedia("(min-width: 768px)").matches) markReady();
  };

  return (
    <>
      <ScrollResistance boundaryId="profile" />
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
              <HeroAtmosphere className="-z-10" />
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
              src="/Nariss/along-the-sea-bg.jpg"
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="pointer-events-none object-cover opacity-45"
            />

            <div className="relative z-10 flex h-full w-full flex-col overflow-y-auto md:grid md:grid-cols-[5rem_1.3fr_1fr] md:overflow-visible">
              <div
                role="group"
                aria-label="Lore language"
                className="order-2 flex items-center justify-center gap-3 pb-4 md:order-1 md:h-full md:flex-col md:justify-center md:gap-4 md:pb-0"
              >
                {(
                  [
                    { code: "vi", label: "VI", full: "Tiếng Việt" },
                    { code: "en", label: "EN", full: "English" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLang(option.code)}
                    aria-pressed={lang === option.code}
                    aria-label={option.full}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium tracking-wide uppercase transition-colors"
                    style={
                      lang === option.code
                        ? {
                            backgroundColor: NARISS_BADGE_CREAM,
                            borderColor: NARISS_BADGE_BORDER,
                            color: NARISS_BADGE_INK,
                          }
                        : {
                            backgroundColor: "transparent",
                            borderColor: "rgba(255,255,255,0.3)",
                            color: "rgba(255,255,255,0.6)",
                          }
                    }
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="order-1 relative h-[56vh] pt-28 pr-6 pl-6 md:order-2 md:h-full md:py-6">
                <NarissPortrait src="/Nariss/Nariss des.png" className="relative h-full w-full" />
                <DialogueBox
                  lines={NARISS_DIALOGUE}
                  speaker="Nariss"
                  speakerClassName={narissSpeakerFont.className}
                  className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 sm:bottom-4 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
                />
              </div>

              <div className="order-3 relative flex flex-col items-center justify-end gap-6 p-6 pb-12 text-center md:min-h-0 md:justify-center md:gap-8 md:pb-6">
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

                <div className="max-w-md space-y-5">

                  <dl className="flex flex-row flex-wrap items-start justify-center gap-3">
                    {NARISS_STATS.map((stat) => {
                      const isHeight = stat.label === "Height";
                      return (
                        <div
                          key={stat.label}
                          tabIndex={isHeight ? 0 : undefined}
                          className={`group flex flex-col items-center gap-0.5 border-2 bg-cover bg-center px-5 py-3 text-center text-xs sm:text-sm ${isHeight ? "cursor-help" : ""}`}
                          style={{
                            backgroundColor: NARISS_BADGE_CREAM,
                            backgroundImage: "url('/paper-bg.jpg')",
                            borderColor: NARISS_BADGE_BORDER,
                            clipPath: TORN_PAPER_CLIP,
                            filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))",
                          }}
                        >
                          <dt
                            className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-70"
                            style={{ color: NARISS_BADGE_INK }}
                          >
                            {stat.label}
                          </dt>
                          {isHeight ? (
                            <div className="relative">
                              <dd
                                className="font-medium whitespace-nowrap transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0"
                                style={{ color: NARISS_BADGE_INK }}
                              >
                                {stat.value}
                              </dd>
                              <dd
                                className="absolute inset-0 font-medium whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
                                style={{ color: NARISS_BADGE_INK }}
                              >
                                {NARISS_MERMAID_HEIGHT}
                              </dd>
                            </div>
                          ) : (
                            <dd className="font-medium" style={{ color: NARISS_BADGE_INK }}>
                              {stat.value}
                            </dd>
                          )}
                        </div>
                      );
                    })}
                  </dl>

                  <div lang={lang} className="space-y-3">
                    {NARISS_LORE[lang].map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-sm leading-relaxed text-white/70 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                document.getElementById("card-stack")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Scroll to gallery"
              className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-white/70 transition-colors hover:text-white"
            >
              <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

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
      <NarissCardStack images={NARISS_STACK_IMAGES} />
    </>
  );
}
