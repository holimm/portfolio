import { tv, type VariantProps } from "tailwind-variants";

const containerVariants = tv({
  slots: {
    root: "flex flex-col h-fit relative transition-all duration-200 overflow-hidden",
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
    align: {
      center: { root: "justify-center" },
    },
    yspace: {
      none: { root: "py-0" },
      "2xs": { root: "py-2xs" },
      xs: { root: "py-xs" },
      sm: { root: "py-sm" },
      md: { root: "py-md" },
      lg: { root: "py-lg" },
      xl: { root: "py-xl" },
      "2xl": { root: "py-2xl" },
      "3xl": { root: "py-3xl" },
      "4xl": { root: "py-4xl" },
      "5xl": { root: "py-5xl" },
      "6xl": { root: "py-6xl" },
      "7xl": { root: "py-7xl" },
      "8xl": { root: "py-8xl" },
      "9xl": { root: "py-9xl" },
      "10xl": { root: "py-10xl" },
      "11xl": { root: "py-11xl" },
      "12xl": { root: "py-12xl" },
    },
    xspace: {
      none: { root: "px-0" },
      "2xs": { root: "px-2xs" },
      xs: { root: "px-xs" },
      sm: { root: "px-sm" },
      md: { root: "px-md" },
      lg: { root: "px-lg" },
      xl: { root: "px-xl" },
      "2xl": { root: "px-2xl" },
      "3xl": { root: "px-3xl" },
      "4xl": { root: "px-4xl" },
      "5xl": { root: "px-5xl" },
      "6xl": { root: "px-6xl" },
      "7xl": { root: "px-7xl" },
      "8xl": { root: "px-8xl" },
      "9xl": { root: "px-9xl" },
      "10xl": { root: "px-10xl" },
      "11xl": { root: "px-11xl" },
      "12xl": { root: "px-12xl" },
    },
    width: {
      fluid: { root: "w-full max-w-full" },
      sm: { root: "w-full max-w-sm" },
      md: { root: "w-full max-w-md" },
      lg: { root: "w-full max-w-lg" },
      xl: { root: "w-full max-w-xl" },
      "2xl": { root: "w-full max-w-2xl" },
      "3xl": { root: "w-full max-w-3xl" },
    },
  },
  defaultVariants: {
    variant: "default",
    width: "fluid",
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

export type ContainerVariantProps = VariantProps<typeof containerVariants>;
export { containerVariants };
