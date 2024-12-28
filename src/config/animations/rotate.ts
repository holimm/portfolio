import { Variants } from "motion/react";

export const rotateVariants: Variants = {
  hidden: { rotate: 90 },
  visible: { rotate: 0, transition: { duration: 0.5 } },
  exit: { rotate: -90, transition: { duration: 0.5 } },
};
