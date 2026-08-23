"use client";

/**
 * One storybook "plate": a framed illustration beside its chapter label,
 * title, and caption, alternating sides down the gallery page.
 */

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { NARISS_GOLD } from "@/lib/colors";

export function GalleryPlate({
  label,
  title,
  caption,
  src,
  width,
  height,
  align = "left",
}: {
  label: string;
  title: string;
  caption: string;
  src: string;
  width: number;
  height: number;
  align?: "left" | "right";
}) {
  const flipped = align === "right";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-6 md:flex-row md:gap-16",
        flipped && "md:flex-row-reverse",
      )}
    >
      <div className="w-full max-w-sm shrink-0 md:max-w-md">
        <div
          className="rounded-sm p-[3px]"
          style={{
            background: `linear-gradient(135deg, ${NARISS_GOLD}, transparent 45%, transparent 55%, ${NARISS_GOLD})`,
          }}
        >
          <div className="relative overflow-hidden rounded-[1px] border border-white/10">
            <Image
              src={src}
              alt={title}
              width={width}
              height={height}
              className="h-auto w-full object-cover"
              sizes="(min-width: 768px) 28rem, 90vw"
            />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.55)]" />
          </div>
        </div>
      </div>

      <div className="max-w-md text-center md:text-left">
        <span
          className="font-serif text-sm tracking-[0.4em] uppercase"
          style={{ color: NARISS_GOLD }}
        >
          {label}
        </span>
        <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 font-serif text-base leading-relaxed text-white/70 italic">
          {caption}
        </p>
      </div>
    </motion.article>
  );
}

export function ChapterDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto flex w-full max-w-xs items-center gap-4 px-6 text-white/25"
    >
      <span className="h-px flex-1 bg-current" />
      <span className="text-sm" style={{ color: NARISS_GOLD }}>
        ✦
      </span>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}
