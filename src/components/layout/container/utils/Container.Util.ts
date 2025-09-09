'use client';

import { createContext, useContext, useMemo } from 'react';
import {
  containerVariants,
  type ContainerVariantProps,
} from '../config/Container.Config';

// Context Provider
const ContainerContext = createContext<UseContainerReturn | undefined>(
  undefined
);

const useContainerContext = () => {
  const context = useContext(ContainerContext);

  if (!context) {
    throw new Error('Missing ContainerProvider');
  }
  return context;
};

const ContainerProvider = ContainerContext.Provider;

export { ContainerProvider, useContainerContext };

// Custom hook for using the context
export interface UseContainerProps extends ContainerVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useContainer = (props: UseContainerProps) => {
  const {
    ref: containerRef,
    variant = 'default',
    height,
    width = '2xl',
    xspace,
    yspace,
    align,
    rounded,
  } = props;

  const { root: containerStyle } = useMemo(
    () =>
      containerVariants({
        variant,
        height,
        width,
        xspace,
        yspace,
        align,
        rounded,
      }),
    [variant, height, width, xspace, yspace, align, rounded]
  );

  return {
    variant,
    containerRef,
    containerStyle,
  };
};

export type UseContainerReturn = ReturnType<typeof useContainer>;
