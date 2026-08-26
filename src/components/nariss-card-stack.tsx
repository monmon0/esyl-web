"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import { NARISS_BADGE_BORDER, NARISS_BADGE_CREAM, NARISS_BADGE_INK, NARISS_PAPER } from "@/lib/colors";
import { TORN_PAPER_CLIP } from "@/lib/torn-paper";

export type NarissCardStackImage = {
  title: string;
  src: string;
};

function StackCard({
  index,
  total,
  title,
  src,
  progress,
}: {
  index: number;
  total: number;
  title: string;
  src: string;
  progress: MotionValue<number>;
}) {
  const range: [number, number] = [index / Math.max(total - 1, 1), 1];
  const targetScale = Math.max(0.82, 1 - (total - index - 1) * 0.08);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-24 flex items-center justify-center md:top-28">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 20 + 20}px)`,
          backgroundColor: NARISS_PAPER,
        }}
        className="relative flex w-[92vw] max-w-[500px] origin-top flex-col gap-3 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] ring-1 ring-black/10 md:p-4"
      >
        <div className="relative h-[300px] w-full md:h-[340px]">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(min-width: 768px) 500px, 92vw"
            className="object-cover"
          />
        </div>
        <p
          className="pb-1 text-center text-sm font-medium tracking-wide sm:text-base"
          style={{ color: NARISS_BADGE_INK }}
        >
          {title}
        </p>
      </motion.div>
    </div>
  );
}

export function NarissCardStack({
  images,
}: {
  images: readonly NarissCardStackImage[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={container}
      id="card-stack"
      className="relative flex w-full flex-col items-center bg-top bg-repeat-y pt-[30vh] md:pt-[65vh] pb-[20vh]"
      style={{
        backgroundColor: NARISS_PAPER,
        backgroundImage: "url('/backcard.png')",
        backgroundSize: "100% auto",
      }}
    >
      {/* <div className="pointer-events-none absolute top-[30%] left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
        <span
          className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-50 after:absolute after:top-full after:left-1/2 after:h-16 after:w-px after:bg-gradient-to-b after:content-['']"
          style={
            {
              color: NARISS_BADGE_INK,
              "--tw-gradient-from": NARISS_BADGE_INK,
            } as CSSProperties
          }
        >
          scroll down to reveal more
        </span>
      </div> */}

          <Link
        href="/gallery"
        className="relative z-30 md:mt-[30vh] md:mb-[10vh] border-2 bg-cover bg-center px-8 py-3 text-sm font-medium tracking-wide whitespace-nowrap uppercase transition-transform hover:-translate-y-0.5 hover:scale-[1.03]"
        style={{
          backgroundColor: NARISS_BADGE_CREAM,
          backgroundImage: "url('/paper-bg.jpg')",
          borderColor: NARISS_BADGE_BORDER,
          clipPath: TORN_PAPER_CLIP,
          color: NARISS_BADGE_INK,
          filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.35))",
        }}
      >
        See Gallery
      </Link>

      <div className="mt-[10vh] ">
             {images.map((image, i) => (
        <StackCard
          key={image.src}
          index={i}
          total={images.length}
          title={image.title}
          src={image.src}
          progress={scrollYProgress}
        />
      ))}
      </div>

 

  
    </section>
  );
}
