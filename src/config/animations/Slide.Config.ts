import { SlideOptions } from '@/types';
import { Variants } from 'framer-motion';

export const slideVariants = ({
  x = 0,
  y = 0,
  duration = 0.5,
  ease = 'easeInOut',
}: SlideOptions = {}): Variants => {
  return {
    hidden: { x, y },
    visible: {
      x: 0,
      y: 0,
      transition: { ease, duration },
    },
    exit: {
      x,
      y,
      transition: { ease, duration },
    },
  };
};
