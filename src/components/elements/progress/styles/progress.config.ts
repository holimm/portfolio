import { tv, type VariantProps } from "tailwind-variants";

const progressVariants = tv({
  slots: {
    root: "",
    childContainer: "",
    child: "",
  },
  variants: {
    variant: {
      straight: {
        root: "relative h-fit w-full",
        childContainer: "relative",
        child: "",
      },
      radial: {
        root: "relative h-fit w-fit rounded-full",
        childContainer: "rotate-90",
        child: "",
      },
      "half-radial": {
        root: "relative h-fit w-fit rounded-full",
        childContainer: "",
        child: "",
      },
      dashboard: {
        root: "",
        childContainer: "",
        child: "",
      },
    },
    color: {
      primary: {
        child: "",
      },
      secondary: {
        child: "",
      },
      background: {
        child: "",
      },
      success: {
        child: "",
      },
      error: {
        child: "",
      },
      warning: {
        child: "",
      },
    },
    contrast: {
      highest: { child: "" },
      higher: { child: "" },
      high: { child: "" },
      medium: { child: "" },
      low: { child: "" },
      lower: { child: "" },
      lowest: { child: "" },
    },
    size: {
      xs: { childContainer: "h-xs w-xs" },
      sm: { childContainer: "h-sm w-sm" },
      md: { childContainer: "h-md w-md" },
      lg: { childContainer: "h-lg w-lg" },
      xl: { childContainer: "h-xl w-xl" },
      "2xl": { childContainer: "h-2xl w-2xl" },
      "3xl": { childContainer: "h-3xl w-3xl" },
      "4xl": { childContainer: "h-4xl w-4xl" },
      "5xl": { childContainer: "h-5xl w-5xl" },
      "6xl": { childContainer: "h-6xl w-6xl" },
      "7xl": { childContainer: "h-7xl w-7xl" },
      "8xl": { childContainer: "h-8xl w-8xl" },
      full: { childContainer: "h-full w-full" },
    },
  },
  defaultVariants: {
    variant: "radial",
    color: "primary",
    contrast: "medium",
    size: "md",
  },
  // text-primary-dark border-solid border-1 border-primary-dark
  compoundVariants: [
    // OUTLINE
    // PRIMARY
    {
      color: "primary",
      contrast: "highest",
      className: {
        child: "text-primary-darkest",
      },
    },
    {
      color: "primary",
      contrast: "higher",
      className: {
        child: "text-primary-darker",
      },
    },
    {
      color: "primary",
      contrast: "high",
      className: {
        child: "text-primary-dark",
      },
    },
    {
      color: "primary",
      contrast: "medium",
      className: {
        child: "text-primary fill-primary",
      },
    },
    {
      color: "primary",
      contrast: "low",
      className: {
        child: "text-primary-light",
      },
    },
    {
      color: "primary",
      contrast: "lower",
      className: {
        child: "text-primary-lighter",
      },
    },
    {
      color: "primary",
      contrast: "lowest",
      className: {
        child: "text-primary-lightest",
      },
    },
    // SECONDARY
    {
      color: "secondary",
      contrast: "highest",
      className: {
        child: "text-secondary-darkest",
      },
    },
    {
      color: "secondary",
      contrast: "higher",
      className: {
        child: "text-secondary-darker",
      },
    },
    {
      color: "secondary",
      contrast: "high",
      className: {
        child: "text-secondary-dark",
      },
    },
    {
      color: "secondary",
      contrast: "medium",
      className: {
        child: "text-secondary",
      },
    },
    {
      color: "secondary",
      contrast: "low",
      className: {
        child: "text-secondary-light",
      },
    },
    {
      color: "secondary",
      contrast: "lower",
      className: {
        child: "text-secondary-lighter",
      },
    },
    {
      color: "secondary",
      contrast: "lowest",
      className: {
        child: "text-secondary-lightest",
      },
    },
    // BACKGROUND
    {
      color: "background",
      contrast: "highest",
      className: {
        child: "text-background-darkest",
      },
    },
    {
      color: "background",
      contrast: "higher",
      className: {
        child: "text-background-darker",
      },
    },
    {
      color: "background",
      contrast: "high",
      className: {
        child: "text-background-dark",
      },
    },
    {
      color: "background",
      contrast: "medium",
      className: {
        child: "text-background-base",
      },
    },
    {
      color: "background",
      contrast: "low",
      className: {
        child: "text-background-light",
      },
    },
    {
      color: "background",
      contrast: "lower",
      className: {
        child: "text-background-lighter",
      },
    },
    {
      color: "background",
      contrast: "lowest",
      className: {
        child: "text-background-lightest",
      },
    },
    // SUCCESS
    {
      color: "success",
      contrast: "highest",
      className: {
        child: "text-success-darkest",
      },
    },
    {
      color: "success",
      contrast: "higher",
      className: {
        child: "text-success-darker",
      },
    },
    {
      color: "success",
      contrast: "high",
      className: {
        child: "text-success-dark",
      },
    },
    {
      color: "success",
      contrast: "medium",
      className: {
        child: "text-success",
      },
    },
    {
      color: "success",
      contrast: "low",
      className: {
        child: "text-success-light",
      },
    },
    {
      color: "success",
      contrast: "lower",
      className: {
        child: "text-success-lighter",
      },
    },
    {
      color: "success",
      contrast: "lowest",
      className: {
        child: "text-success-lightest",
      },
    },
    // ERROR
    {
      color: "error",
      contrast: "highest",
      className: {
        child: "text-error-darkest",
      },
    },
    {
      color: "error",
      contrast: "higher",
      className: {
        child: "text-error-darker",
      },
    },
    {
      color: "error",
      contrast: "high",
      className: {
        child: "text-error-dark",
      },
    },
    {
      color: "error",
      contrast: "medium",
      className: {
        child: "text-error",
      },
    },
    {
      color: "error",
      contrast: "low",
      className: {
        child: "text-error-light",
      },
    },
    {
      color: "error",
      contrast: "lower",
      className: {
        child: "text-error-lighter",
      },
    },
    {
      color: "error",
      contrast: "lowest",
      className: {
        child: "text-error-lightest",
      },
    },
    // WARNING
    {
      color: "warning",
      contrast: "highest",
      className: {
        child: "text-warning-darkest",
      },
    },
    {
      color: "warning",
      contrast: "higher",
      className: {
        child: "text-warning-darker",
      },
    },
    {
      color: "warning",
      contrast: "high",
      className: {
        child: "text-warning-dark",
      },
    },
    {
      color: "warning",
      contrast: "medium",
      className: {
        child: "text-warning",
      },
    },
    {
      color: "warning",
      contrast: "low",
      className: {
        child: "text-warning-light",
      },
    },
    {
      color: "warning",
      contrast: "lower",
      className: {
        child: "text-warning-lighter",
      },
    },
    {
      color: "warning",
      contrast: "lowest",
      className: {
        child: "text-warning-lightest",
      },
    },
  ],
});

export type ProgressVariantProps = VariantProps<typeof progressVariants>;
export { progressVariants };
