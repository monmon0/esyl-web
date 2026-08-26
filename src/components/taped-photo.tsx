"use client";

/**
 * One gallery piece styled as a page taped to the board: a slight
 * per-item rotation and two washi-tape strips pinning the top corners
 * down. Fades and rises into place the first time it scrolls into view.
 */

import { motion } from "motion/react";
import Image from "next/image";

// Small deterministic angle/delay sets, cycled by index — avoids
// Math.random (which would mismatch between server and client render)
// while still reading as scattered rather than gridded.
const PHOTO_ROTATIONS = [-3, 2.5, -1.5, 3, -2, 1.5, -2.5, 2];
const TAPE_LEFT_ROTATIONS = [-20, -12, -24, -16];
const TAPE_RIGHT_ROTATIONS = [14, 22, 10, 18];
const REVEAL_DELAYS = [0, 0.1, 0.2];

function TapeStrip({ side, index }: { side: "left" | "right"; index: number }) {
  const rotations = side === "left" ? TAPE_LEFT_ROTATIONS : TAPE_RIGHT_ROTATIONS;
  const rotate = rotations[index % rotations.length];

  return (
    <span
      aria-hidden
      className={`absolute -top-3 z-10 h-7 w-16 ${side === "left" ? "left-6" : "right-6"}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: "rgba(255, 250, 235, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
}

export function TapedPhoto({
  src,
  alt,
  width,
  height,
  index,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
}) {
  const rotate = PHOTO_ROTATIONS[index % PHOTO_ROTATIONS.length];

  return (
    <motion.div
      className="group relative mb-10 break-inside-avoid px-3"
      initial={{ opacity: 0, y: 60, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      whileHover={{ scale: 1.03, zIndex: 20 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: REVEAL_DELAYS[index % REVEAL_DELAYS.length],
      }}
    >
      <TapeStrip side="left" index={index} />
      <TapeStrip side="right" index={index} />
      <div
        className="relative overflow-hidden"
        style={{
          filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.35))",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
    </motion.div>
  );
}
