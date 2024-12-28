import { tv, type VariantProps } from "tailwind-variants";

const modalVariants = tv({
  slots: {
    root: "fixed bottom-0 z-[60] h-full w-full flex justify-center items-center",
    content:
      "max-h-[90vh] h-fit w-11/12 absolute z-50 p-lg bg-background-lightest rounded-lg overflow-y-auto scrollbar-hidden overflow-x-hidden",
    overlay: "h-full w-full bg-black-alpha-500 shadow-xl fixed bottom-0 z-40",
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

export type ModalVariantProps = VariantProps<typeof modalVariants>;
export { modalVariants };
