'use client';
import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { useTypography, UseTypographyProps } from '../utils/useTypography';

interface TypographyData {}

interface TypographyOptions extends UseTypographyProps {}

export interface TypographyProps
  extends TypographyOptions,
    Omit<Omit<HTMLAttributes<HTMLElement>, 'color'>, keyof TypographyData>,
    TypographyData {}

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  (
    { className, children, letterSpacing, wrap, ...props }: TypographyProps,
    ref
  ) => {
    const { defaultConfig, ...context } = useTypography({
      ref,
      letterSpacing,
      wrap,
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
