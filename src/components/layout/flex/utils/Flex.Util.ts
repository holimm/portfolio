'use client';

import { createContext, useContext, useMemo } from 'react';
import { flexVariants, type FlexVariantProps } from '../config/Flex.Config';

// Context Provider
const FlexContext = createContext<UseFlexReturn | undefined>(undefined);

const useFlexContext = () => {
  const context = useContext(FlexContext);

  if (!context) {
    throw new Error('Missing FlexProvider');
  }
  return context;
};

const FlexProvider = FlexContext.Provider;

export { FlexProvider, useFlexContext };

// Custom hook for using the context
export interface UseFlexProps extends FlexVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useFlex = (props: UseFlexProps) => {
  const {
    ref: flexRef,
    variant = 'row',
    justify,
    align,
    alignContent,
    wrap,
    gap,
    reverse,
  } = props;

  const { root: flexStyle } = useMemo(
    () =>
      flexVariants({
        variant,
        justify,
        align,
        alignContent,
        wrap,
        gap,
        reverse,
      }),
    [variant, justify, align, alignContent, wrap, gap, reverse]
  );

  return {
    variant,
    flexRef,
    flexStyle,
  };
};

export type UseFlexReturn = ReturnType<typeof useFlex>;
