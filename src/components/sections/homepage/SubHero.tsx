'use client';

import React, { forwardRef, useCallback } from 'react';
import { cn } from '@/utils';
import { Section, Container, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { ScrollZoom } from '@/components/interactions';
import { Typography } from '@/components/elements';
import HeroImage from '@/assets/images/hero-image.webp';
import Marquee from 'react-fast-marquee';

export const SubHero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const renderMarquee = useCallback(
      (
        text: string,
        direction: 'left' | 'right' = 'right',
        position: 'first' | 'last' | 'middle' = 'middle'
      ) => (
        <Marquee
          className={cn('overflow-hidden', {
            'rounded-t-xl': position === 'first',
            'rounded-b-xl': position === 'last',
          })}
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
          <Container
            height="full"
            width="full"
            yspace="none"
            xspace="none"
            rounded="2xl"
          >
            <ScrollZoom
              className="rounded-2xl"
              src={HeroImage.src}
              initialSize="80vmin"
            >
              <Flex variant="col" justify="between" gap="none">
                {renderMarquee('WEB DESIGN', 'right', 'first')}
                {renderMarquee('FRONT END', 'left')}
                {renderMarquee('BACK END', 'right')}
                {renderMarquee('UI/UX DESIGN', 'left')}
                {renderMarquee('ANIMATION', 'right', 'last')}
              </Flex>
            </ScrollZoom>
          </Container>
        </Section>
      </>
    );
  }
);

SubHero.displayName = 'SubHero';
