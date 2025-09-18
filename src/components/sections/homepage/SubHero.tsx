'use client';

import React, { forwardRef, useCallback } from 'react';
import { cn } from '@/utils';
import { Section, Container, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { Marquee, ScrollZoom } from '@/components/interactions';
import { Typography } from '@/components/elements';
import SubHeroImage from '@/assets/images/sub-hero-image.jpeg';

export const SubHero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const renderText = useCallback(
      (text: string) => (
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
                <Marquee speed={50}>{renderText('WEB DESIGN')}</Marquee>
                <Marquee speed={50} direction="right">
                  {renderText('FRONT END')}
                </Marquee>
                <Marquee speed={50}>{renderText('BACK END')}</Marquee>
                <Marquee speed={50} direction="right">
                  {renderText('UI/UX DESIGN')}
                </Marquee>
                <Marquee speed={50}>{renderText('ANIMATION')}</Marquee>
              </Flex>
            </ScrollZoom>
          </Container>
        </Section>
      </>
    );
  }
);

SubHero.displayName = 'SubHero';
