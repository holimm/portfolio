'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import {
  SectionProvider,
  useSection,
  UseSectionProps,
} from '../utils/Section.Util';

export interface SectionProps
  extends HTMLAttributes<HTMLDivElement>,
    UseSectionProps {
  comp?: string;
  theme?: 'default' | 'dark' | 'light';
  layout?: 'flex' | 'block';
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, children, theme, layout, ...props }, ref) => {
    const { ...context } = useSection({ ref, layout, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <SectionProvider value={ctx}>
        <section
          id={props.id}
          data-variant={ctx.variant}
          data-comp={'section'}
          data-theme={theme || 'default'}
          className={`${className} ${ctx.sectionStyle()}`}
          ref={ctx.sectionRef}
          {...props}
        >
          {children}
        </section>
      </SectionProvider>
    );
  }
);

Section.displayName = 'Section';
