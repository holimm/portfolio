'use client';

import { Container, Flex } from '@/components/layout';
import React, { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';
import { useScrollZoom, UseScrollZoomProps } from '../utils/ScrollZoom.Util';
import { cn } from '@/utils';
import Image from 'next/image';

export interface ScrollZoomProps
  extends UseScrollZoomProps,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseScrollZoomProps> {
  src: string;
  alt?: string;
  initialSize?: string;
  zoomVh?: number;
  background?: string | null;
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
        className={cn('relative z-10')}
        aria-label="scroll-zoom-section"
      >
        <div className="sticky top-0 z-20 flex h-screen items-center justify-center overflow-hidden">
          <Container height="full" width="full" className="!absolute z-10">
            {children}
          </Container>
          <Flex
            className="relative z-20"
            height="full"
            width="full"
            justify="center"
            align="center"
          >
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
              <Image
                src={context.src}
                alt={context.alt}
                className="block h-full w-full object-cover grayscale-90"
                fill
              />
            </div>
          </Flex>
        </div>
      </Container>
    );
  }
);

ScrollZoom.displayName = 'ScrollZoom';
