import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    root: "",
  },
  variants: {
    variant: {
      default: {
        root: "px-sm py-md font-light",
      },
    },
    custom: {
      outline: {
        root: "border-solid border-[1px] border-gray-200 rounded-lg outline-none focus:ring-[1px] focus:ring-transparent focus:border-gray-200",
      },
      filled: {
        root: "bg-background-lighter border-solid border-[1px] border-background-lighter outline-none focus:ring-0 focus:ring-transparent",
      },
    },
    rounded: {
      none: { root: "rounded-none" },
      "3xs": { root: "rounded-3xs" },
      "2xs": { root: "rounded-2xs" },
      xs: { root: "rounded-xs" },
      sm: { root: "rounded-sm" },
      md: { root: "rounded-md" },
      lg: { root: "rounded-lg" },
      xl: { root: "rounded-xl" },
      "2xl": { root: "rounded-2xl" },
      full: { root: "rounded-full" },
    },
    size: {
      sm: {
        root: "text-sm",
      },
      md: {
        root: "text-base",
      },
      lg: {
        root: "text-lg",
      },
      xl: {
        root: "text-xl",
      },
    },
    width: {
      fit: {
        root: "w-fit",
      },
      fluid: {
        root: "w-full",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    custom: "outline",
    color: "primary",
    size: "sm",
    width: "fluid",
    rounded: "xs",
  },
  // text-primary-dark border-solid border-1 border-primary-dark
  compoundVariants: [],
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
export { inputVariants };
