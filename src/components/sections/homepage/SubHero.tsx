'use client';

import React, { forwardRef, useCallback } from 'react';
import { cn } from '@/utils';
import { Section, Container, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { ScrollZoom } from '@/components/interactions';
import { Typography } from '@/components/elements';
import SubHeroImage from '@/assets/images/sub-hero-image.jpeg';
import Marquee from 'react-fast-marquee';

export const SubHero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const renderMarquee = useCallback(
      (text: string, direction: 'left' | 'right' = 'right') => (
        <Marquee
          speed={50}
          direction={direction}
          gradientColor="rgba(0, 0, 0, 0.819)"
          gradient
          autoFill
        >
          <Typography
            className="mx-20 my-0 !h-fit py-0 !text-[20vh]"
            size="15xl"
            fontFamily="oldschool-grotesk-compressed"
            weight="black"
            contrast="medium"
            letterSpacing="tightest"
          >
            {text}
          </Typography>
        </Marquee>
      ),
      []
    );

    return (
      <>
        <Section
          id={props.id}
          variant={'default'}
          comp="hero-section"
          theme={'dark'}
          className={cn('relative h-fit', className)}
          yspace="none"
          xspace="none"
          rounded="2xl"
          ref={ref}
          {...props}
        >
          <Container height="full" width="full" yspace="none" xspace="none">
            <ScrollZoom src={SubHeroImage.src} initialSize="80vmin">
              <Flex variant="col" justify="between" gap="none">
                {renderMarquee('WEB DESIGN')}
                {renderMarquee('FRONT END', 'left')}
                {renderMarquee('BACK END')}
                {renderMarquee('UI/UX DESIGN', 'left')}
                {renderMarquee('ANIMATION')}
              </Flex>
            </ScrollZoom>
          </Container>
        </Section>
      </>
    );
  }
);

SubHero.displayName = 'SubHero';
