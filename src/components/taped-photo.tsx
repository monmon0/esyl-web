"use client";

/**
 * One gallery piece styled as a page taped to the board: a slight
 * per-item rotation and two washi-tape strips pinning the top corners
 * down. Fades and rises into place the first time it scrolls into view.
 */

import { motion } from "motion/react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { Modal } from "@/components/modal";
import { NARISS_GOLD } from "@/lib/colors";

// Small deterministic angle/delay sets, cycled by index — avoids
// Math.random (which would mismatch between server and client render)
// while still reading as scattered rather than gridded.
const PHOTO_ROTATIONS = [-3, 2.5, -1.5, 3, -2, 1.5, -2.5, 2];
const TAPE_LEFT_ROTATIONS = [-20, -12, -24, -16];
const TAPE_RIGHT_ROTATIONS = [14, 22, 10, 18];
const REVEAL_DELAYS = [0, 0.1, 0.2];

// Desktop-only hover loupe: a circle that follows the cursor showing a
// zoomed-in crop of the thumbnail, so detail is visible before committing
// to the full lightbox. Clamped to stay within the image bounds rather
// than spilling past its edges.
const LENS_SIZE = 160;
const LENS_ZOOM = 2.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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
  title,
  description,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  index: number;
  title?: string;
  description?: string;
}) {
  const rotate = PHOTO_ROTATIONS[index % PHOTO_ROTATIONS.length];
  const [open, setOpen] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null,
  );

  const handleLensMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const half = LENS_SIZE / 2;
    setLens({
      x: clamp(event.clientX - rect.left, half, rect.width - half),
      y: clamp(event.clientY - rect.top, half, rect.height - half),
      width: rect.width,
      height: rect.height,
    });
  };

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={handleLensMove}
        onMouseMove={handleLensMove}
        onMouseLeave={() => setLens(null)}
        aria-label={`View ${alt}`}
        className="relative block w-full cursor-zoom-in overflow-hidden text-left"
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
        {lens && (
          <div
            aria-hidden
            className="pointer-events-none absolute z-30 hidden rounded-full border-2 border-white/80 bg-white md:block"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: lens.x - LENS_SIZE / 2,
              top: lens.y - LENS_SIZE / 2,
              backgroundImage: `url(${src})`,
              backgroundSize: `${lens.width * LENS_ZOOM}px ${lens.height * LENS_ZOOM}px`,
              backgroundPosition: `${-(lens.x * LENS_ZOOM - LENS_SIZE / 2)}px ${-(lens.y * LENS_ZOOM - LENS_SIZE / 2)}px`,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
            }}
          />
        )}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        panelClassName="max-h-[90vh] w-fit max-w-[min(90vw,64rem)] overflow-visible border-none bg-transparent p-0 shadow-none"
        panelStyle={{ backgroundColor: "transparent" }}
      >
        <div className="flex max-h-[90vh] flex-col items-center overflow-y-auto">
          <div className="relative mt-16">
            <TapeStrip side="left" index={index} />
            <TapeStrip side="right" index={index} />
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="block h-auto max-h-[75vh] w-auto max-w-full object-contain"
              style={{ filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.5))" }}
              sizes="90vw"
            />
          </div>
          {title && (
            <p
              className="mt-5 font-serif text-xs uppercase"
              style={{ color: NARISS_GOLD }}
            >
              {title}
            </p>
          )}
          {description && (
            <p className="mt-2 max-w-md px-4 text-center font-serif text-sm whitespace-pre-line text-white/80 italic">
              {description}
            </p>
          )}
        </div>
      </Modal>
    </motion.div>
  );
}
