import Link from "next/link";
import { ChapterDivider } from "@/components/gallery-plate";
import { SocialLinks } from "@/components/social-links";
import {
  NARISS_BADGE_BORDER,
  NARISS_BADGE_CREAM,
  NARISS_BADGE_INK,
  NARISS_BLACK,
  NARISS_GOLD,
} from "@/lib/colors";

const FOOTER_LINKS = [
  { label: "Profile", href: "/#profile" },
  { label: "Gallery", href: "/gallery" },
];

export function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden px-6 pt-16 pb-10 text-center"
      style={{ backgroundColor: NARISS_BLACK }}
    >
      <div
        aria-hidden
        className="fairytale-stars pointer-events-none absolute inset-0 opacity-50"
      />

      <div className="relative flex flex-col items-center gap-6">
        <p
          className="font-serif text-xs tracking-[0.5em] uppercase"
          style={{ color: NARISS_GOLD }}
        >
          Nariss
        </p>

        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-serif text-sm tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SocialLinks className="flex items-center gap-5" />

        <p
          className="rounded-full border-2 px-5 py-1.5 text-sm tracking-wide shadow-sm"
          style={{
            backgroundColor: NARISS_BADGE_CREAM,
            borderColor: NARISS_BADGE_BORDER,
            color: NARISS_BADGE_INK,
          }}
        >
          Character created by Esyl
        </p>

        <ChapterDivider />

        <p className="font-serif text-xs tracking-[0.3em] text-white/40 uppercase">
          © {new Date().getFullYear()} Esyl. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
