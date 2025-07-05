'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import {
  SectionProvider,
  useSection,
  UseSectionProps,
} from '../utils/Section.Util';
import { cn } from '@/utils';

export interface SectionProps
  extends HTMLAttributes<HTMLDivElement>,
    UseSectionProps {
  comp?: string;
  theme?: 'default' | 'dark' | 'light';
  layout?: 'flex' | 'block';
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    { className, children, theme, layout, parallaxDirection, ...props },
    ref
  ) => {
    const { ...context } = useSection({
      ref,
      layout,
      parallaxDirection,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);

    return (
      <SectionProvider value={ctx}>
        <section
          id={props.id}
          data-variant={ctx.variant}
          data-comp={'section'}
          data-theme={theme || 'default'}
          className={cn(className, ctx.sectionStyle())}
          ref={ctx.sectionRef}
          style={{
            ...props.style,
            ...(ctx.variant === 'parallax'
              ? {
                  transform: `translateY(${
                    ctx.parallaxDirection === 'top'
                      ? ctx.parallaxOffset *
                        (1 - ctx.visibilityPercentage / 100)
                      : ctx.parallaxOffset
                  }px)`,
                }
              : {}),
          }}
        >
          {children}
        </section>
      </SectionProvider>
    );
  }
);

Section.displayName = 'Section';
