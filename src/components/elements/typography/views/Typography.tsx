'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { useTypography, UseTypographyProps } from '../utils/Typography.Util';

export interface TypographyProps
  extends UseTypographyProps,
    Omit<HTMLAttributes<HTMLElement>, 'color'> {}

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    {
      className,
      children,
      letterSpacing,
      fontFamily,
      wrap,
      size,
      weight,
      variant,
      ashtml,
      color,
      ...props
    }: TypographyProps,
    ref
  ) => {
    const { defaultConfig, ...context } = useTypography({
      ref,
      letterSpacing,
      wrap,
      size,
      weight,
      variant,
      ashtml,
      color,
      fontFamily,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);

    return (
      <defaultConfig.Component
        data-comp="typography"
        data-variant={ctx.variant}
        className={`${className} ${ctx.typographyStyle()}`}
        ref={ctx.typographyRef}
        {...props}
      >
        {children}
      </defaultConfig.Component>
    );
  }
);

Typography.displayName = 'Typography';
