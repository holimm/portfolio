"use client";
import { useMemo } from "react";

import {
  headingVariants,
  type HeadingVariantProps,
} from "../styles/heading.types";
import { THeadingHtml } from "../types/heading.types";

export interface HeadingProps extends HeadingVariantProps {
  ref?: React.Ref<any> | undefined;
}
export type UseHeadingProps = HeadingProps &
  Omit<HeadingVariantProps, keyof HeadingVariantProps>;

export const useHeading = (props: UseHeadingProps) => {
  const {
    ref: headingRef,
    variant = "default",
    ashtml = "h5",
    size,
    weight,
    contrast,
    align,
    wrap,
  } = props;

  const headingAsHtml: Record<typeof ashtml, THeadingHtml> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    strong: "strong",
  };

  const defaultConfig = useMemo(
    () => ({ Component: headingAsHtml[ashtml] }),
    [variant, ashtml],
  );

  const { root: headingStyle } = useMemo(
    () =>
      headingVariants({
        variant,
        ashtml,
        size,
        weight,
        contrast,
        align,
        wrap,
      }),
    [variant, ashtml, size, weight, contrast, align, wrap],
  );

  return {
    variant,
    headingRef,
    headingStyle,
    defaultConfig,
  };
};

export type UseHeadingReturn = ReturnType<typeof useHeading>;
