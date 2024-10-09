"use client";
import { useMemo } from "react";

import { textVariants, type TextVariantProps } from "../styles/text.config";
import { TTextHtml } from "../types/text.types";

export interface TextProps extends TextVariantProps {
  ref?: React.Ref<any> | undefined;
}
export type UseTextProps = TextProps &
  Omit<TextVariantProps, keyof TextVariantProps>;

export const useText = (props: UseTextProps) => {
  const {
    ref: textRef,
    variant = "default",
    ashtml = "paragraph",
    size,
    weight,
    contrast,
    color,
    align,
    wrap,
  } = props;

  const textAsHtml: Record<typeof ashtml, TTextHtml> = {
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
    () => ({ Component: textAsHtml[ashtml] }),
    [variant, ashtml],
  );

  const { root: textStyle } = useMemo(
    () =>
      textVariants({
        variant,
        ashtml,
        size,
        weight,
        contrast,
        color,
        align,
        wrap,
      }),
    [variant, ashtml, size, weight, contrast, color, align, wrap],
  );

  return {
    variant,
    textRef,
    textStyle,
    defaultConfig,
  };
};

export type UseTextReturn = ReturnType<typeof useText>;
