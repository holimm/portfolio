import { tv, type VariantProps } from "tailwind-variants";

const linkVariants = tv({
  slots: {
    root: "",
  },
  variants: {
    variant: {
      default: {
        root: "",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
  compoundVariants: [],
});

export type LinkVariantProps = VariantProps<typeof linkVariants>;
export { linkVariants };
