import { tv, type VariantProps } from "tailwind-variants";

const dropdownVariants = tv({
  slots: {
    root: "relative h-fit",
    header: "",
    content: "w-full h-fit absolute z-50 bg-background-base shadow-lg",
  },
  variants: {
    variant: {
      default: {
        root: "",
        header: "",
        content: "",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
  // text-primary-dark border-solid border-1 border-primary-dark
  compoundVariants: [],
});

export type DropdownVariantProps = VariantProps<typeof dropdownVariants>;
export { dropdownVariants };
