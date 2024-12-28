import { tv, type VariantProps } from "tailwind-variants";

const toastVariants = tv({
  slots: {
    root: "fixed left-1/2 top-5 z-50 flex w-full -translate-x-1/2 transform flex-col items-end gap-2",
    child:
      "w-11/12 max-w-[28rem] rounded shadow-lg p-lg border-solid border-l-4 transition-opacity duration-500 ease-in-out",
  },
  variants: {
    variant: {
      default: {
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
  },
  defaultVariants: {
    variant: "default",
  },
  compoundVariants: [],
});

export type ToastVariantProps = VariantProps<typeof toastVariants>;
export { toastVariants };
