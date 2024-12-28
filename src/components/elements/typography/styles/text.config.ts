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
      "11xl": { root: "text-11xl" },
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
      xs: { root: "text-xs" },
      "2xs": { root: "text-2xs" },
    },
    weight: {
      hairline: { root: "font-hairline" },
      thin: { root: "font-thin" },
      light: { root: "font-light" },
      normal: { root: "font-normal" },
      normalPlus: { root: "font-normal-plus" },
      medium: { root: "font-medium" },
      semibold: { root: "font-semibold" },
      bold: { root: "font-bold" },
      extrabold: { root: "font-extrabold" },
      black: { root: "font-black" },
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
      none: { root: "" },
      default: { root: "" },
      invert: { root: "text-invert" },
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
    letterSpacing: {
      tightest: { root: "tracking-tightest" },
      tighter: { root: "tracking-tighter" },
      tight: { root: "tracking-tight" },
      normal: { root: "tracking-normal" },
      wide: { root: "tracking-wide" },
      wider: { root: "tracking-wider" },
      widest: { root: "tracking-widest" },
    },
  },
  defaultVariants: {
    variant: "default",
    font: "primary",
    weight: "normal",
    contrast: "highest",
    align: "left",
    wrap: true,
  },
  compoundVariants: [
    // INVERT
    {
      color: "invert",
      contrast: "highest",
      className: {
        root: "text-invert-highest",
      },
    },
    {
      color: "invert",
      contrast: "higher",
      className: {
        root: "text-invert-higher",
      },
    },
    {
      color: "invert",
      contrast: "high",
      className: {
        root: "text-invert-high",
      },
    },
    {
      color: "invert",
      contrast: "medium",
      className: {
        root: "text-invert-medium",
      },
    },
    {
      color: "invert",
      contrast: "low",
      className: {
        root: "text-invert-low",
      },
    },
    {
      color: "invert",
      contrast: "lower",
      className: {
        root: "text-invert-lower",
      },
    },
    {
      color: "invert",
      contrast: "lowest",
      className: {
        root: "text-invert-lowest",
      },
    },
    // PRIMARY
    {
      color: "primary",
      contrast: "highest",
      className: {
        root: "text-primary-darkest",
      },
    },
    {
      color: "primary",
      contrast: "higher",
      className: {
        root: "text-primary-darker",
      },
    },
    {
      color: "primary",
      contrast: "high",
      className: {
        root: "text-primary-dark",
      },
    },
    {
      color: "primary",
      contrast: "medium",
      className: {
        root: "text-primary",
      },
    },
    {
      color: "primary",
      contrast: "low",
      className: {
        root: "text-primary-light",
      },
    },
    {
      color: "primary",
      contrast: "lower",
      className: {
        root: "text-primary-lighter",
      },
    },
    {
      color: "primary",
      contrast: "lowest",
      className: {
        root: "text-primary-lightest",
      },
    },
    // SECONDARY
    {
      color: "secondary",
      contrast: "highest",
      className: {
        root: "text-secondary-darkest",
      },
    },
    {
      color: "secondary",
      contrast: "higher",
      className: {
        root: "text-secondary-darker",
      },
    },
    {
      color: "secondary",
      contrast: "high",
      className: {
        root: "text-secondary-dark",
      },
    },
    {
      color: "secondary",
      contrast: "medium",
      className: {
        root: "text-secondary",
      },
    },
    {
      color: "secondary",
      contrast: "low",
      className: {
        root: "text-secondary-light",
      },
    },
    {
      color: "secondary",
      contrast: "lower",
      className: {
        root: "text-secondary-lighter",
      },
    },
    {
      color: "secondary",
      contrast: "lowest",
      className: {
        root: "text-secondary-lightest",
      },
    },
    // WARNING
    {
      color: "warning",
      contrast: "highest",
      className: {
        root: "text-warning-darkest",
      },
    },
    {
      color: "warning",
      contrast: "higher",
      className: {
        root: "text-warning-darker",
      },
    },
    {
      color: "warning",
      contrast: "high",
      className: {
        root: "text-warning-dark",
      },
    },
    {
      color: "warning",
      contrast: "medium",
      className: {
        root: "text-warning",
      },
    },
    {
      color: "warning",
      contrast: "low",
      className: {
        root: "text-warning-light",
      },
    },
    {
      color: "warning",
      contrast: "lower",
      className: {
        root: "text-warning-lighter",
      },
    },
    {
      color: "warning",
      contrast: "lowest",
      className: {
        root: "text-warning-lightest",
      },
    },
    // SUCCESS
    {
      color: "success",
      contrast: "highest",
      className: {
        root: "text-success-darkest",
      },
    },
    {
      color: "success",
      contrast: "higher",
      className: {
        root: "text-success-darker",
      },
    },
    {
      color: "success",
      contrast: "high",
      className: {
        root: "text-success-dark",
      },
    },
    {
      color: "success",
      contrast: "medium",
      className: {
        root: "text-success",
      },
    },
    {
      color: "success",
      contrast: "low",
      className: {
        root: "text-success-light",
      },
    },
    {
      color: "success",
      contrast: "lower",
      className: {
        root: "text-success-lighter",
      },
    },
    {
      color: "success",
      contrast: "lowest",
      className: {
        root: "text-success-lightest",
      },
    },
    // ERROR
    {
      color: "error",
      contrast: "highest",
      className: {
        root: "text-error-darkest",
      },
    },
    {
      color: "error",
      contrast: "higher",
      className: {
        root: "text-error-darker",
      },
    },
    {
      color: "error",
      contrast: "high",
      className: {
        root: "text-error-dark",
      },
    },
    {
      color: "error",
      contrast: "medium",
      className: {
        root: "text-error",
      },
    },
    {
      color: "error",
      contrast: "low",
      className: {
        root: "text-error-light",
      },
    },
    {
      color: "error",
      contrast: "lower",
      className: {
        root: "text-error-lighter",
      },
    },
    {
      color: "error",
      contrast: "lowest",
      className: {
        root: "text-error-lightest",
      },
    },
  ],
});

export type TextVariantProps = VariantProps<typeof textVariants>;
export { textVariants };
