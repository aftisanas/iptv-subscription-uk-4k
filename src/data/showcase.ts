export type ShowcaseItem = {
  src: string;
  alt: string;
  /** Intrinsic pixel size — set on the tag so the row reserves space before load. */
  w: number;
  h: number;
};

/**
 * Decorative artwork only. Filenames and alt text are deliberately generic:
 * naming a title, a broadcaster or a competition here would be a rights claim
 * this site does not make, in the one place on the page a crawler reads as
 * text. The images stay; the labelling does not identify anyone.
 */

/** Row one: poster art, travelling left to right. All cropped to a uniform 2:3. */
export const MOVIES: ShowcaseItem[] = [
  { src: "/marquee/poster-01.webp", alt: "On-demand series artwork", w: 320, h: 480 },
  { src: "/marquee/poster-02.webp", alt: "On-demand film artwork", w: 267, h: 400 },
  { src: "/marquee/poster-03.webp", alt: "On-demand series artwork", w: 320, h: 480 },
  { src: "/marquee/poster-04.webp", alt: "On-demand film artwork", w: 320, h: 480 },
  { src: "/marquee/poster-05.webp", alt: "On-demand film artwork", w: 320, h: 480 },
];

/** Row two: channel tiles, travelling right to left. Uniform height, natural
 *  width — a real channel lineup rather than forced into identical boxes. */
export const CHANNELS: ShowcaseItem[] = [
  { src: "/marquee/tile-01.webp", alt: "Live channel tile", w: 240, h: 200 },
  { src: "/marquee/tile-02.webp", alt: "Live sport channel tile", w: 200, h: 200 },
  { src: "/marquee/tile-03.webp", alt: "Live sport channel tile", w: 200, h: 200 },
  { src: "/marquee/tile-04.webp", alt: "Live news channel tile", w: 196, h: 200 },
  { src: "/marquee/tile-05.webp", alt: "Live sport channel tile", w: 398, h: 200 },
];
