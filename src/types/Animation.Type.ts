import type { gsap } from 'gsap';

export type Direction = 'left' | 'right' | 'top' | 'bottom';

// Named eases registered in Gsap.Config (easeIn/easeOut/easeInOut) plus any GSAP ease
export type Easing = 'easeIn' | 'easeOut' | 'easeInOut' | gsap.EaseString;

export interface SlideOptions {
  x?: number | string | undefined;
  y?: number | string | undefined;
  duration?: number;
  ease?: Easing;
}

export interface AnimationVariants {
  hidden: gsap.TweenVars;
  visible: gsap.TweenVars;
  exit?: gsap.TweenVars;
}

export interface SpringOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}
