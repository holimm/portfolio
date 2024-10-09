import { tv, type VariantProps } from "tailwind-variants";

const headerVariants = tv({
  slots: {
    root: "!sticky bottom-0 z-50 w-full py-md border-solid border border-background-lighter",
  },
  variants: {
    theme: {
      default: { root: "" },
      dark: { root: "" },
      light: { root: "" },
    },
    variant: {
      default: {
        root: "",
      },
      dashboard: {
        root: "",
      },
    },
  },
  defaultVariants: {
    variant: "default",
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

export type HeaderVariantProps = VariantProps<typeof headerVariants>;
export { headerVariants };
