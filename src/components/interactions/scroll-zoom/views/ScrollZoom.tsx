'use client';

import { Container } from '@/components/layout';
import React, { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import { useScrollZoom, UseScrollZoomProps } from '../utils/ScrollZoom.Util';

export interface ScrollZoomProps
  extends UseScrollZoomProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseScrollZoomProps> {
  src: string; // image url
  alt?: string;
  initialSize?: string; // width of the box, e.g. '60vmin'
  zoomVh?: number; // how many extra viewport heights the section occupies for the zoom
  background?: string | null; // optional background image url (keeps fixed)
  className?: string;
  children?: React.ReactNode;
}

export const ScrollZoom = forwardRef<HTMLDivElement, ScrollZoomProps>(
  (
    {
      className,
      children,
      theme,
      src,
      alt = 'Zoom image',
      initialSize = '60vmin',
      zoomVh = 100,
      ...props
    },
    ref
  ) => {
    const context = useScrollZoom({
      ref,
      src,
      alt,
      initialSize,
      zoomVh,
      ...props,
    });

    return (
      <Container
        ref={context.sectionRef}
        style={{ height: context.sectionHeight }}
        width="full"
        className={`z-10 ${className}`}
        aria-label="scroll-zoom-section"
      >
        <div className="absolute inset-0 z-10" aria-hidden="true">
          {children}
        </div>
        {/* Sticky container that pins for viewport height */}
        <div className="sticky top-0 z-20 flex h-screen items-center justify-center overflow-hidden">
          {/* Image */}
          <div
            ref={context.wrapperRef}
            style={{
              width: context.initialSize,
              aspectRatio: '16 / 9',
              transformOrigin: 'center center',
              willChange: 'transform',
              transition: 'transform 120ms linear',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
            }}
          >
            <img
              src={context.src}
              alt={context.alt}
              className="block h-full w-full object-cover"
            />
          </div>
        </div>
      </Container>
    );
  }
);

ScrollZoom.displayName = 'ScrollZoom';
