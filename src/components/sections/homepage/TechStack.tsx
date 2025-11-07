'use client';

import React, { forwardRef, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { LayoutProps, TECH_STACK } from '@/types';

export const TechStack = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const servicesRef = useRef<HTMLDivElement>(null);

    const techStack = useMemo(() => TECH_STACK, []);

    return (
      <Section
        id="tech-stack"
        variant={'default'}
        comp="tech-stack"
        theme={'default'}
        className={`min-h-screen ${className}`}
        yspace="10xl"
        ref={servicesRef}
        rounded="2xl"
        {...props}
      >
        <Container height="full" width="3xl">
          <Flex variant="col" gap="8xl">
            {/* Heading */}
            <Flex width="full" justify="center" align="center">
              <Typography
                className="xl:!text-10xl select-none sm:!text-6xl md:!text-8xl lg:!text-9xl"
                size="6xl"
                weight="bold"
                align="center"
              >
                MODERN STACK
              </Typography>
            </Flex>

            {/* Services Grid */}
            <Grid gap="none">
              {techStack.slice(0, 3).map((tech, i) => (
                <Grid.Item
                  key={`video-${i}`}
                  span={[
                    { span: 12 },
                    { breakpoint: 'sm', span: i === 2 ? 12 : 6 },
                    { breakpoint: 'md', span: i === 2 ? 12 : 6 },
                    { breakpoint: 'lg', span: 4 },
                  ]}
                >
                  <Link
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Container className="border-contrast-lower aspect-video border">
                      <div className="group hover:bg-contrast-higher flex h-full w-full items-center justify-center transition-all duration-200 ease-in-out">
                        {
                          <tech.icon
                            size={100}
                            aria-label={tech.name}
                            className="text-contrast-higher group-hover:text-invert-highest transition-all duration-200 ease-in-out group-hover:scale-110"
                          />
                        }
                      </div>
                    </Container>
                  </Link>
                </Grid.Item>
              ))}
              {techStack.slice(3, 9).map((tech, i) => (
                <Grid.Item
                  key={`square-${i}`}
                  span={[
                    { span: 12 },
                    { breakpoint: 'sm', span: 4 },
                    { breakpoint: 'md', span: 4 },
                    { breakpoint: 'lg', span: 2 },
                  ]}
                >
                  <Link
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Container className="border-contrast-lower aspect-square border">
                      <div className="group hover:bg-contrast-higher flex h-full w-full flex-col items-center justify-center transition-all duration-200 ease-in-out">
                        {
                          <tech.icon
                            size={100}
                            aria-label={tech.name}
                            className="text-contrast-higher group-hover:text-invert-highest transition-all duration-200 ease-in-out group-hover:scale-110"
                          />
                        }
                      </div>
                    </Container>
                  </Link>
                </Grid.Item>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>
    );
  }
);

TechStack.displayName = 'TechStack';
