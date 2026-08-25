"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export function NarissPortrait({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <AnimatePresence mode="sync">
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt="Nariss character design"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
