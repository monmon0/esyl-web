"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { Dancing_Script, Monsieur_La_Doulaise } from "next/font/google";
import localFont from "next/font/local";
import { HeroAtmosphere } from "@/components/hero-atmosphere";
import { HeroSoundStage } from "@/components/hero-sound-stage";
import { HeroWaveReveal } from "@/components/hero-wave-reveal";
import { HeroWaveTransition } from "@/components/hero-wave-transition";
import { MobileSectionPager } from "@/components/mobile-section-pager";
import { DialogueBox } from "@/components/dialogue-box";
import { NarissPortrait } from "@/components/nariss-portrait";
import { Signature } from "@/components/signature";
import { SocialLinks } from "@/components/social-links";
import { NarissCardStack } from "@/components/nariss-card-stack";
import { Modal } from "@/components/modal";
import { ScrollResistance } from "@/components/scroll-resistance";
import {
  NARISS_ACCENT_BLUE,
  NARISS_BADGE_BORDER,
  NARISS_BADGE_CREAM,
  NARISS_BADGE_INK,
  NARISS_BLACK,
  NARISS_BLUE,
  NARISS_DEEP_BLUE,
  NARISS_GOLD,
} from "@/lib/colors";
import { NARISS_STACK_IMAGES } from "@/lib/nariss-stack";
import { TORN_PAPER_CLIP } from "@/lib/torn-paper";

const NARISS_STATS: Record<
  "vi" | "en",
  { key: "age" | "height" | "species"; label: string; value: ReactNode }[]
> = {
  en: [
    { key: "age", label: "Age", value: "???" },
    {
      key: "height",
      label: "Height",
      value: (
        <>
          <span className="opacity-60">HUMAN</span> 1m72
        </>
      ),
    },
    { key: "species", label: "Species", value: "Mermaid" },
  ],
  vi: [
    { key: "age", label: "Tuổi", value: "???" },
    {
      key: "height",
      label: "Chiều cao",
      value: (
        <>
          <span className="opacity-60">NGƯỜI</span> 1m72
        </>
      ),
    },
    { key: "species", label: "Loài", value: "Tiên cá" },
  ],
};

// Revealed only on hover/focus of the Height scrap — the mermaid's true
// (original) form, tucked behind her everyday human height.
const NARISS_MERMAID_HEIGHT: Record<"vi" | "en", ReactNode> = {
  en: (
    <>
      <span className="opacity-60">MERMAID</span> 2m6
    </>
  ),
  vi: (
    <>
      <span className="opacity-60">TIÊN CÁ</span> 2m6
    </>
  ),
};

const NARISS_INTRO_TITLE: Record<"vi" | "en", string> = {
  en: "Introduction",
  vi: "Giới thiệu",
};

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
  "Who is crying?",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
];

const LORE_LANGUAGES = [
  { code: "vi", label: "VI", full: "Tiếng Việt" },
  { code: "en", label: "EN", full: "English" },
] as const;

const narissTitleFont = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
});

const narissSpeakerFont = localFont({
  src: "../../public/LastoriaBoldRegular.otf",
  weight: "700",
});

const narissHandwrittenFont = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

function LangToggle({
  lang,
  setLang,
  className,
}: {
  lang: "vi" | "en";
  setLang: (lang: "vi" | "en") => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Lore language"
      className={`flex items-center gap-1 px-2 py-1.5 ${className ?? ""}`}
      style={{
        backgroundColor: NARISS_BADGE_CREAM,
        backgroundImage: "url('/paper-bg.jpg')",
        backgroundSize: "cover",
        borderColor: NARISS_BADGE_BORDER,
        clipPath: TORN_PAPER_CLIP,
        filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.3))",
      }}
    >
      {LORE_LANGUAGES.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => setLang(option.code)}
          aria-pressed={lang === option.code}
          aria-label={option.full}
          className={`${narissHandwrittenFont.className} flex h-9 w-10 shrink-0 items-center justify-center text-xl leading-none transition-all duration-300`}
          style={{
            color: NARISS_BADGE_INK,
            opacity: lang === option.code ? 1 : 0.4,
            textDecoration: lang === option.code ? "underline" : "none",
            textDecorationColor: NARISS_DEEP_BLUE,
            textDecorationThickness: "2px",
            textUnderlineOffset: "3px",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function NarissStatsList({ lang }: { lang: "vi" | "en" }) {
  return (
    <dl className="flex flex-row flex-wrap items-start justify-center gap-3">
      {NARISS_STATS[lang].map((stat) => {
        const isHeight = stat.key === "height";
        return (
          <div
            key={stat.key}
            tabIndex={isHeight ? 0 : undefined}
            className={`group flex flex-col items-center gap-0.5 border-2 bg-cover bg-center px-5 py-3 text-center text-xs sm:text-sm ${
              isHeight ? "cursor-help" : ""
            }`}
            style={{
              backgroundColor: NARISS_BADGE_CREAM,
              backgroundImage: "url('/paper-bg.jpg')",
              borderColor: NARISS_BADGE_BORDER,
              clipPath: TORN_PAPER_CLIP,
              // filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))",
            }}
          >
            <dt
              className="text-[10px] font-medium  uppercase opacity-70"
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
                  {NARISS_MERMAID_HEIGHT[lang]}
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
  );
}

function NarissLoreParagraphs({
  lang,
  tone = "light",
}: {
  lang: "vi" | "en";
  /** "light" text for a dark backdrop (default), "dark" ink for a light/paper one. */
  tone?: "light" | "dark";
}) {
  return (
    <div lang={lang} className="space-y-3">
      {NARISS_LORE[lang].map((paragraph, i) => (
        <p
          key={i}
          className={`text-sm leading-relaxed sm:text-base ${
            tone === "dark" ? "text-black/70" : "text-white/70"
          }`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [infoOpen, setInfoOpen] = useState(false);
  const desktopHeroImageRef = useRef<HTMLImageElement>(null);
  // Mobile gets three plain, normally-stacked sections — no pin, no wave
  // mask. Defaults to that (mobile-first, and matches the server render, so
  // there's no hydration mismatch); once mounted, desktop swaps to the
  // pinned wave-transition layout.
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktopLayout(mql.matches);
    const onChange = () => setIsDesktopLayout(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const markReady = () => {
    setHeroReady(true);
  };

  // Only the media the current breakpoint actually renders should gate
  // readiness — the other one loads in the background regardless.
  const handleGifReady = () => {
    if (!window.matchMedia("(min-width: 1024px)").matches) markReady();
  };
  const handleImageReady = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) markReady();
  };

  // A cache-warm image (e.g. navigating here via <Link> after an earlier
  // visit) can finish loading — and fire its native "load" event — before
  // React has attached the onLoad handler below, permanently stranding
  // `heroReady` at false. `complete` catches that race on mount, the same
  // way the mobile hero gif's `complete` check does in hero-sound-stage.tsx.
  useEffect(() => {
    if (desktopHeroImageRef.current?.complete) {
      handleImageReady();
    }
    // Intentionally mount-only — handleImageReady is idempotent, and
    // re-running this on every render would defeat the point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heroSection = (
    <section
      className="absolute inset-0 h-full w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/cover.png')" }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* Mobile keeps the vertical hero gif; desktop gets the
                  horizontally-framed still instead. */}
        <div className="absolute inset-0 h-full w-full lg:hidden">
          <HeroSoundStage src="/final-mobile.gif" onReady={handleGifReady} />
        </div>
        <HeroWaveReveal className="absolute inset-0 z-0 hidden h-full w-full lg:block">
          <Image
            ref={desktopHeroImageRef}
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
          className={`absolute top-1/2 left-1/2 z-10 flex w-[90vw] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-opacity duration-700 lg:w-auto lg:max-w-[70vw] ${
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
            className="rounded-full border-2 px-5 py-1.5 text-sm  sm:text-base"
            style={{
              backgroundColor: NARISS_BADGE_CREAM,
              borderColor: NARISS_BADGE_BORDER,
              color: NARISS_BADGE_INK,
            }}
          >
            Character created by Esyil
          </p>
          <p className="hidden text-[10px] text-white lg:block">
            Music: @Anhthư Masa
          </p>
        </div>
        <div
          className={`absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-0.5 px-4 text-center text-[10px]  transition-opacity duration-700 lg:hidden ${
            heroReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ color: NARISS_ACCENT_BLUE }}
        >
          <p>Music: @Anhthư Masa</p>
          <p>Animation: @Ly Ưu</p>
        </div>
      </div>
    </section>
  );

  const profileSection = (
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

      <div className="relative z-10 flex h-full w-full flex-col overflow-y-auto lg:grid lg:grid-cols-[5rem_1.3fr_1fr] lg:overflow-visible">
        <div
          role="group"
          aria-label="Lore language"
          className="hidden lg:order-1 lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-center lg:gap-3"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke={NARISS_GOLD}
            strokeWidth={1.4}
            className="h-5 w-5 opacity-80"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.7 2.6 4.2 5.7 4.2 9s-1.5 6.4-4.2 9c-2.7-2.6-4.2-5.7-4.2-9s1.5-6.4 4.2-9Z" />
          </svg>
          <LangToggle lang={lang} setLang={setLang} className="flex-col" />
        </div>

        <div className="relative h-dvh w-full pt-28 lg:order-2 lg:h-full lg:w-auto lg:py-6 lg:pr-6 lg:pl-6 lg:pt-6">
          <NarissPortrait
            src="/Nariss/Nariss des.png"
            className="relative h-full w-full"
          />
          <DialogueBox
            lines={NARISS_DIALOGUE}
            speaker="Nariss"
            speakerClassName={narissSpeakerFont.className}
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-8 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2"
          />
          <div className="absolute top-6 right-6 z-20 lg:hidden">
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-xl"
              style={{ backgroundColor: NARISS_GOLD, opacity: 0.55 }}
            />
            {/* <p
                    aria-hidden
                    className={`${narissHandwrittenFont.className} absolute top-full right-1 mt-0.5 whitespace-nowrap text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]`}
                  >
                    Click here!
                  </p> */}
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              aria-label="Character info"
              className="relative flex h-14 w-14 items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/paper-profile-bg 1.png')" }}
            >
              <Image
                src="/asset5.png"
                alt=""
                aria-hidden
                width={1063}
                height={2008}
              />
            </button>
          </div>
          <Modal
            open={infoOpen}
            onClose={() => setInfoOpen(false)}
            backdropClassName="absolute inset-0 "
            panelClassName="max-h-[92vh] min-h-[70vh] w-full max-w-md overflow-y-auto rounded-2xl p-6 "
            panelStyle={{
              backgroundColor: "transparent",
              backgroundImage: "url('/paper-profile-bg 1.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            closeButtonClassName="absolute top-10 right-3 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-black/10 hover:text-black"
            aboveContent={
              <LangToggle
                lang={lang}
                setLang={setLang}
                className="mx-auto w-fit"
              />
            }
          >
            <div className="space-y-5 text-center">
              <h2
                className={`text-white  ${
                  lang === "en"
                    ? `${narissTitleFont.className} text-4xl`
                    : "text-2xl"
                }`}
              >
                {NARISS_INTRO_TITLE[lang]}
              </h2>
              <NarissStatsList lang={lang} />
              <div className="text-left">
                <NarissLoreParagraphs lang={lang} tone="dark" />
              </div>
            </div>
          </Modal>
        </div>

        <div className="hidden lg:order-3 lg:relative lg:flex lg:min-h-0 lg:flex-col lg:items-center lg:justify-center lg:gap-8 lg:p-6 lg:pb-6 lg:text-center">
          <div className="relative flex aspect-[1200/537] w-72 items-center justify-center sm:w-96 lg:w-[28rem]">
            <Image
              src="/name-border.png"
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 600px) 28rem, 24rem"
              className="object-contain"
            />
            <h2
              className={`relative text-slate-900 ${
                lang === "en"
                  ? `${narissTitleFont.className} text-4xl sm:text-5xl lg:text-6xl`
                  : "text-2xl sm:text-3xl lg:text-4xl"
              }`}
            >
              {NARISS_INTRO_TITLE[lang]}
            </h2>
          </div>

          <div className="max-w-md space-y-5">
            <NarissStatsList lang={lang} />
            <NarissLoreParagraphs lang={lang} />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          document
            .getElementById("card-stack")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to gallery"
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/70 transition-colors hover:text-white lg:flex"
      >
        <span className="text-[10px] uppercase">Scroll</span>
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
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-24 w-24 lg:h-50 lg:w-50">
        <Image
          src="/border.png"
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute top-[-7] left-0 z-20 h-24 w-24 rotate-90 lg:h-50 lg:w-50">
        <Image
          src="/border.png"
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute top-0 right-[-7] z-20 h-24 w-24 rotate-180 lg:h-50 lg:w-50">
        <Image
          src="/border.png"
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>
      <div className="pointer-events-none absolute right-0 bottom-[-7] z-20 h-24 w-24 -rotate-90 lg:h-50 lg:w-50">
        <Image
          src="/border.png"
          alt=""
          fill
          sizes="144px"
          className="object-contain"
        />
      </div>
    </section>
  );

  return (
    <>
      {isDesktopLayout ? (
        <>
          <ScrollResistance boundaryId="profile" />
          <HeroWaveTransition hero={heroSection} next={profileSection} />
        </>
      ) : (
        <MobileSectionPager
          hero={heroSection}
          profile={profileSection}
          nextSectionId="card-stack"
        />
      )}

      {/* Portrait wall — every curated Nariss look, stacking and scaling
          down as you continue to scroll past the hero. */}
      <NarissCardStack images={NARISS_STACK_IMAGES} />
    </>
  );
}
