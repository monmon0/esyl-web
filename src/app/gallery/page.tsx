import Image from "next/image";
import { GalleryPlate, ChapterDivider } from "@/components/gallery-plate";
import { NARISS_BLUE, NARISS_GOLD } from "@/lib/colors";

const PLATES: {
  label: string;
  title: string;
  caption: string;
  src: string;
  width: number;
  height: number;
}[] = [
  {
    label: "Chapter I",
    title: "Two Souls Beneath One Moon",
    caption:
      "They say the crescent above the hollow keeps two faces turned from each other — one who remembers the sea, and one who forgot she ever had a tail.",
    src: "/Nariss/nariss 14 5 2026 2.png",
    width: 7200,
    height: 13343,
  },
  {
    label: "Chapter II",
    title: "The Watcher at World's Edge",
    caption:
      "Every dusk she climbs to where the land runs out, waiting for a shoreline that hasn't been born yet.",
    src: "/Nariss/Nariss 22 4 2026.png",
    width: 2200,
    height: 3000,
  },
  {
    label: "Chapter III",
    title: "She Who Waits Behind the Arch",
    caption:
      "Through a carved doorway no hinge has ever opened, something with her face has been crying since before the castle had a name.",
    src: "/Nariss/nariss 23 5 2026.png",
    width: 3000,
    height: 3000,
  },
  {
    label: "Chapter IV",
    title: "Keeper of Small Charms",
    caption:
      "Every trinket strung above her was a wish someone was too afraid to finish making.",
    src: "/Nariss/nariss.png",
    width: 5141,
    height: 8738,
  },
  {
    label: "Chapter V",
    title: "The Mirror Between Tides",
    caption:
      "Look long enough into the glass, and the waves inside it start answering questions you never asked aloud.",
    src: "/Nariss/Nariss lore 1black ver.png",
    width: 1795,
    height: 2527,
  },
  {
    label: "Chapter VI",
    title: "A Breath Held Underwater",
    caption:
      "She has been holding this breath since the story started, and the story has no plans to end.",
    src: "/Nariss/Nariss face card 30 5 2026.png",
    width: 1750,
    height: 2100,
  },
  {
    label: "Chapter VII",
    title: "Two Scales, One Heart",
    caption:
      "Change the color of the tale and it is still the same tail, the same beads, the same girl deciding who to become.",
    src: "/Nariss/Nariss des.png",
    width: 5135,
    height: 5902,
  },
  {
    label: "Epilogue",
    title: "What the Fire Remembers",
    caption:
      "By the time the color settles, only the shape of her turning away is left to tell what happened.",
    src: "/Nariss/Nariss(1).png",
    width: 6100,
    height: 4961,
  },
];

export default function GalleryPage() {
  return (
    <main
      className="relative overflow-hidden"
      style={{ backgroundColor: NARISS_BLUE }}
    >
      <div
        aria-hidden
        className="fairytale-stars pointer-events-none fixed inset-0 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />

      <section className="flex flex-col items-center px-6 pt-40 pb-16 text-center">
        <p
          className="font-serif text-xs tracking-[0.5em] uppercase"
          style={{ color: NARISS_GOLD }}
        >
          A Fairy Tale in Stills
        </p>
        <h1 className="mt-4 font-serif text-4xl text-white md:text-6xl">
          The Nariss Grimoire
        </h1>
        <p className="mt-5 max-w-xl font-serif text-white/60 italic">
          Once, beneath a moon that never rose the same way twice, a girl with
          a borrowed tail began writing herself into a story that wasn&apos;t
          finished yet.
        </p>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-sm border border-white/10 shadow-2xl">
          <Image
            src="/Nariss/nariss 24 5 2026.png"
            alt="Before the light fades"
            width={6945}
            height={4630}
            className="h-auto w-full"
            priority
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </div>
      </section>

      <ChapterDivider />

      <div className="flex flex-col gap-24 py-16 md:gap-28">
        {PLATES.map((plate, index) => (
          <div key={plate.title} className="flex flex-col gap-24 md:gap-28">
            <GalleryPlate
              {...plate}
              align={index % 2 === 0 ? "left" : "right"}
            />
            {index < PLATES.length - 1 && <ChapterDivider />}
          </div>
        ))}
      </div>

      <footer className="px-6 pt-4 pb-28 text-center">
        <ChapterDivider />
        <p
          className="mt-10 font-serif text-sm tracking-[0.3em] uppercase"
          style={{ color: NARISS_GOLD }}
        >
          To be continued…
        </p>
      </footer>
    </main>
  );
}
