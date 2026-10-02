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

  // Measuring every section on scroll forced layout while the hero and horizontal track
  // were moving. Only the parallax variant reads its box.
  const parallaxRef =
    variant === 'parallax' &&
    sectionRef &&
    typeof sectionRef === 'object' &&
    'current' in sectionRef
      ? sectionRef
      : null;
  const { scrollY, visibilityPercentage } = useScrollParallax(parallaxRef);

  const parallaxOffset = useMemo(() => scrollY * 0.5, [scrollY]);

  return {
    layout,
    variant,
    sectionRef,
    sectionStyle,
    parallaxOffset,
    parallaxDirection,
    visibilityPercentage,
  };
};

export type UseSectionReturn = ReturnType<typeof useSection>;
