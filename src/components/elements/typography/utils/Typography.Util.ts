'use client';

import { useMemo } from 'react';
import {
  typographyVariants,
  type TypographyVariantProps,
} from '../config/Typography.Config';
import { TypographyHtmlTagType } from '@/types';

export interface TypographyProps extends TypographyVariantProps {
  ref?: React.Ref<any> | undefined;
}
export type UseTypographyProps = TypographyProps &
  Omit<TypographyVariantProps, keyof TypographyVariantProps>;

export const useTypography = (props: UseTypographyProps) => {
  const {
    ref: typographyRef,
    variant = 'default',
    ashtml = 'paragraph',
    size,
    weight,
    contrast,
    color,
    align,
    wrap,
    letterSpacing,
    fontFamily,
  } = props;

  const typographyAsHtml: Record<typeof ashtml, TypographyHtmlTagType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    strong: 'strong',
    paragraph: 'p',
    bold: 'b',
    italic: 'i',
    underline: 'u',
    cite: 'cite',
    deleted: 'del',
    emphasis: 'em',
    inserted: 'ins',
    kbd: 'kbd',
    mark: 'mark',
    strike: 's',
    sample: 'samp',
    sub: 'sub',
    sup: 'sup',
    span: 'span',
  };

  const defaultConfig = useMemo(
    () => ({ Component: typographyAsHtml[ashtml] }),
    [variant, ashtml]
  );

  const { root: typographyStyle } = useMemo(
    () =>
      typographyVariants({
        variant,
        ashtml,
        size,
        weight,
        contrast,
        color,
        align,
        wrap,
        letterSpacing,
        fontFamily,
      }),
    [
      variant,
      ashtml,
      size,
      weight,
      contrast,
      color,
      align,
      wrap,
      letterSpacing,
      fontFamily,
    ]
  );

  return {
    variant,
    typographyRef,
    typographyStyle,
    defaultConfig,
  };
};

export type UseTypographyReturn = ReturnType<typeof useTypography>;
