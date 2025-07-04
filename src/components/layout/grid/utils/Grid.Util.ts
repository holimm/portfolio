'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { GridVariantProps, gridVariants } from '../config/Grid.Config';
import {
  GridItemVariantProps,
  gridItemVariants,
} from '../config/GridItem.Config';
import { ResponsiveSpan } from '@/types';

// Context Provider
const GridContext = createContext<UseGridReturn | undefined>(undefined);

const useGridContext = () => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error('Missing GridProvider');
  }
  return context;
};

const GridProvider = GridContext.Provider;

export { GridProvider, useGridContext };

// Custom hook for using the context
/* 
GRID
*/
export interface UseGridProps extends GridVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useGrid = (props: UseGridProps) => {
  const {
    ref: gridRef,
    variant,
    dimension = '12',
    layout = 'cols',
    gap = 'md',
  } = props;

  const { root: gridStyle } = useMemo(
    () => gridVariants({ variant, dimension, layout, gap }),
    [variant, dimension, layout, gap]
  );

  return {
    variant,
    gridRef,
    gridStyle,
  };
};

export type UseGridReturn = ReturnType<typeof useGrid>;

/* 
GRID ITEM
*/
export interface UseGridItemProps extends GridItemVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  span?: string | number | ResponsiveSpan[];
}

export const useGridItem = (props: UseGridItemProps) => {
  const {
    ref: gridItemRef,
    variant = 'default',
    layout = 'cols',
    span,
    start,
  } = props;

  const { root: gridItemStyle } = useMemo(
    () => gridItemVariants({ variant, layout, start }),
    [variant, layout, start]
  );

  const generateSpanClass = useCallback(
    (span?: string | number | ResponsiveSpan[]) => {
      if (!span) return '';

      if (Array.isArray(span)) {
        return span
          .map(({ breakpoint, span }) => {
            const prefix = breakpoint ? `${breakpoint}:` : '';
            if (span === 'auto') return `${prefix}col-auto`;
            if (span === 'full') return `${prefix}col-span-full`;
            return `${prefix}col-span-${span}`;
          })
          .join(' ');
      }
      if (span === 'auto') return 'col-auto';
      if (span === 'full') return 'col-span-full';
      return `col-span-${span}`;
    },
    []
  );

  const spanClass = generateSpanClass(span);

  return {
    variant,
    gridItemRef,
    gridItemStyle,
    spanClass,
  };
};

export type UseGridItemReturn = ReturnType<typeof useGridItem>;

// Dummy class for type safety
export const tailwindGridSpanClasses = `
  col-span-1 col-span-2 col-span-3 col-span-4 col-span-5 col-span-6
  col-span-7 col-span-8 col-span-9 col-span-10 col-span-11 col-span-12
  col-span-full col-auto

  sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6
  sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12
  sm:col-span-full sm:col-auto

  md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6
  md:col-span-7 md:col-span-8 md:col-span-9 md:col-span-10 md:col-span-11 md:col-span-12
  md:col-span-full md:col-auto

  lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6
  lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12
  lg:col-span-full lg:col-auto

  xl:col-span-1 xl:col-span-2 xl:col-span-3 xl:col-span-4 xl:col-span-5 xl:col-span-6
  xl:col-span-7 xl:col-span-8 xl:col-span-9 xl:col-span-10 xl:col-span-11 xl:col-span-12
  xl:col-span-full xl:col-auto
`;
