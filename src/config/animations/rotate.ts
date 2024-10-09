import { Variants } from "framer-motion";

export const rotateVariants: Variants = {
  hidden: { rotate: 90, opacity: 0 },
  visible: { rotate: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { rotate: -90, opacity: 0, transition: { duration: 0.5 } },
};
