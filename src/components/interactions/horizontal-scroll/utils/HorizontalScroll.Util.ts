'use client';

import { createContext, useContext, useMemo, useRef } from 'react';
import {
  horizontalScrollVariants,
  type HorizontalScrollVariantProps,
} from '../config/HorizontalScroll.Config';
import { useScroll, useTransform } from 'motion/react';

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

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, (value) => {
    if (typeof window === 'undefined') return 0;
    return value * -window.innerWidth * (sections.length - 1);
  });

  return {
    variant,
    horizontalScrollRef,
    horizontalScrollStyle,
    xValue: x,
    scrollContainerRef,
    sections,
  };
};

export type UseHorizontalScrollReturn = ReturnType<typeof useHorizontalScroll>;
