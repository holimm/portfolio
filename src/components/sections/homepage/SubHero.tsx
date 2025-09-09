'use client';

import React, { forwardRef } from 'react';
import { Section, Container } from '@/components/layout';
import { LayoutProps } from '@/types';
import { ScrollZoom } from '@/components/interactions';

export const SubHero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="hero-section"
        theme={'dark'}
        className={`relative h-fit ${className}`}
        yspace="none"
        xspace="none"
        ref={ref}
        {...props}
      >
        <Container height="full" width="full" yspace="none" xspace="none">
          <ScrollZoom src="https://images.unsplash.com/photo-1676311708279-3fa0627eaf74?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </Container>
      </Section>
    );
  }
);

SubHero.displayName = 'SubHero';
