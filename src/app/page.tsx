import Image from "next/image";
import { Monsieur_La_Doulaise } from "next/font/google";
import { HeroKeyholeReveal } from "@/components/hero-keyhole-reveal";
import { HeroSoundStage } from "@/components/hero-sound-stage";
import { LiquidBlueShader } from "@/components/liquid-blue-shader";
import { Signature } from "@/components/signature";
import { TextAlongPath } from "@/components/text-along-path";
import { NARISS_ACCENT_BLUE, NARISS_BLACK, NARISS_BLUE } from "@/lib/colors";

const PROFILE_STATS = ["Race", "Element", "Domain", "Affinity"];

const narissTitleFont = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <HeroKeyholeReveal
      hero={
        <section
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{ backgroundColor: NARISS_BLUE }}
        >
          <HeroSoundStage src="/Nariss/final.mp4">
            <Signature
              text="Nariss's Profile"
              color={NARISS_BLUE}
              fontSize={48}
              duration={1.5}
              delay={2}
              className="absolute bottom-10 left-1/2 z-10 h-auto w-[90vw] max-w-[90vw] -translate-x-1/2 md:bottom-16 md:h-auto md:w-auto md:max-w-[70vw]"
            />
          </HeroSoundStage>
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

          {/* big blue arc — sized in vw so it always encloses more than half
              the screen width, bulging in from the right regardless of
              column width */}
          <div className="pointer-events-none absolute top-[22%] left-[85%] z-0 aspect-square h-[200%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full md:top-[50%] md:left-[80%] md:h-[120vw] md:max-h-[140vh]">
            <LiquidBlueShader className="h-full w-full" />
          </div>

          <div className="relative z-10 grid h-full w-full grid-cols-1 md:grid-cols-2">
            <div className="relative p-6">
              <Image
                src="/Nariss/Nariss des 1.png"
                alt="Nariss character design"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <div className="relative flex min-h-0 items-center justify-center">
              <div className="relative flex aspect-[1200/537] w-72 items-center justify-center sm:w-96 md:w-[28rem]">
                <Image
                  src="/name-border.png"
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 768px) 28rem, 24rem"
                  className="object-contain"
                />
                <h2
                  className={`${narissTitleFont.className} relative text-4xl text-slate-900 sm:text-5xl md:text-6xl`}
                >
                  Nariss
                </h2>
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

          <TextAlongPath
            text="✦ Nariss's Character Profile ✦"
            color={"#FFFFFF"}
            className="pointer-events-none absolute bottom-2 left-1/2 z-20 w-[85%] max-w-xl -translate-x-1/2 md:bottom-6"
          />
        </section>
      }
    />
  );
}
