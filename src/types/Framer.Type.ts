import { Easing } from 'motion/react';

export type Direction = 'left' | 'right' | 'top' | 'bottom';

export interface SlideOptions {
  x?: number | string | undefined;
  y?: number | string | undefined;
  duration?: number;
  ease?: Easing;
}
