import { tv, type VariantProps } from "tailwind-variants";

const slidePickerVariants = tv({
  slots: {
    root: "h-fit w-full",
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
  // text-primary-dark border-solid border-1 border-primary-dark
  compoundVariants: [],
});

export type SlidePickerVariantProps = VariantProps<typeof slidePickerVariants>;
export { slidePickerVariants };
