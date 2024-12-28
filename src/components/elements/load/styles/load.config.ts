import { tv, type VariantProps } from "tailwind-variants";

const loadVariants = tv({
  slots: {
    root: "fixed top-0 z-[9999] h-screen w-screen",
  },
  variants: {
    variant: {
      default: {
        root: "",
      },
    },
    loading: {
      true: {
        root: "block bg-black-alpha-500",
      },
      false: {
        root: "hidden",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
  compoundVariants: [],
});

export type LoadVariantProps = VariantProps<typeof loadVariants>;
export { loadVariants };
