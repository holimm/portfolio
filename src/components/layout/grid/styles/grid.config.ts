import { tv, type VariantProps } from "tailwind-variants";

const gridVariants = tv({
  slots: {
    root: "grid w-full",
  },
  variants: {
    variant: {
      default: { root: "" },
    },
    layout: {
      cols: { root: "" },
      rows: { root: "" },
    },
    dimension: {
      none: { root: "" },
      auto: { root: "" },
      subgrid: { root: "" },
      "1": { root: "" },
      "2": { root: "" },
      "3": { root: "" },
      "4": { root: "" },
      "5": { root: "" },
      "6": { root: "" },
      "7": { root: "" },
      "8": { root: "" },
      "9": { root: "" },
      "10": { root: "" },
      "11": { root: "" },
      "12": { root: "" },
    },
    gap: {
      none: { root: "gap-0" },
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
  },
  defaultVariants: {
    variant: "default",
    layout: "cols",
    dimension: "12",
    gap: "md",
  },
  compoundVariants: [
    // COLS
    {
      layout: "cols",
      dimension: "none",
      className: {
        root: "grid-cols-none",
      },
    },
    {
      layout: "cols",
      dimension: "auto",
      className: {
        root: "grid-flow-col",
      },
    },
    {
      layout: "cols",
      dimension: "subgrid",
      className: {
        root: "grid-cols-subgrid",
      },
    },
    {
      layout: "cols",
      dimension: "1",
      className: {
        root: "grid-cols-1",
      },
    },
    {
      layout: "cols",
      dimension: "2",
      className: {
        root: "grid-cols-2",
      },
    },
    {
      layout: "cols",
      dimension: "3",
      className: {
        root: "grid-cols-3",
      },
    },
    {
      layout: "cols",
      dimension: "4",
      className: {
        root: "grid-cols-4",
      },
    },
    {
      layout: "cols",
      dimension: "5",
      className: {
        root: "grid-cols-5",
      },
    },
    {
      layout: "cols",
      dimension: "6",
      className: {
        root: "grid-cols-6",
      },
    },
    {
      layout: "cols",
      dimension: "7",
      className: {
        root: "grid-cols-7",
      },
    },
    {
      layout: "cols",
      dimension: "8",
      className: {
        root: "grid-cols-8",
      },
    },
    {
      layout: "cols",
      dimension: "9",
      className: {
        root: "grid-cols-9",
      },
    },
    {
      layout: "cols",
      dimension: "10",
      className: {
        root: "grid-cols-10",
      },
    },
    {
      layout: "cols",
      dimension: "11",
      className: {
        root: "grid-cols-11",
      },
    },
    {
      layout: "cols",
      dimension: "12",
      className: {
        root: "grid-cols-1 md:grid-cols-12",
      },
    },
    // ROWS
    {
      layout: "rows",
      dimension: "none",
      className: {
        root: "grid-rows-none",
      },
    },
    {
      layout: "rows",
      dimension: "auto",
      className: {
        root: "grid-flow-row",
      },
    },
    {
      layout: "rows",
      dimension: "subgrid",
      className: {
        root: "grid-rows-subgrid",
      },
    },
    {
      layout: "rows",
      dimension: "1",
      className: {
        root: "grid-rows-1",
      },
    },
    {
      layout: "rows",
      dimension: "2",
      className: {
        root: "grid-rows-2",
      },
    },
    {
      layout: "rows",
      dimension: "3",
      className: {
        root: "grid-rows-3",
      },
    },
    {
      layout: "rows",
      dimension: "4",
      className: {
        root: "grid-rows-4",
      },
    },
    {
      layout: "rows",
      dimension: "5",
      className: {
        root: "grid-rows-5",
      },
    },
    {
      layout: "rows",
      dimension: "6",
      className: {
        root: "grid-rows-6",
      },
    },
    {
      layout: "rows",
      dimension: "7",
      className: {
        root: "grid-rows-7",
      },
    },
    {
      layout: "rows",
      dimension: "8",
      className: {
        root: "grid-rows-8",
      },
    },
    {
      layout: "rows",
      dimension: "9",
      className: {
        root: "grid-rows-9",
      },
    },
    {
      layout: "rows",
      dimension: "10",
      className: {
        root: "grid-rows-10",
      },
    },
    {
      layout: "rows",
      dimension: "11",
      className: {
        root: "grid-rows-11",
      },
    },
    {
      layout: "rows",
      dimension: "12",
      className: {
        root: "grid-rows-12",
      },
    },
  ],
});

export type GridVariantProps = VariantProps<typeof gridVariants>;
export { gridVariants };
