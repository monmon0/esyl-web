// Illustrations from Esyl's "Souls of Sea" release captions, re-encoded as
// compact JPEGs (public/Nariss/gallery/*.jpg) from the original 10-70MB
// source PNGs — those sources reliably hang Next's image optimizer for 45s+
// and never resolve within a reasonable request timeout.
export type NarissStackImage = {
  title: string;
  src: string;
};

export const NARISS_STACK_IMAGES: NarissStackImage[] = [
  {
    title: "Where do we belong?",
    src: "/Nariss/gallery/where-do-we-belong.jpg",
  },
  {
    title: "As the tale unfolds",
    src: "/Nariss/gallery/as-the-tale-unfolds.jpg",
  },
  {
    title: "Free as the wind, deep as the sea",
    src: "/Nariss/gallery/free-as-the-wind.jpg",
  },
  {
    title: "Veil the truth",
    src: "/Nariss/gallery/veil-the-truth.jpg",
  },
  {
    title: "Along the sea",
    src: "/Nariss/along-the-sea-bg.jpg",
  },
  {
    title: "Ngụ",
    src: "/Nariss/gallery/ngu.jpg",
  },
];
