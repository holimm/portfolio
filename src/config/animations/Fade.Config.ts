import { Easing, Variants } from 'motion/react';

export const fadeVariants = (
  duration: number = 0.5,
  delay: number = 0,
  ease: Easing = 'easeInOut'
): Variants => {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration, delay, ease },
    },
    exit: {
      opacity: 0,
      transition: { duration, delay, ease },
    },
  };
};
