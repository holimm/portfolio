import { tv, type VariantProps } from "tailwind-variants";

const iconVariants = tv({
  slots: {
    root: "overflow-x-hidden",
  },
  variants: {
    variant: {
      default: {
        root: "",
      },
    },
    color: {
      primary: {
        root: "",
      },
      secondary: {
        root: "",
      },
      background: {
        root: "",
      },
      success: {
        root: "",
      },
      error: {
        root: "",
      },
      warning: {
        root: "",
      },
    },
    strokeColor: {
      none: {
        root: "",
      },
      primary: {
        root: "",
      },
      secondary: {
        root: "",
      },
      background: {
        root: "",
      },
      success: {
        root: "",
      },
      error: {
        root: "",
      },
      warning: {
        root: "",
      },
    },
    contrast: {
      highest: { root: "" },
      higher: { root: "" },
      high: { root: "" },
      medium: { root: "" },
      low: { root: "" },
      lower: { root: "" },
      lowest: { root: "" },
    },
    size: {
      "3xs": { root: "h-2xs w-2xs" },
      "2xs": { root: "h-xs w-xs" },
      xs: { root: "h-sm w-sm" },
      sm: { root: "h-md w-md" },
      md: { root: "h-xl w-xl" },
      lg: { root: "h-2xl w-2xl" },
      xl: { root: "h-3xl w-3xl" },
      "2xl": { root: "h-5xl w-5xl" },
    },
  },
  defaultVariants: {
    variant: "default",
    color: "primary",
    strokeColor: "none",
    contrast: "medium",
    size: "md",
  },
  // text-primary-dark border-solid border-1 border-primary-dark
  compoundVariants: [
    // PRIMARY
    {
      color: "primary",
      contrast: "highest",
      className: {
        root: "fill-primary-darkest",
      },
    },
    {
      color: "primary",
      contrast: "higher",
      className: {
        root: "fill-primary-darker",
      },
    },
    {
      color: "primary",
      contrast: "high",
      className: {
        root: "fill-primary-dark",
      },
    },
    {
      color: "primary",
      contrast: "medium",
      className: {
        root: "fill-primary",
      },
    },
    {
      color: "primary",
      contrast: "low",
      className: {
        root: "fill-primary-light",
      },
    },
    {
      color: "primary",
      contrast: "lower",
      className: {
        root: "fill-primary-lighter",
      },
    },
    {
      color: "primary",
      contrast: "lowest",
      className: {
        root: "fill-primary-lightest",
      },
    },
    // SECONDARY
    {
      color: "secondary",
      contrast: "highest",
      className: {
        root: "fill-secondary-darkest",
      },
    },
    {
      color: "secondary",
      contrast: "higher",
      className: {
        root: "fill-secondary-darker",
      },
    },
    {
      color: "secondary",
      contrast: "high",
      className: {
        root: "fill-secondary-dark",
      },
    },
    {
      color: "secondary",
      contrast: "medium",
      className: {
        root: "fill-secondary",
      },
    },
    {
      color: "secondary",
      contrast: "low",
      className: {
        root: "fill-secondary-light",
      },
    },
    {
      color: "secondary",
      contrast: "lower",
      className: {
        root: "fill-secondary-lighter",
      },
    },
    {
      color: "secondary",
      contrast: "lowest",
      className: {
        root: "fill-secondary-lightest",
      },
    },
    // BACKGROUND
    {
      color: "background",
      contrast: "highest",
      className: {
        root: "fill-background-darkest",
      },
    },
    {
      color: "background",
      contrast: "higher",
      className: {
        root: "fill-background-darker",
      },
    },
    {
      color: "background",
      contrast: "high",
      className: {
        root: "fill-background-dark",
      },
    },
    {
      color: "background",
      contrast: "medium",
      className: {
        root: "fill-background-base",
      },
    },
    {
      color: "background",
      contrast: "low",
      className: {
        root: "fill-background-light",
      },
    },
    {
      color: "background",
      contrast: "lower",
      className: {
        root: "fill-background-lighter",
      },
    },
    {
      color: "background",
      contrast: "lowest",
      className: {
        root: "fill-background-lightest",
      },
    },
    // SUCCESS
    {
      color: "success",
      contrast: "highest",
      className: {
        root: "fill-success-darkest",
      },
    },
    {
      color: "success",
      contrast: "higher",
      className: {
        root: "fill-success-darker",
      },
    },
    {
      color: "success",
      contrast: "high",
      className: {
        root: "fill-success-dark",
      },
    },
    {
      color: "success",
      contrast: "medium",
      className: {
        root: "fill-success",
      },
    },
    {
      color: "success",
      contrast: "low",
      className: {
        root: "fill-success-light",
      },
    },
    {
      color: "success",
      contrast: "lower",
      className: {
        root: "fill-success-lighter",
      },
    },
    {
      color: "success",
      contrast: "lower",
      className: {
        root: "fill-success-lightest",
      },
    },
    // ERROR
    {
      color: "error",
      contrast: "highest",
      className: {
        root: "fill-error-darkest",
      },
    },
    {
      color: "error",
      contrast: "higher",
      className: {
        root: "fill-error-darker",
      },
    },
    {
      color: "error",
      contrast: "high",
      className: {
        root: "fill-error-dark",
      },
    },
    {
      color: "error",
      contrast: "medium",
      className: {
        root: "fill-error",
      },
    },
    {
      color: "error",
      contrast: "low",
      className: {
        root: "fill-error-light",
      },
    },
    {
      color: "error",
      contrast: "lower",
      className: {
        root: "fill-error-lighter",
      },
    },
    {
      color: "error",
      contrast: "lowest",
      className: {
        root: "fill-error-lightest",
      },
    },
    // WARNING
    {
      color: "warning",
      contrast: "higher",
      className: {
        root: "fill-warning-darkest",
      },
    },
    {
      color: "warning",
      contrast: "higher",
      className: {
        root: "fill-warning-darker",
      },
    },
    {
      color: "warning",
      contrast: "high",
      className: {
        root: "fill-warning-dark",
      },
    },
    {
      color: "warning",
      contrast: "medium",
      className: {
        root: "fill-warning",
      },
    },
    {
      color: "warning",
      contrast: "low",
      className: {
        root: "fill-warning-light",
      },
    },
    {
      color: "warning",
      contrast: "lower",
      className: {
        root: "fill-warning-lighter",
      },
    },
    {
      color: "warning",
      contrast: "lower",
      className: {
        root: "fill-warning-lightest",
      },
    },

    // STROKE
    // PRIMARY
    {
      strokeColor: "primary",
      contrast: "highest",
      className: {
        root: "stroke-primary-darkest",
      },
    },
    {
      strokeColor: "primary",
      contrast: "higher",
      className: {
        root: "stroke-primary-darker",
      },
    },
    {
      strokeColor: "primary",
      contrast: "high",
      className: {
        root: "stroke-primary-dark",
      },
    },
    {
      strokeColor: "primary",
      contrast: "medium",
      className: {
        root: "stroke-primary",
      },
    },
    {
      strokeColor: "primary",
      contrast: "low",
      className: {
        root: "stroke-primary-light",
      },
    },
    {
      strokeColor: "primary",
      contrast: "lower",
      className: {
        root: "stroke-primary-lighter",
      },
    },
    {
      strokeColor: "primary",
      contrast: "lowest",
      className: {
        root: "stroke-primary-lightest",
      },
    },
    // SECONDARY
    {
      strokeColor: "secondary",
      contrast: "highest",
      className: {
        root: "stroke-secondary-darkest",
      },
    },
    {
      strokeColor: "secondary",
      contrast: "higher",
      className: {
        root: "stroke-secondary-darker",
      },
    },
    {
      strokeColor: "secondary",
      contrast: "high",
      className: {
        root: "stroke-secondary-dark",
      },
    },
    {
      strokeColor: "secondary",
      contrast: "medium",
      className: {
        root: "stroke-secondary",
      },
    },
    {
      strokeColor: "secondary",
      contrast: "low",
      className: {
        root: "stroke-secondary-light",
      },
    },
    {
      strokeColor: "secondary",
      contrast: "lower",
      className: {
        root: "stroke-secondary-lighter",
      },
    },
    {
      strokeColor: "secondary",
      contrast: "lowest",
      className: {
        root: "stroke-secondary-lightest",
      },
    },
    // BACKGROUND
    {
      strokeColor: "background",
      contrast: "highest",
      className: {
        root: "stroke-background-darkest",
      },
    },
    {
      strokeColor: "background",
      contrast: "higher",
      className: {
        root: "stroke-background-darker",
      },
    },
    {
      strokeColor: "background",
      contrast: "high",
      className: {
        root: "stroke-background-dark",
      },
    },
    {
      strokeColor: "background",
      contrast: "medium",
      className: {
        root: "stroke-background-base",
      },
    },
    {
      strokeColor: "background",
      contrast: "low",
      className: {
        root: "stroke-background-light",
      },
    },
    {
      strokeColor: "background",
      contrast: "lower",
      className: {
        root: "stroke-background-lighter",
      },
    },
    {
      strokeColor: "background",
      contrast: "lowest",
      className: {
        root: "stroke-background-lightest",
      },
    },
    // SUCCESS
    {
      strokeColor: "success",
      contrast: "highest",
      className: {
        root: "stroke-success-darkest",
      },
    },
    {
      strokeColor: "success",
      contrast: "higher",
      className: {
        root: "stroke-success-darker",
      },
    },
    {
      strokeColor: "success",
      contrast: "high",
      className: {
        root: "stroke-success-dark",
      },
    },
    {
      strokeColor: "success",
      contrast: "medium",
      className: {
        root: "stroke-success",
      },
    },
    {
      strokeColor: "success",
      contrast: "low",
      className: {
        root: "stroke-success-light",
      },
    },
    {
      strokeColor: "success",
      contrast: "lower",
      className: {
        root: "stroke-success-lighter",
      },
    },
    {
      strokeColor: "success",
      contrast: "lower",
      className: {
        root: "stroke-success-lightest",
      },
    },
    // ERROR
    {
      strokeColor: "error",
      contrast: "highest",
      className: {
        root: "stroke-error-darkest",
      },
    },
    {
      strokeColor: "error",
      contrast: "higher",
      className: {
        root: "stroke-error-darker",
      },
    },
    {
      strokeColor: "error",
      contrast: "high",
      className: {
        root: "stroke-error-dark",
      },
    },
    {
      strokeColor: "error",
      contrast: "medium",
      className: {
        root: "stroke-error",
      },
    },
    {
      strokeColor: "error",
      contrast: "low",
      className: {
        root: "stroke-error-light",
      },
    },
    {
      strokeColor: "error",
      contrast: "lower",
      className: {
        root: "stroke-error-lighter",
      },
    },
    {
      strokeColor: "error",
      contrast: "lowest",
      className: {
        root: "stroke-error-lightest",
      },
    },
    // WARNING
    {
      strokeColor: "warning",
      contrast: "higher",
      className: {
        root: "stroke-warning-darkest",
      },
    },
    {
      strokeColor: "warning",
      contrast: "higher",
      className: {
        root: "stroke-warning-darker",
      },
    },
    {
      strokeColor: "warning",
      contrast: "high",
      className: {
        root: "stroke-warning-dark",
      },
    },
    {
      strokeColor: "warning",
      contrast: "medium",
      className: {
        root: "stroke-warning",
      },
    },
    {
      strokeColor: "warning",
      contrast: "low",
      className: {
        root: "stroke-warning-light",
      },
    },
    {
      strokeColor: "warning",
      contrast: "lower",
      className: {
        root: "stroke-warning-lighter",
      },
    },
    {
      strokeColor: "warning",
      contrast: "lower",
      className: {
        root: "stroke-warning-lightest",
      },
    },
  ],
});

export type IconVariantProps = VariantProps<typeof iconVariants>;
export { iconVariants };
