"use client";
import { useMemo } from "react";

import {
  gridItemVariants,
  type GridItemVariantProps,
} from "../styles/gridItem.config";

export interface UseGridItemProps extends GridItemVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useGridItem = (props: UseGridItemProps) => {
  const {
    ref: gridItemRef,
    variant = "default",
    layout = "cols",
    span = "none",
    start,
  } = props;

  const { root: gridItemStyle } = useMemo(
    () => gridItemVariants({ variant, layout, span, start }),
    [variant, layout, span, start],
  );

  return {
    variant,
    gridItemRef,
    gridItemStyle,
  };
};

export type UseGridItemReturn = ReturnType<typeof useGridItem>;
