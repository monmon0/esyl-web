import type { SVGProps } from "react";
import {
  NARISS_BADGE_BORDER,
  NARISS_BADGE_CREAM,
  NARISS_BADGE_INK,
} from "@/lib/colors";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/esyil207#",
    Icon: FacebookIcon,
  },
  { label: "Twitter", href: "", Icon: TwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed shadow-sm transition-transform hover:scale-105 sm:h-12 sm:w-12"
          style={{
            backgroundColor: NARISS_BADGE_CREAM,
            borderColor: NARISS_BADGE_BORDER,
            color: NARISS_BADGE_INK,
          }}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
