import { Variants } from "motion/react";

export const fadeVariants = (duration: number = 0.5): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: duration } },
    exit: { opacity: 0, transition: { duration: duration } },
  };
};
