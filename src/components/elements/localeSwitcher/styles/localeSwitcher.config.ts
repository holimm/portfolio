import { tv, type VariantProps } from "tailwind-variants";

const localeSwitcherVariants = tv({
  slots: {
    root: "rounded-xs text-contrast-higher font-primary font-bold",
    option: "rounded-xs text-contrast-higher font-primary font-bold",
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

export type LocaleSwitcherVariantProps = VariantProps<
  typeof localeSwitcherVariants
>;
export { localeSwitcherVariants };
