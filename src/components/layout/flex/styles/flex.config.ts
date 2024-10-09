import { tv, type VariantProps } from "tailwind-variants";

const flexVariants = tv({
  slots: {
    root: "flex",
  },
  variants: {
    variant: {
      default: { root: "" },
    },
    layout: {
      row: { root: "flex-row" },
      col: { root: "flex-col" },
    },
    justify: {
      start: { root: "justify-start" },
      end: { root: "justify-end" },
      center: { root: "justify-center" },
      between: { root: "justify-between" },
      around: { root: "justify-around" },
      evenly: { root: "justify-evenly" },
    },
    align: {
      stretch: { root: "items-stretch" },
      start: { root: "items-start" },
      end: { root: "items-end" },
      center: { root: "items-center" },
      baseline: { root: "items-baseline" },
    },
    alignContent: {
      stretch: { root: "content-stretch" },
      start: { root: "content-start" },
      end: { root: "content-end" },
      center: { root: "content-center" },
      between: { root: "content-between" },
      around: { root: "content-around" },
    },
    wrap: {
      nowrap: { root: "flex-nowrap" },
      wrap: { root: "flex-wrap" },
    },
    gap: {
      none: { root: "gap-0" },
      "2xs": { root: "gap-2xs" },
      xs: { root: "gap-xs" },
      sm: { root: "gap-sm" },
      md: { root: "gap-md" },
      lg: { root: "gap-lg" },
      xl: { root: "gap-xl" },
      "2xl": { root: "gap-2xl" },
      "3xl": { root: "gap-3xl" },
      "4xl": { root: "gap-4xl" },
      "5xl": { root: "gap-5xl" },
      "6xl": { root: "gap-6xl" },
      "7xl": { root: "gap-7xl" },
      "8xl": { root: "gap-8xl" },
      "9xl": { root: "gap-9xl" },
      "10xl": { root: "gap-10xl" },
      "11xl": { root: "gap-11xl" },
      "12xl": { root: "gap-12xl" },
      "13xl": { root: "gap-13xl" },
      "14xl": { root: "gap-14xl" },
      "15xl": { root: "gap-15xl" },
    },
    reverse: {
      true: { root: "" },
      false: { root: "" },
    },
  },
  defaultVariants: {
    variant: "default",
    layout: "row",
    gap: "md",
  },
  compoundVariants: [
    // REVERSE
    {
      layout: "row",
      reverse: true,
      className: {
        root: "flex-row-reverse",
      },
    },
    {
      layout: "col",
      reverse: true,
      className: {
        root: "flex-col-reverse",
      },
    },
  ],
});

export type FlexVariantProps = VariantProps<typeof flexVariants>;
export { flexVariants };
