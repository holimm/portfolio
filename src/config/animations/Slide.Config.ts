import type { AnimationVariants, SlideOptions } from '@/types';

export const slideVariants = ({
  x = 0,
  y = 0,
  duration = 0.5,
  ease = 'easeInOut',
}: SlideOptions = {}): AnimationVariants => {
  return {
    hidden: { x, y },
    visible: {
      x: 0,
      y: 0,
      ease,
      duration,
    },
    exit: {
      x,
      y,
      ease,
      duration,
    },
  };
};
