import { Variants } from "framer-motion";

export const accordionVariants: Variants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
  open: { height: "auto", opacity: 1, transition: { duration: 0.5 } },
};
