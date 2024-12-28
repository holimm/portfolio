"use client";
import { useMemo } from "react";

import {
  typographyVariants,
  type TypographyVariantProps,
} from "../styles/typography.config";
import { TTypographyHtml } from "../types/typography.types";

export interface TypographyProps extends TypographyVariantProps {
  ref?: React.Ref<any> | undefined;
}
export type UseTypographyProps = TypographyProps &
  Omit<TypographyVariantProps, keyof TypographyVariantProps>;

export const useTypography = (props: UseTypographyProps) => {
  const {
    ref: typographyRef,
    variant = "default",
    ashtml = "paragraph",
    size,
    weight,
    contrast,
    align,
    wrap,
    letterSpacing,
  } = props;

  const typographyAsHtml: Record<typeof ashtml, TTypographyHtml> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    strong: "strong",
    paragraph: "p",
    bold: "b",
    italic: "i",
    underline: "u",
    cite: "cite",
    deleted: "del",
    emphasis: "em",
    inserted: "ins",
    kbd: "kbd",
    mark: "mark",
    strike: "s",
    sample: "samp",
    sub: "sub",
    sup: "sup",
  };

  const defaultConfig = useMemo(
    () => ({ Component: typographyAsHtml[ashtml] }),
    [variant, ashtml],
  );

  const { root: typographyStyle } = useMemo(
    () =>
      typographyVariants({
        variant,
        ashtml,
        size,
        weight,
        contrast,
        align,
        wrap,
        letterSpacing,
      }),
    [variant, ashtml, size, weight, contrast, align, wrap, letterSpacing],
  );

  return {
    variant,
    typographyRef,
    typographyStyle,
    defaultConfig,
  };
};

export type UseTypographyReturn = ReturnType<typeof useTypography>;
