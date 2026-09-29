/** Page gutter and max width shared by every section, lining up with the header. */
export const CONTAINER =
  'max-w-screen-3xl mx-auto w-full px-5 md:px-10 2xl:px-14';

/** Vertical rhythm for sections that scroll normally. */
export const SECTION_SPACING = 'py-24 md:py-32 2xl:py-40';

/** Small uppercase key, as used for the hero's meta labels. */
export const META_LABEL =
  'text-contrast-medium text-xs tracking-wider uppercase';

/** Zero-padded running index, e.g. `(01)`. */
export const formatIndex = (index: number) =>
  `(${String(index + 1).padStart(2, '0')})`;
