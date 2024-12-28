import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  slots: {
    root: "overflow-x-hidden",
    header: "overflow-x-hidden",
    body: "overflow-x-hidden",
    footer: "overflow-x-hidden",
    icon: "overflow-x-hidden",
  },
  variants: {
    variant: {
      default: {
        root: "block h-full",
        header: "",
        body: "flex justify-between items-start space-x-md md:space-x-md",
        footer: "",
        icon: "flex-shrink-0 fill-none text-contrast-medium",
      },
    },
    custom: {
      elevated: {
        root: "bg-background-lightest shadow-md",
      },
      outline: {
        root: "",
      },
      filled: {
        root: "bg-background-lighter",
      },
      nostyle: {
        root: "block",
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
    rounded: {
      none: {
        root: "rounded-none",
        header: "rounded-t-none",
        body: "rounded-none",
        footer: "rounded-b-none",
      },
      "3xs": {
        root: "rounded-3xs",
        header: "rounded-t-3xs",
        footer: "rounded-b-3xs",
      },
      "2xs": {
        root: "rounded-2xs",
        header: "rounded-t-2xs",
        footer: "rounded-b-2xs",
      },
      xs: {
        root: "rounded-xs",
        header: "rounded-t-xs",
        footer: "rounded-b-xs",
      },
      sm: {
        root: "rounded-sm",
        header: "rounded-t-sm",
        footer: "rounded-b-sm",
      },
      md: {
        root: "rounded-md",
        header: "rounded-t-md",
        footer: "rounded-b-md",
      },
      lg: {
        root: "rounded-lg",
        header: "rounded-t-lg",
        footer: "rounded-b-lg",
      },
      xl: {
        root: "rounded-xl",
        header: "rounded-t-xl",
        footer: "rounded-b-xl",
      },
      "2xl": {
        root: "rounded-2xl",
        header: "rounded-t-2xl",
        footer: "rounded-b-2xl",
      },
      "3xl": {
        root: "rounded-3xl",
        header: "rounded-t-3xl",
        footer: "rounded-b-3xl",
      },
      "4xl": {
        root: "rounded-4xl",
        header: "rounded-t-4xl",
        footer: "rounded-b-4xl",
      },
      "5xl": {
        root: "rounded-5xl",
        header: "rounded-t-5xl",
        footer: "rounded-b-5xl",
      },
      "6xl": {
        root: "rounded-6xl",
        header: "rounded-t-6xl",
        footer: "rounded-b-6xl",
      },
      full: {
        root: "rounded-full",
        header: "rounded-t-full",
        footer: "rounded-b-full",
      },
    },
    padding: {
      none: { root: "p-none" },
      "3xs": { root: "p-3xs" },
      "2xs": { root: "p-2xs" },
      xs: { root: "p-xs" },
      sm: { root: "p-sm" },
      md: { root: "p-md" },
      lg: { root: "p-lg" },
      xl: { root: "p-xl" },
      "2xl": { root: "p-2xl" },
      "3xl": { root: "p-3xl" },
      "4xl": { root: "p-4xl" },
      "5xl": { root: "p-5xl" },
      "6xl": { root: "p-6xl" },
      "7xl": { root: "p-7xl" },
      "8xl": { root: "p-8xl" },
      "9xl": { root: "p-9xl" },
      "10xl": { root: "p-10xl" },
    },
    direction: {
      vertical: {
        root: `flex flex-col`,
      },
      horizontal: {
        root: `flex `,
        // body: 'py-lg px-lg sm:pt-lg border-t-1 border-solid border-primary flex justify-between items-start space-x-md md:space-x-md',
        // icon: 'flex-shrink-0 fill-none text-contrast-medium',
      },
    },
    width: {
      none: { root: "" },
      fluid: { root: "w-full" },
      fit: { root: "w-fit" },
    },
    // divider: {
    //   true: {
    //     root: `before:content-[''] before:border-solid before:border-1 before:border-primary-light before:opacity-25`,
    //   },
    // },
  },
  defaultVariants: {
    variant: "default",
    custom: "elevated",
    color: "background",
    direction: "vertical",
    rounded: "md",
    padding: "md",
    width: "fluid",
  },
  compoundVariants: [
    // OUTLINE
    {
      custom: "outline",
      color: "primary",
      className: {
        root: "bg-background-lightest text-contrast-higher border-solid border-2 border-primary",
      },
    },
    {
      custom: "outline",
      color: "secondary",
      className: {
        root: "bg-background-lightest text-contrast-higher border-solid border-2 border-secondary",
      },
    },
    {
      custom: "outline",
      color: "background",
      className: {
        root: "bg-background-lightest text-contrast-higher border-solid border-2 border-background-lighter",
      },
    },
    {
      custom: "outline",
      color: "success",
      className: {
        root: "bg-background-lightest text-contrast-higher border-solid border-2 border-success",
      },
    },
    {
      custom: "outline",
      color: "error",
      className: {
        root: "bg-background-lightest text-contrast-higher border-solid border-2 border-error",
      },
    },
    {
      custom: "outline",
      color: "warning",
      className: {
        root: "bg-background-lightest text-contrast-higher border-solid border-2 border-warning",
      },
    },
  ],
});

export type CardVariantProps = VariantProps<typeof cardVariants>;
export { cardVariants };
