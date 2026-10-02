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

  // One screen of scroll per panel. The pin ends as the last panel arrives, so the page
  // continues downward instead of resting on it.
  const travel = Math.max(sections.length - 1, 0);
  const containerHeight = `${(travel + 1) * 100}vh`;

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
          // Percent of the track, so the distance stays one panel without reading viewport width
          xPercent: sections.length ? (-100 * travel) / sections.length : 0,
          duration: travel,
        });
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
