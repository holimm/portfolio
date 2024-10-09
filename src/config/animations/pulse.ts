import { Variants } from "framer-motion";

export const pulseVariants: Variants = {
  visible: {
    scale: [1, 1.1, 1],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.8,
    },
  },
};
