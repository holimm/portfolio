import { tv, type VariantProps } from "tailwind-variants";

const drawerVariants = tv({
  slots: {
    root: "fixed bottom-0 z-[60] h-full w-full",
    content:
      "min-h-[90vh] h-[90%] w-full bg-background-lightest rounded-t-lg fixed bottom-0 z-50 overflow-y-auto scrollbar-hidden overflow-x-hidden",
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

export type DrawerVariantProps = VariantProps<typeof drawerVariants>;
export { drawerVariants };
