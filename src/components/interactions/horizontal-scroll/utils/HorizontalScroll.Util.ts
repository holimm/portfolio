'use client';

import { createContext, useContext, useMemo, useRef } from 'react';
import {
  horizontalScrollVariants,
  type HorizontalScrollVariantProps,
} from '../config/HorizontalScroll.Config';
import { getPinType, gsap, useGSAP } from '@/config';

// Context Provider
const HorizontalScrollContext = createContext<
  UseHorizontalScrollReturn | undefined
>(undefined);

const useHorizontalScrollContext = () => {
  const context = useContext(HorizontalScrollContext);

  if (!context) {
    throw new Error('Missing HorizontalScrollProvider');
  }
  return context;
};

const HorizontalScrollProvider = HorizontalScrollContext.Provider;

export { HorizontalScrollProvider, useHorizontalScrollContext };

/** Extra scroll, in viewport heights, the last panel stays pinned in full view once it arrives. */
const END_HOLD = 0.5;

// Custom hook for using the context
export interface UseHorizontalScrollProps extends HorizontalScrollVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  sections?: { key: string | number; content: React.ReactNode }[];
}

export const useHorizontalScroll = (props: UseHorizontalScrollProps) => {
  const { ref: horizontalScrollRef, variant = 'default' } = props;

  const { root: horizontalScrollStyle } = useMemo(
    () =>
      horizontalScrollVariants({
        variant,
      }),
    [variant]
  );

  const sections = props.sections ?? [];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // One screen of scroll per panel to travel across, plus a short rest on the last one
  const travel = Math.max(sections.length - 1, 0);
  const containerHeight = `${(travel + 1 + END_HOLD) * 100}vh`;

  // Pin the viewport while the container scrolls past, translating the track by one screen per section
  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: pinRef.current,
            pinSpacing: false,
            pinType: getPinType(),
            // Applies the pin slightly early so fast (touch) scrolling doesn't jump past it
            anticipatePin: 1,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(trackRef.current, {
          x: () => -window.innerWidth * travel,
          duration: travel,
        })
        // Without this the last panel only lands as the section starts scrolling away
        .to({}, { duration: END_HOLD });
    },
    { dependencies: [sections.length], revertOnUpdate: true }
  );

  return {
    variant,
    horizontalScrollRef,
    horizontalScrollStyle,
    scrollContainerRef,
    pinRef,
    trackRef,
    sections,
    containerHeight,
  };
};

export type UseHorizontalScrollReturn = ReturnType<typeof useHorizontalScroll>;
