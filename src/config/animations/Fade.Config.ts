import type { AnimationVariants, Easing } from '@/types';

export const fadeVariants = (
  duration: number = 0.5,
  delay: number = 0,
  ease: Easing = 'easeInOut'
): AnimationVariants => {
  return {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      duration,
      delay,
      ease,
    },
    exit: {
      opacity: 0,
      duration,
      delay,
      ease,
    },
  };
};
