export const NARISS_DESIGNS = [
  { id: 1, src: "/Nariss/Des1.png", swatch: "#c9c2b4", label: "Silver" },
  { id: 2, src: "/Nariss/Des2.png", swatch: "#7a2e2e", label: "Crimson" },
] as const;

export type NarissDesign = (typeof NARISS_DESIGNS)[number];
