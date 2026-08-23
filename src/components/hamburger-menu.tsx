"use client";

/**
 * A fixed, top-center menu toggle drawn as three stacked, tilted rings (a
 * hamburger reimagined as a coil) that collapse into a single oval on click
 * and open a glass circular menu with three destinations.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NARISS_BLUE } from "@/lib/colors";

const RING_COUNT = 3;
const RING_OFFSET = 14;
const RING_RX = 30;
const RING_RY = 9;
const OVAL_RX = 22;
const OVAL_RY = 12;
const CENTER = 40;

const MENU_ITEMS: { label: string; href?: string }[] = [
  { label: "Gallery", href: "/" },
  { label: "Profile", href: "/#profile" },
  { label: "Settings" },
];

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ringRefs = useRef<(SVGEllipseElement | null)[]>([]);

  useEffect(() => {
    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      const offset = (index - (RING_COUNT - 1) / 2) * RING_OFFSET;
      gsap.to(ring, {
        attr: {
          cy: open ? CENTER : CENTER + offset,
          rx: open ? OVAL_RX : RING_RX,
          ry: open ? OVAL_RY : RING_RY,
        },
        duration: 0.5,
        ease: "power3.inOut",
      });
    });
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed top-6 left-1/2 z-50 -translate-x-1/2 cursor-pointer"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {Array.from({ length: RING_COUNT }).map((_, index) => {
            const offset = (index - (RING_COUNT - 1) / 2) * RING_OFFSET;
            return (
              <ellipse
                key={index}
                ref={(el) => {
                  ringRefs.current[index] = el;
                }}
                cx={CENTER}
                cy={CENTER + offset}
                rx={RING_RX}
                ry={RING_RY}
                stroke={NARISS_BLUE}
                strokeWidth="2"
                fill="none"
              />
            );
          })}
        </svg>
      </button>

      <div
        className={`fixed top-28 left-1/2 z-40 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-50 opacity-0"
        }`}
      >
        <nav className="flex h-full w-full flex-col items-center justify-center gap-5">
          {MENU_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-serif text-lg tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => setOpen(false)}
                className="font-serif text-lg tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-70"
              >
                {item.label}
              </button>
            )
          )}
        </nav>
      </div>
    </>
  );
}
