import type { AnimationVariants } from '@/types';
import { DEFAULT_TRANSITION } from './Gsap.Config';

export const parentVariants: AnimationVariants = {
  visible: {
    opacity: 1,
    ...DEFAULT_TRANSITION,
  },
  hidden: { opacity: 0 },
};

// Tween the children as one target list; `stagger` offsets each child like staggerChildren did
export const childVariants: AnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, duration: 0.5, ease: 'easeOut', stagger: 0.2 },
};
