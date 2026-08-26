export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Every finished piece in public/Nariss/gallery — excluding the studio
// logo (not artwork) and the oversized color-variant originals that a
// smaller, already-optimized export of the same piece supersedes here
// (as-the-tale-unfolds.jpg, free-as-the-wind.jpg). The remaining PNG
// originals ran 4-70MB straight off the camera roll; each has a
// `-q:v 4`, long-edge-2200px JPEG sibling checked in alongside it
// (visually indistinguishable, 90%+ smaller) so Next's image optimizer
// isn't re-encoding a 70MB source on every first request.
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/Nariss/gallery/as-the-tale-unfolds.jpg",
    alt: "As the tale unfolds",
    width: 994,
    height: 1400,
  },
  {
    src: "/Nariss/gallery/free-as-the-wind.jpg",
    alt: "Free as the wind, deep as the sea",
    width: 1026,
    height: 1400,
  },
  {
    src: "/Nariss/gallery/veil-the-truth.jpg",
    alt: "Veil the truth",
    width: 755,
    height: 1400,
  },
  {
    src: "/Nariss/gallery/where-do-we-belong.jpg",
    alt: "Where do we belong",
    width: 980,
    height: 1400,
  },
  {
    src: "/Nariss/gallery/ngu.jpg",
    alt: "Keeper of small charms",
    width: 823,
    height: 1400,
  },
  {
    src: "/Nariss/gallery/10.jpg",
    alt: "Bound in scale and silver",
    width: 1063,
    height: 2008,
  },
  {
    src: "/Nariss/gallery/12.jpg",
    alt: "Bound in scale and silver, illuminated",
    width: 1063,
    height: 2008,
  },
  {
    src: "/Nariss/gallery/nariss-face-card.jpg",
    alt: "Nariss, close study",
    width: 1750,
    height: 2100,
  },
  {
    src: "/Nariss/gallery/nariss-portrait.jpg",
    alt: "Nariss portrait",
    width: 1605,
    height: 2200,
  },
  {
    src: "/Nariss/gallery/nariss.jpg",
    alt: "Nariss",
    width: 2200,
    height: 1789,
  },
  {
    src: "/Nariss/gallery/along-the-sea.jpg",
    alt: "Along the sea",
    width: 2200,
    height: 1485,
  },
  {
    src: "/Nariss/gallery/nariss-1.jpg",
    alt: "Nariss study",
    width: 1651,
    height: 2200,
  },
  {
    src: "/Nariss/gallery/nariss-23-5-2026.jpg",
    alt: "She who waits behind the arch",
    width: 2200,
    height: 2200,
  },
  {
    src: "/Nariss/gallery/before-the-light-fades.jpg",
    alt: "Before the light fades",
    width: 2200,
    height: 1467,
  },
];
