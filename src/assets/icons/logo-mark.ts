/**
 * The "H." mark: a compressed H followed by a full stop, on a 64-unit grid. The header, the
 * favicon and app icons, and the share image are all drawn from these shapes.
 *
 * Kept free of JSX and path aliases so `scripts/generate-icons.mts` can import it under plain Node.
 */

export const LOGO_MARK_SIZE = 64;

/** The H's two stems and crossbar, as `[x, y, width, height]`. H and dot together are centred. */
export const LOGO_MARK_RECTS: ReadonlyArray<
  readonly [number, number, number, number]
> = [
  [14, 15, 8.5, 34],
  // Overlaps both stems by half a unit so no anti-aliased seam shows where they meet
  [22, 28.5, 9, 7],
  [30.5, 15, 8.5, 34],
];

/** The full stop, sitting on the H's baseline. */
export const LOGO_MARK_DOT = { cx: 45.5, cy: 44.75, r: 4.25 } as const;

interface LogoMarkSvgOptions {
  /** Fill behind the letters. */
  background: string;
  /** Fill of the H and the dot. */
  foreground: string;
  /** `circle` for the mark itself; `square` for icons the platform rounds or crops (iOS, Android). */
  shape: 'circle' | 'square';
  /** Output size in pixels; the drawing scales from the 64-unit grid. */
  size?: number;
  /**
   * Shrinks the letters toward the centre, as a fraction of the size. Square app icons need room
   * because launchers crop up to a fifth off each edge.
   */
  inset?: number;
}

/** A standalone SVG document of the mark, for icon files and `<img>` sources. */
export const logoMarkSvg = ({
  background,
  foreground,
  shape,
  size = LOGO_MARK_SIZE,
  inset = 0,
}: LogoMarkSvgOptions) => {
  const s = LOGO_MARK_SIZE;
  const backdrop =
    shape === 'circle'
      ? `<circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="${background}"/>`
      : `<rect width="${s}" height="${s}" fill="${background}"/>`;
  const scale = 1 - inset * 2;
  const offset = (s * inset).toFixed(3);
  const letters = [
    ...LOGO_MARK_RECTS.map(
      ([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`
    ),
    `<circle cx="${LOGO_MARK_DOT.cx}" cy="${LOGO_MARK_DOT.cy}" r="${LOGO_MARK_DOT.r}"/>`,
  ].join('');

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${s} ${s}">` +
    backdrop +
    `<g fill="${foreground}" transform="translate(${offset} ${offset}) scale(${scale})">${letters}</g>` +
    `</svg>`
  );
};
