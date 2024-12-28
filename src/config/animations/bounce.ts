import { Variants } from "motion/react";

export const bounceVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: [1, 1.1, 1],
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      duration: 0.6,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
