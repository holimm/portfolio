'use client';

import { createContext, useContext, useMemo } from 'react';
import {
  sectionVariants,
  type SectionVariantProps,
} from '../config/Section.Config';

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
  } = props;

  const { root: sectionStyle } = useMemo(
    () => sectionVariants({ layout, variant, yspace, xspace }),
    [layout, variant, yspace, xspace]
  );

  return {
    layout,
    variant,
    sectionRef,
    sectionStyle,
  };
};

export type UseSectionReturn = ReturnType<typeof useSection>;
