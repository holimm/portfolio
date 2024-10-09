import { tv, type VariantProps } from "tailwind-variants";

const textVariants = tv({
  slots: {
    root: "",
  },
  variants: {
    variant: {
      default: { root: "" },
    },
    ashtml: {
      paragraph: { root: "text-base" },
      bold: { root: "text-base" },
      italic: { root: "text-base" },
      underline: { root: "text-base" },
      cite: { root: "text-base" },
      deleted: { root: "text-base" },
      emphasis: { root: "text-base" },
      inserted: { root: "text-base" },
      kbd: { root: "text-base" },
      mark: { root: "text-base" },
      strike: { root: "text-base" },
      sample: { root: "text-base" },
      sub: { root: "text-base" },
      sup: { root: "text-base" },
    },
    size: {
      "10xl": { root: "text-10xl" },
      "9xl": { root: "text-9xl" },
      "8xl": { root: "text-8xl" },
      "7xl": { root: "text-7xl" },
      "6xl": { root: "text-6xl" },
      "5xl": { root: "text-5xl" },
      "4xl": { root: "text-4xl" },
      "3xl": { root: "text-3xl" },
      "2xl": { root: "text-2xl" },
      xl: { root: "text-xl" },
      lg: { root: "text-lg" },
      md: { root: "text-md" },
      base: { root: "text-base" },
      sm: { root: "text-sm" },
      xs: { root: "text-2xs" },
      "2xs": { root: "text-2xs" },
    },
    weight: {
      light: { root: "font-light" },
      normal: { root: "font-normal" },
      normalPlus: { root: "font-normal-plus" },
      medium: { root: "font-medium" },
      semibold: { root: "font-semibold" },
      bold: { root: "font-bold" },
    },
    contrast: {
      highest: { root: "text-contrast-highest" },
      higher: { root: "text-contrast-higher" },
      high: { root: "text-contrast-high" },
      medium: { root: "text-contrast-medium" },
      low: { root: "text-contrast-low" },
      lower: { root: "text-contrast-lower" },
      lowest: { root: "text-contrast-lowest" },
    },
    color: {
      none: { root: "none" },
      primary: { root: "text-primary" },
      secondary: { root: "text-secondary" },
      warning: { root: "text-warning" },
      success: { root: "text-success" },
      error: { root: "text-error" },
    },
    align: {
      left: { root: "text-start" },
      center: { root: "text-center" },
      right: { root: "text-end" },
    },
    wrap: {
      true: { root: "text-wrap" },
      false: { root: "text-nowrap" },
    },
  },
  defaultVariants: {
    variant: "default",
    font: "primary",
    weight: "normal",
    contrast: "higher",
    align: "left",
    wrap: true,
  },
  compoundVariants: [],
});

export type TextVariantProps = VariantProps<typeof textVariants>;
export { textVariants };
