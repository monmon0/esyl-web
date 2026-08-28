import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HamburgerMenu } from "@/components/hamburger-menu";
import { MusicController } from "@/components/music-controller";
import { MusicProvider } from "@/components/music-context";
import { NotificationPopListener } from "@/components/notification-pop-listener";
import { ScreenRippleLayer } from "@/components/screen-ripple";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nariss's Profile | Original Character by Esyil",
  description:
    "Nariss is a character created by Esyil. Explore her profile, design, and story.",
  openGraph: {
    title: "Nariss's Profile | Original Character by Esyil",
    description:
      "Nariss is a character created by Esyil. Explore her profile, design, and story.",
    url: "https://nariss.vercel.app/",
    siteName: "Esyil's Portfolio",
    images: [
      {
        url: "https://nariss.vercel.app/Nariss/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nariss's Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MusicProvider>
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <HamburgerMenu />
          <MusicController />
        </MusicProvider>
        <NotificationPopListener />
        <ScreenRippleLayer />
      </body>
    </html>
  );
}
