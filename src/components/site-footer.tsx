import Image from "next/image";
import Link from "next/link";
import { Monsieur_La_Doulaise } from "next/font/google";
import { SocialLinks } from "@/components/social-links";
import { NARISS_BLACK, NARISS_GOLD } from "@/lib/colors";

const FOOTER_LINKS: { label: string; href?: string }[] = [
  { label: "Profile", href: "/#profile" },
  { label: "Gallery", href: "/gallery" },
  { label: "Settings", href: "/settings" },
];

const footerTitleFont = Monsieur_La_Doulaise({
  weight: "400",
  subsets: ["latin"],
});

// Sticky reveal footer: the page content above scrolls normally (it's a
// plain block, stacked at z-10 via the layout's children wrapper), while
// this footer sits right after it in flow but pins to the viewport bottom
// (sticky + z-0) once reached, so it reads as rising up from underneath
// rather than just scrolling into place.
export function SiteFooter() {
  return (
    <footer
      className="sticky bottom-0 left-0 z-0 h-80 w-full overflow-hidden md:h-96"
      style={{ backgroundColor: NARISS_BLACK }}
    >
      <div
        aria-hidden
        className="fairytale-stars pointer-events-none absolute inset-0 opacity-50"
      />

      <div className="relative flex h-full w-full flex-col items-end justify-start px-8 py-8 text-right sm:px-12 sm:py-10">
        <div className="flex w-full items-start justify-between">
          <ul className="space-y-2 text-left text-xs text-white/70 uppercase sm:text-sm">
            {FOOTER_LINKS.map((link) =>
              link.href ? (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <button
                    type="button"
                    className="uppercase transition-colors hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ),
            )}
          </ul>
          <SocialLinks className="flex items-center gap-3" />
        </div>

        <Link
          href="/"
          aria-label="Go to landing page"
          className="flex flex-1 w-full items-center justify-end transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="Esyl"
            width={1991}
            height={1528}
            className="h-28 w-auto sm:h-40 md:h-48"
          />
        </Link>

        <p className="pt-6 text-[10px] text-white/40 uppercase sm:text-xs">
          © {new Date().getFullYear()} Esyl. All rights reserved.
        </p>
      </div>

      <h2
        aria-hidden
        className={`${footerTitleFont.className} pointer-events-none absolute bottom-0 left-4 translate-y-1/4 text-[88px] leading-none sm:left-8 sm:text-[160px] md:translate-y-1/3 md:text-[220px]`}
        style={{ color: NARISS_GOLD, opacity: 0.18 }}
      >
        Nariss
      </h2>
    </footer>
  );
}
