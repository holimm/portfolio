import { Variants } from "motion/react";

export const scaleVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { scale: 0, transition: { duration: 0.3 } },
};
