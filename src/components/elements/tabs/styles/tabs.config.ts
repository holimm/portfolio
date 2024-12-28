import { tv, type VariantProps } from "tailwind-variants";

const tabsVariants = tv({
  slots: {
    root: "h-fit text-nowrap",
    tabList: "flex justify-start items-center gap-md",
    tabItem: "px-md py-sm cursor-pointer",
    tabPanels: "p-md",
    tabContent: "",
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

export type TabsVariantProps = VariantProps<typeof tabsVariants>;
export { tabsVariants };
