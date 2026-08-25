// Every illustration under public/Nariss/gallery — except three files
// (nariss.png, Nariss(1).png, "Nariss lore 1 animation đvvpng.png") between
// 57–63MB each, which reliably hang Next's image optimizer for 45s+ and
// never resolve within a reasonable request timeout. Re-add them once
// they've been compressed/resized at the source. Titles borrowed from the
// /gallery page's captions where that plate already named the same file.
export type NarissStackImage = {
  title: string;
  src: string;
};

export const NARISS_STACK_IMAGES: NarissStackImage[] = [
  {
    title: "Two Souls Beneath One Moon",
    src: "/Nariss/gallery/nariss 14 5 2026 2.png",
  },
  {
    title: "The Watcher at World's Edge",
    src: "/Nariss/gallery/Nariss 22 4 2026.png",
  },
  {
    title: "She Who Waits Behind the Arch",
    src: "/Nariss/gallery/nariss 23 5 2026.png",
  },
  {
    title: "The Mirror Between Tides",
    src: "/Nariss/gallery/Nariss lore 1black ver.png",
  },
  {
    title: "A Breath Held Underwater",
    src: "/Nariss/gallery/Nariss face card 30 5 2026.png",
  },
  {
    title: "Between Drafts",
    src: "/Nariss/gallery/desktop-horizontal copy.png",
  },
];
