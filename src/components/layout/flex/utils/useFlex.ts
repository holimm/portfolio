"use client";
import { useMemo } from "react";

import { flexVariants, type FlexVariantProps } from "../styles/flex.config";

export interface UseFlexProps extends FlexVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useFlex = (props: UseFlexProps) => {
  const {
    ref: flexRef,
    variant = "default",
    layout,
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
        layout,
        justify,
        align,
        alignContent,
        wrap,
        gap,
        reverse,
      }),
    [variant, layout, justify, align, alignContent, wrap, gap, reverse],
  );

  return {
    variant,
    flexRef,
    flexStyle,
  };
};

export type UseFlexReturn = ReturnType<typeof useFlex>;
