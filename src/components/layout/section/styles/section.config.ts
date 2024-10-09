import { tv, type VariantProps } from "tailwind-variants";

const sectionVariants = tv({
  slots: {
    root: "relative flex flex-col justify-center items-center transition-all duration-200 bg-background-base overflow-x-hidden",
  },
  variants: {
    theme: {
      default: { root: "" },
      dark: { root: "" },
      light: { root: "" },
    },
    variant: {
      default: { root: "" },
    },
    yspace: {
      none: { root: "py-0" },
      xs: { root: "py-xs" },
      sm: { root: "py-sm" },
      md: { root: "py-md" },
      lg: { root: "py-lg" },
      xl: { root: "py-xl" },
      "2xl": { root: "py-xl md:py-2xl" },
      "3xl": { root: "py-xl md:py-3xl" },
      "4xl": { root: "py-2xl md:py-4xl" },
      "5xl": { root: "py-3xl md:py-5xl" },
      "6xl": { root: "py-4xl md:py-6xl" },
      "7xl": { root: "py-5xl md:py-7xl" },
      "8xl": { root: "py-6xl md:py-8xl" },
      "9xl": { root: "py-7xl md:py-9xl" },
      "10xl": { root: "py-8xl md:py-10xl" },
      "11xl": { root: "py-9xl md:py-11xl" },
      "12xl": { root: "py-10xl md:py-12xl" },
    },
    xspace: {
      none: { root: "px-0" },
      xs: { root: "px-xs" },
      sm: { root: "px-sm" },
      md: { root: "px-md" },
      lg: { root: "px-lg" },
      xl: { root: "px-xl" },
      "2xl": { root: "px-xl md:px-2xl" },
      "3xl": { root: "px-xl md:px-3xl" },
      "4xl": { root: "px-2xl md:px-4xl" },
      "5xl": { root: "px-3xl md:px-5xl" },
      "6xl": { root: "px-4xl md:px-6xl" },
      "7xl": { root: "px-5xl md:px-7xl" },
      "8xl": { root: "px-6xl md:px-8xl" },
      "9xl": { root: "px-7xl md:px-9xl" },
      "10xl": { root: "px-8xl md:px-10xl" },
      "11xl": { root: "px-9xl md:px-11xl" },
      "12xl": { root: "px-10xl md:px-12xl" },
    },
  },
  defaultVariants: {
    variant: "default",
    yspace: "9xl",
    xspace: "md",
    theme: "default",
  },
  compoundVariants: [
    // Body variant
    // {
    //   variant: "h1",
    //   font: "secondary",
    //   className: {
    //     root: "text-sm",
    //   },
    // },
  ],
});

export type SectionVariantProps = VariantProps<typeof sectionVariants>;
export { sectionVariants };
