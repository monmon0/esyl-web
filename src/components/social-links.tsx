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

function CaraIcon(props: SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M15.5 9a4.5 4.5 0 1 0 0 6" />
    </svg>
  );
}

function BlueskyIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 9c-1.2-2.5-3.6-4.5-6-4.5-1 0-1.5.6-1.5 1.6 0 2.4 1.6 6.1 4 7.7-1 .1-2 .5-2 1.4 0 1.2 1.4 1.8 2.5 1.8 1.6 0 2.7-.8 3-2 .3 1.2 1.4 2 3 2 1.1 0 2.5-.6 2.5-1.8 0-.9-1-1.3-2-1.4 2.4-1.6 4-5.3 4-7.7 0-1-.5-1.6-1.5-1.6-2.4 0-4.8 2-6 4.5z" />
    </svg>
  );
}

const LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/esyil207#",
    Icon: FacebookIcon,
  },
  { label: "Cara", href: "https://cara.app/esyil", Icon: CaraIcon },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/esyil207.bsky.social",
    Icon: BlueskyIcon,
  },
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
