'use client';

import React, { forwardRef, useMemo, useRef } from 'react';
import { LayoutProps, SELECTED_PROJECTS } from '@/types';
import { Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import Link from 'next/link';
import { useScroll } from 'framer-motion';

export const Projects = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const selectedProjects = useMemo(() => SELECTED_PROJECTS, []);
    const { scrollY } = useScroll();

    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="projects"
        theme={'dark'}
        className={`z-20 ${className}`}
        yspace="10xl"
        ref={ref}
        rounded="2xl"
        {...props}
      >
        <Container className="gap-4xl" height="full" width="3xl">
          <Flex variant="col" gap="8xl">
            {/* Heading */}
            <Flex width="full" justify="center" align="center">
              <Typography
                className="select-none"
                size="10xl"
                weight="bold"
                align="center"
                animation={{
                  type: 'split-words',
                  duration: 0.2,
                  delay: 0.05,
                  ease: 'easeInOut',
                  hover: {
                    text: 'SELECTED PROJECTS',
                    duration: 0.2,
                    delay: 0.05,
                    ease: 'easeInOut',
                    stagger: 0.05,
                  },
                }}
              >
                SELECTED PROJECTS
              </Typography>
            </Flex>

            {/* Work Grid */}
            <Grid width="full" gap="xl">
              {selectedProjects.map((project, index) => (
                <Grid.Item key={`project-${index}`} span={6}>
                  <Container
                    className={`group bg-invert-highest relative cursor-pointer overflow-hidden transition-all duration-700`}
                    width="full"
                    xspace="md"
                    yspace="md"
                    rounded="md"
                  >
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Container
                        className="group relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black"
                        width="full"
                        rounded="sm"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </Container>
                    </Link>
                    <Container xspace="none" yspace="xl">
                      <Flex variant="col" gap="sm">
                        <Flex justify="between" align="center">
                          <Link
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Typography
                              className="py-1"
                              ashtml="h5"
                              size="2xl"
                              weight="bold"
                            >
                              {project.title}
                            </Typography>
                          </Link>
                          {project.liveSite && (
                            <Link
                              href={project.liveSite}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Container
                                className="!bg-contrast-highest hover:!bg-contrast-high duration-400"
                                yspace="2xs"
                                xspace="sm"
                                rounded="full"
                              >
                                <Flex align="center" gap="sm">
                                  <Typography
                                    ashtml="h5"
                                    size="md"
                                    color="invert"
                                    weight="medium"
                                  >
                                    Live Site
                                  </Typography>
                                  <div className="bg-success shadow-success h-3 w-3 animate-pulse rounded-full shadow-[0_0_10px_#22c55e]" />
                                </Flex>
                              </Container>
                            </Link>
                          )}
                        </Flex>
                        <Marquee
                          speed={20}
                          direction="left"
                          gradientColor="#1a1a1a"
                          autoFill
                        >
                          <Typography
                            className="uppercase"
                            fontFamily="oldschool-grotesk-compact"
                            weight="medium"
                            letterSpacing="wider"
                            size="md"
                          >
                            {project.category}
                          </Typography>
                        </Marquee>
                      </Flex>
                    </Container>
                  </Container>
                </Grid.Item>
              ))}
            </Grid>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Projects.displayName = 'Projects';
