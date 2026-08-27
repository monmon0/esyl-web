export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  description?: string;
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
    title: "As the Tale Unfolds",
    description:
      "Bạn có tò mò về ma thuật có thể biến một sinh vật kỳ bí thành hình dáng con người?",
  },
  {
    src: "/Nariss/gallery/free-as-the-wind.jpg",
    alt: "Free as the wind, deep as the sea",
    width: 1026,
    height: 1400,
    title: "Free as the Wind, Deep as the Sea",
    description: "Một niềm hân hoan kỳ lạ, một thứ gì vừa quen thuộc vừa lạ lẫm.",
  },
  {
    src: "/Nariss/gallery/veil-the-truth.jpg",
    alt: "Veil the truth",
    width: 755,
    height: 1400,
    title: "Veil the Truth",
    description: "\"Con người sợ hãi điều gì?\"",
  },
  {
    src: "/Nariss/gallery/where-do-we-belong.jpg",
    alt: "Where do we belong",
    width: 980,
    height: 1400,
    title: "Where Do We Belong?",
    description:
      '"Con người thuộc về đâu?"\n\n"Tại sao con người luôn tìm nơi mình thuộc về?"\n\nĐời người vốn ngắn ngủi, có phải vì thế nên họ luôn vô thức đi tìm bản ngã của chính mình? Nariss bắt đầu tò mò về thế giới con người quá đỗi tách biệt ở phía bên kia đại dương, gieo vào lòng nàng cơn gió biển thổi trên triền cát trắng.',
  },
  {
    src: "/Nariss/gallery/ngu.jpg",
    alt: "Keeper of small charms",
    width: 823,
    height: 1400,
    title: "Ngụ",
    description: "Một nơi thoang thoảng mùi biển và hương gỗ.",
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
    title: "Along the Sea",
    description: "\"Vẫn là thứ rất đỗi quen thuộc, vừa xa vừa gần.\"",
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
