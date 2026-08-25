"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import Image from "next/image";
import { useRef } from "react";
import { NARISS_BLACK } from "@/lib/colors";

gsap.registerPlugin(ScrollTrigger);

type StackImage = { title: string; src: string };

function LenisScrollTriggerSync() {
  // Lenis intercepts native scroll; the hero above this stack drives a
  // wave-reveal off GSAP's ScrollTrigger (see hero-wave-transition.tsx), so
  // this just tells ScrollTrigger to re-check on every Lenis scroll tick.
  //
  // Deliberately NOT disabling `autoRaf` (default true) and driving Lenis's
  // raf loop manually here: that makes scrolling depend entirely on this
  // effect connecting correctly — Lenis intercepts wheel/touch input and
  // needs its raf loop to actually move the page, so any hiccup in a custom
  // sync effect freezes scrolling outright. Lenis's own default self-driven
  // raf loop is the proven-reliable path; this only taps its scroll events.
  useLenis(() => ScrollTrigger.update());
  return null;
}

// Skiper 16 "StickyCard_001", kept close to the original: a plain
// rounded-4xl, object-cover card with no extra chrome — the same
// stagger/scale formula as the vendored component.
const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 250}px)`,
        }}
        className="relative -top-1/4 flex h-[300px] w-[500px] origin-top flex-col overflow-hidden rounded-4xl"
      >
        <Image src={src} alt={title} fill sizes="500px" className="object-cover" />
      </motion.div>
    </div>
  );
};

const Skiper16 = ({ images }: { images: readonly StackImage[] }) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <LenisScrollTriggerSync />
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pt-[50vh] pb-[100vh]"
        style={{ backgroundColor: NARISS_BLACK }}
      >
        <div className="absolute top-[10%] left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="relative max-w-[12ch] text-xs text-white uppercase leading-tight opacity-40 after:absolute after:top-full after:left-1/2 after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:content-['']">
            scroll down to reveal more
          </span>
        </div>
        {images.map((image, i) => {
          const targetScale = Math.max(0.5, 1 - (images.length - i - 1) * 0.1);
          return (
            <StickyCard_001
              key={image.src}
              i={i}
              title={image.title}
              src={image.src}
              progress={scrollYProgress}
              range={[i / Math.max(images.length - 1, 1), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
};

export { Skiper16, StickyCard_001 };

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
