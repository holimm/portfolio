'use client';

import React, { forwardRef, useCallback, useRef } from 'react';
import { LayoutProps, SOCIAL_MEDIA_LINKS } from '@/types';
import { Section, Container, Flex, Grid } from '@/components/layout';
import { Typography } from '@/components/elements';
import { HEADER_NAVIGATION } from '@/types';
import { cn } from '@/utils';
import Link from 'next/link';

export const Footer = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    // Refs
    const footerRef = useRef<HTMLDivElement>(null);

    // Methods
    const handleScrollToSection = useCallback((sectionId: string) => {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, []);

    return (
      <Section
        id={props.id}
        variant={'parallax'}
        comp="footer"
        theme={theme}
        className={cn('h-fit min-h-screen !pt-52', className)}
        yspace="7xl"
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
                          <Link key={item.key} href={item.href} target="_blank">
                            <Container
                              key={item.key}
                              className="!border-contrast-highest hover:bg-background-dark group cursor-pointer border"
                              width="fit"
                              xspace="lg"
                              yspace="md"
                              rounded="md"
                            >
                              <Typography
                                className="group-hover:text-black"
                                contrast="medium"
                                weight="semibold"
                              >
                                {item.name}
                              </Typography>
                            </Container>
                          </Link>
                        ))}
                      </Flex>
                    </Flex>
                  </Container>
                </Grid.Item>

                <Grid.Item span={2}>
                  <Flex variant="col" gap="md">
                    <Typography weight="bold">Visit</Typography>
                    {HEADER_NAVIGATION.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleScrollToSection(item.key)}
                      >
                        <Typography
                          className="hover:text-contrast-high cursor-pointer"
                          size="4xl"
                          contrast="medium"
                        >
                          {item.name}
                        </Typography>
                      </button>
                    ))}
                  </Flex>
                </Grid.Item>
                <Grid.Item span={2}>
                  <Flex variant="col" gap="md">
                    <Typography weight="bold">Social</Typography>
                    {SOCIAL_MEDIA_LINKS.map((item) => (
                      <Link key={item.key} href={item.href} target="_blank">
                        <Typography
                          className="hover:text-contrast-high cursor-pointer"
                          size="4xl"
                          contrast="medium"
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    ))}
                  </Flex>
                </Grid.Item>
              </Grid>
            </Container>
            <hr className="border-contrast-medium mt-8 mb-6" />
            <Container>
              <Flex variant="col" gap="none">
                <Typography size="xl" contrast="medium">
                  © {new Date().getFullYear()} | Designed & developed by
                </Typography>
                <Typography
                  fontFamily="oldschool-grotesk-compressed"
                  weight="bold"
                  letterSpacing="tightest"
                  size="24xl"
                  contrast="medium"
                  className="-ml-4"
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
