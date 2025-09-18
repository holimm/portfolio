'use client';

import React, { forwardRef, useRef } from 'react';
import Link from 'next/link';
import { LayoutProps, SOCIAL_MEDIA_LINKS } from '@/types';
import { Section, Container, Flex, Grid } from '@/components/layout';
import { Typography } from '@/components/elements';
import { HEADER_NAVIGATION } from '@/types';

export const Footer = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const footerRef = useRef<HTMLDivElement>(null);

    return (
      <Section
        id={props.id}
        variant={'parallax'}
        comp="footer"
        theme={theme}
        className={`top-20 z-10 !pb-0 ${className}`}
        yspace="8xl"
        ref={footerRef}
        parallaxDirection="top"
        {...props}
      >
        <Container className="h-full">
          <Flex variant="col" gap="xl">
            <Container>
              <Grid dimension="8">
                <Grid.Item className="!h-full" span={4}>
                  <Container height="full" className="pr-10">
                    <Flex height="full" variant="col" justify="between">
                      <Typography
                        className="leading-8"
                        size="xl"
                        contrast="medium"
                      >
                        Thanks for stopping by my portfolio. The work here
                        represents my journey and the projects I’m most proud
                        of. If something catches your eye, I’d be glad to
                        connect and talk more.
                      </Typography>

                      <Flex>
                        {SOCIAL_MEDIA_LINKS.map((item) => (
                          <Container
                            key={item.key}
                            className="border-invert-highest/50 hover:bg-background-dark group cursor-pointer border"
                            width="fit"
                            xspace="lg"
                            yspace="md"
                            rounded="full"
                          >
                            <Typography
                              className="group-hover:text-black"
                              contrast="medium"
                              weight="semibold"
                            >
                              {item.name}
                            </Typography>
                          </Container>
                        ))}
                      </Flex>
                    </Flex>
                  </Container>
                </Grid.Item>

                <Grid.Item span={2}>
                  <Flex variant="col" gap="md">
                    <Typography weight="bold">Visit</Typography>
                    {HEADER_NAVIGATION.map((item) => (
                      <Typography
                        key={item.key}
                        className="hover:text-contrast-high cursor-pointer"
                        size="4xl"
                        contrast="medium"
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Flex>
                </Grid.Item>
                <Grid.Item span={2}>
                  <Flex variant="col" gap="md">
                    <Typography weight="bold">Visit</Typography>
                    {HEADER_NAVIGATION.map((item) => (
                      <Typography
                        key={item.key}
                        className="hover:text-contrast-high cursor-pointer"
                        size="4xl"
                        contrast="medium"
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </Flex>
                </Grid.Item>
              </Grid>
            </Container>
            <hr className="border-contrast-medium mt-8 mb-6" />
            <Container>
              <Flex variant="col" gap="none">
                <Typography size="xl" contrast="medium">
                  Designed & developed by
                </Typography>
                <Typography
                  fontFamily="oldschool-grotesk-compressed"
                  weight="bold"
                  letterSpacing="tightest"
                  size="20xl"
                  contrast="medium"
                  className="-ml-3"
                >
                  HO LIM
                </Typography>
              </Flex>
            </Container>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Footer.displayName = 'Footer';
