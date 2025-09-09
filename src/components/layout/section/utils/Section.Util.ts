'use client';

import { createContext, useContext, useMemo } from 'react';
import {
  sectionVariants,
  type SectionVariantProps,
} from '../config/Section.Config';
import { useScrollParallax } from '@/hooks';

// Context Provider
const SectionContext = createContext<UseSectionReturn | undefined>(undefined);

const useSectionContext = () => {
  const context = useContext(SectionContext);

  if (!context) {
    throw new Error('Missing SectionProvider');
  }
  return context;
};

const SectionProvider = SectionContext.Provider;

export { SectionProvider, useSectionContext };

// Custom hook for using the context
export interface UseSectionProps extends SectionVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  layout?: 'flex' | 'block';
}

export const useSection = (props: UseSectionProps) => {
  const {
    ref: sectionRef,
    layout = 'flex',
    variant = 'default',
    yspace,
    xspace,
    rounded,
    parallaxDirection = 'bottom',
  } = props;

  const { root: sectionStyle } = useMemo(
    () =>
      sectionVariants({
        layout,
        variant,
        yspace,
        xspace,
        rounded,
        parallaxDirection,
      }),
    [layout, variant, yspace, xspace, rounded, parallaxDirection]
  );

  // Parallax effect for sections
  const { scrollY, visibilityPercentage } = useScrollParallax(
    sectionRef as React.RefObject<HTMLElement>
  );

  const parallaxOffset = useMemo(() => scrollY * 0.5, [scrollY]);

  const currentPosition = useMemo(() => {
    if (
      sectionRef &&
      typeof sectionRef === 'object' &&
      'current' in sectionRef &&
      sectionRef.current
    ) {
      return sectionRef.current.getBoundingClientRect().top;
    }
    return 0;
  }, [sectionRef, scrollY]);

  if (props.comp === 'footer') {
    console.log('Parallax Offset:', parallaxOffset);
    console.log('Current Position:', currentPosition);
    console.log('Visibility Percentage:', visibilityPercentage);
  }

  return {
    layout,
    variant,
    sectionRef,
    sectionStyle,
    parallaxOffset,
    parallaxDirection,
    currentPosition,
    visibilityPercentage,
  };
};

export type UseSectionReturn = ReturnType<typeof useSection>;
