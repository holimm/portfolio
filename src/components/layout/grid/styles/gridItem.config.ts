import { tv, type VariantProps } from "tailwind-variants";

const gridItemVariants = tv({
  slots: {
    root: "w-full",
  },
  variants: {
    variant: {
      default: { root: "h-fit" },
    },
    layout: {
      cols: { root: "" },
      rows: { root: "" },
    },
    span: {
      none: { root: "" },
      full: { root: "" },
      auto: { root: "" },
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
    start: {
      none: { root: "" },
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
  },
  defaultVariants: {
    variant: "default",
    layout: "cols",
    span: "auto",
  },
  compoundVariants: [
    // COLS
    // COLS SPAN
    {
      layout: "cols",
      span: "none",
      className: {
        root: "",
      },
    },
    {
      layout: "cols",
      span: "full",
      className: {
        root: "col-span-full",
      },
    },
    {
      layout: "cols",
      span: "auto",
      className: {
        root: "col-auto",
      },
    },
    {
      layout: "cols",
      span: "1",
      className: {
        root: "col-span-1 md:col-span-1",
      },
    },
    {
      layout: "cols",
      span: "2",
      className: {
        root: "col-span-1 md:col-span-2",
      },
    },
    {
      layout: "cols",
      span: "3",
      className: {
        root: "col-span-1 md:col-span-3",
      },
    },
    {
      layout: "cols",
      span: "4",
      className: {
        root: "col-span-1 md:col-span-4",
      },
    },
    {
      layout: "cols",
      span: "5",
      className: {
        root: "col-span-1 md:col-span-5",
      },
    },
    {
      layout: "cols",
      span: "6",
      className: {
        root: "col-span-1 md:col-span-6",
      },
    },
    {
      layout: "cols",
      span: "7",
      className: {
        root: "col-span-1 md:col-span-7",
      },
    },
    {
      layout: "cols",
      span: "8",
      className: {
        root: "col-span-1 md:col-span-8",
      },
    },
    {
      layout: "cols",
      span: "9",
      className: {
        root: "col-span-1 md:col-span-9",
      },
    },
    {
      layout: "cols",
      span: "10",
      className: {
        root: "col-span-1 md:col-span-10",
      },
    },
    {
      layout: "cols",
      span: "11",
      className: {
        root: "col-span-1 md:col-span-11",
      },
    },
    {
      layout: "cols",
      span: "12",
      className: {
        root: "col-span-1 md:col-span-12",
      },
    },
    // COLS START
    {
      layout: "cols",
      start: "none",
      className: {
        root: "",
      },
    },
    {
      layout: "cols",
      start: "1",
      className: {
        root: "md:col-start-1",
      },
    },
    {
      layout: "cols",
      start: "2",
      className: {
        root: "md:col-start-2",
      },
    },
    {
      layout: "cols",
      start: "3",
      className: {
        root: "md:col-start-3",
      },
    },
    {
      layout: "cols",
      start: "4",
      className: {
        root: "md:col-start-4",
      },
    },
    {
      layout: "cols",
      start: "5",
      className: {
        root: "md:col-start-5",
      },
    },
    {
      layout: "cols",
      start: "6",
      className: {
        root: "md:col-start-6",
      },
    },
    {
      layout: "cols",
      start: "7",
      className: {
        root: "md:col-start-7",
      },
    },
    {
      layout: "cols",
      start: "8",
      className: {
        root: "md:col-start-8",
      },
    },
    {
      layout: "cols",
      start: "9",
      className: {
        root: "md:col-start-9",
      },
    },
    {
      layout: "cols",
      start: "10",
      className: {
        root: "md:col-start-10",
      },
    },
    {
      layout: "cols",
      start: "11",
      className: {
        root: "md:col-start-11",
      },
    },
    {
      layout: "cols",
      start: "12",
      className: {
        root: "md:col-start-12",
      },
    },

    // ROWS
    {
      layout: "rows",
      span: "none",
      className: {
        root: "",
      },
    },
    {
      layout: "rows",
      span: "full",
      className: {
        root: "row-span-full",
      },
    },
    {
      layout: "rows",
      span: "auto",
      className: {
        root: "row-auto",
      },
    },
    {
      layout: "rows",
      span: "1",
      className: {
        root: "md:row-span-1",
      },
    },
    {
      layout: "rows",
      span: "2",
      className: {
        root: "md:row-span-2",
      },
    },
    {
      layout: "rows",
      span: "3",
      className: {
        root: "md:row-span-3",
      },
    },
    {
      layout: "rows",
      span: "4",
      className: {
        root: "md:row-span-4",
      },
    },
    {
      layout: "rows",
      span: "5",
      className: {
        root: "md:row-span-5",
      },
    },
    {
      layout: "rows",
      span: "6",
      className: {
        root: "md:row-span-6",
      },
    },
    {
      layout: "rows",
      span: "7",
      className: {
        root: "md:row-span-7",
      },
    },
    {
      layout: "rows",
      span: "8",
      className: {
        root: "md:row-span-8",
      },
    },
    {
      layout: "rows",
      span: "9",
      className: {
        root: "md:row-span-9",
      },
    },
    {
      layout: "rows",
      span: "10",
      className: {
        root: "md:row-span-10",
      },
    },
    {
      layout: "rows",
      span: "11",
      className: {
        root: "md:row-span-11",
      },
    },
    {
      layout: "rows",
      span: "12",
      className: {
        root: "md:row-span-12",
      },
    },
    {
      layout: "rows",
      start: "none",
      className: {
        root: "",
      },
    },
    {
      layout: "rows",
      start: "1",
      className: {
        root: "row-start-1",
      },
    },
    {
      layout: "rows",
      start: "2",
      className: {
        root: "row-start-2",
      },
    },
    {
      layout: "rows",
      start: "3",
      className: {
        root: "row-start-3",
      },
    },
    {
      layout: "rows",
      start: "4",
      className: {
        root: "row-start-4",
      },
    },
    {
      layout: "rows",
      start: "5",
      className: {
        root: "row-start-5",
      },
    },
    {
      layout: "rows",
      start: "6",
      className: {
        root: "row-start-6",
      },
    },
    {
      layout: "rows",
      start: "7",
      className: {
        root: "row-start-7",
      },
    },
    {
      layout: "rows",
      start: "8",
      className: {
        root: "row-start-8",
      },
    },
    {
      layout: "rows",
      start: "9",
      className: {
        root: "row-start-9",
      },
    },
    {
      layout: "rows",
      start: "10",
      className: {
        root: "row-start-10",
      },
    },
    {
      layout: "rows",
      start: "11",
      className: {
        root: "row-start-11",
      },
    },
    {
      layout: "rows",
      start: "12",
      className: {
        root: "row-start-12",
      },
    },
  ],
});

export type GridItemVariantProps = VariantProps<typeof gridItemVariants>;
export { gridItemVariants };
