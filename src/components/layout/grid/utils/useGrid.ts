"use client";
import { useMemo } from "react";

import { gridVariants, type GridVariantProps } from "../styles/grid.config";

export interface UseGridProps extends GridVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useGrid = (props: UseGridProps) => {
  const {
    ref: gridRef,
    variant = "default",
    layout = "cols",
    dimension = "12",
    gap = "md",
  } = props;

  const { root: gridStyle } = useMemo(
    () => gridVariants({ variant, layout, dimension, gap }),
    [variant, layout, dimension, gap],
  );

  return {
    variant,
    gridRef,
    gridStyle,
  };
};

export type UseGridReturn = ReturnType<typeof useGrid>;
