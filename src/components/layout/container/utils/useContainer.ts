"use client";
import { useMemo } from "react";
import {
  containerVariants,
  type ContainerVariantProps,
} from "../styles/container.config";

export interface UseContainerProps extends ContainerVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useContainer = (props: UseContainerProps) => {
  const {
    ref: containerRef,
    variant = "default",
    width = "2xl",
    xspace,
    yspace,
    align,
  } = props;

  const { root: containerStyle } = useMemo(
    () => containerVariants({ variant, width, xspace, yspace, align }),
    [variant, width, xspace, yspace, align],
  );

  return {
    variant,
    containerRef,
    containerStyle,
  };
};

export type UseContainerReturn = ReturnType<typeof useContainer>;
