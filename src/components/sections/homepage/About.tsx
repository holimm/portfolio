'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Typography } from '@/components/elements';
import { Section, Container, Flex, Grid } from '@/components/layout';
import { HorizontalScroll } from '@/components/interactions';
import { LayoutProps } from '@/types';
import SubHeroIntroImage from '@/assets/images/sub-hero-intro.webp';
import CoffeeShop from '@/assets/images/coffee-shop.webp';
import Forest from '@/assets/images/forest.webp';
import { Share } from 'lucide-react';

const sections = [
  {
    key: 'intro',
    content: (
      <Section
        variant={'default'}
        comp="About - Intro"
        theme={'default'}
        className={`min-h-screen min-w-screen select-none`}
        yspace="none"
        xspace="none"
        rounded="none"
      >
        <Container
          className="lg:p-10"
          height="full"
          width="3xl"
          yspace="md"
          xspace="md"
        >
          <Grid className="lg:gap-16" height="full" gap="xl">
            {/* Image */}
            <Grid.Item
              className="lg:h-screen"
              height="fit"
              span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}
            >
              <Container
                className="lg:p-10"
                height="full"
                width="3xl"
                yspace="md"
                xspace="md"
              >
                <Flex
                  height="full"
                  width="full"
                  justify="center"
                  align="center"
                >
                  <div className="group relative aspect-square w-full overflow-hidden rounded-md bg-gray-400">
                    <Image
                      src={SubHeroIntroImage}
                      alt="About me"
                      className="h-full w-full rounded-md object-cover grayscale transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
                      fill
                    />
                  </div>
                </Flex>
              </Container>
            </Grid.Item>
            {/* Content */}
            <Grid.Item
              height="full"
              span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}
            >
              <Container
                className="lg:p-10"
                height="full"
                width="3xl"
                yspace="md"
                xspace="md"
              >
                <Flex
                  height="full"
                  width="full"
                  variant="col"
                  justify="center"
                  align="start"
                  gap="2xl"
                >
                  <Typography
                    ashtml="span"
                    size="md"
                    weight="normal"
                    contrast="medium"
                  >
                    [ About me ]
                  </Typography>
                  <Flex variant="col" gap="lg">
                    <Typography
                      className="leading-8 lg:text-2xl"
                      ashtml="h1"
                      size="xl"
                      weight="medium"
                      align="left"
                      letterSpacing="wider"
                    >
                      Hi, I’m Nguyen Lim Thai Ho — a web developer based in Ho
                      Chi Minh City, Vietnam. I graduated from Saigon University
                      and have over a year of experience in website development.
                    </Typography>
                    <Typography
                      className="leading-8 lg:text-2xl"
                      ashtml="h1"
                      size="xl"
                      weight="medium"
                      align="left"
                      letterSpacing="wider"
                    >
                      I’m passionate about creating modern, high-performance
                      websites and bringing interfaces to life through
                      thoughtful design and animation.
                    </Typography>
                  </Flex>
                  <Link
                    className="cursor-pointer"
                    href="/file/NguyenLimThaiHo_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      className="hover:bg-contrast-high cursor-pointer transition-all duration-200"
                      variant="default"
                      color="primary"
                      contrast="highest"
                      padding="lg"
                      rounded="md"
                    >
                      <Flex justify="center" align="center">
                        <Typography
                          className="select-none"
                          ashtml="h1"
                          size="lg"
                          align="center"
                          color="invert"
                          weight="medium"
                          animation={{
                            type: 'split-words',
                            delay: 0.1,
                            duration: 0.4,
                          }}
                        >
                          My Resume
                        </Typography>
                        <Share className="text-invert-highest" />
                      </Flex>
                    </Button>
                  </Link>
                </Flex>
              </Container>
            </Grid.Item>
          </Grid>
        </Container>
      </Section>
    ),
  },
  {
    key: 'journey',
    content: (
      <Section
        variant={'default'}
        comp="About - Journey"
        theme={'default'}
        className={`min-h-screen min-w-screen select-none`}
        rounded="2xl"
      >
        <Container height="screen" width="3xl">
          <Container
            className="lg:p-10"
            height="full"
            width="3xl"
            yspace="md"
            xspace="md"
          >
            <Grid className="lg:gap-16" height="full" gap="xl">
              {/* Left Image */}
              <Grid.Item
                height="full"
                span={[{ span: 12 }, { breakpoint: 'lg', span: 3 }]}
              >
                <Flex height="full" width="full" justify="center" align="start">
                  <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-md bg-gray-400 shadow lg:aspect-[9/16]">
                    <Image
                      src={CoffeeShop}
                      alt="About me"
                      className="h-full w-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
                      fill
                    />
                  </div>
                </Flex>
              </Grid.Item>
              <Grid.Item
                height="full"
                span={[{ span: 12 }, { breakpoint: 'lg', span: 6 }]}
              >
                <Flex
                  height="full"
                  width="full"
                  variant="col"
                  justify="center"
                  align="center"
                  gap="2xl"
                >
                  <Typography
                    ashtml="span"
                    size="md"
                    weight="normal"
                    contrast="medium"
                    align="center"
                  >
                    [ Another thing ]
                  </Typography>

                  <Container>
                    <Typography
                      className="leading-8"
                      ashtml="h1"
                      size="2xl"
                      weight="medium"
                      align="center"
                      letterSpacing="wider"
                    >
                      Outside of work, I love exploring new places, trying
                      different coffees, and spending time at the piano — it’s
                      my favorite way to relax and find inspiration.
                    </Typography>
                  </Container>
                </Flex>
              </Grid.Item>
              {/* Right Image */}
              <Grid.Item
                height="full"
                span={[{ span: 12 }, { breakpoint: 'lg', span: 3 }]}
              >
                <Flex height="full" width="full" justify="center" align="end">
                  <div className="group relative flex aspect-video w-full items-end justify-center overflow-hidden rounded-md bg-gray-400 shadow lg:aspect-[9/16]">
                    <Image
                      src={Forest}
                      alt="About me"
                      className="h-full w-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:scale-105 group-hover:grayscale-0"
                      fill
                    />
                  </div>
                </Flex>
              </Grid.Item>
            </Grid>
          </Container>
        </Container>
      </Section>
    ),
  },
];

export const About = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <Section
        id="about"
        variant={'default'}
        comp="about"
        theme={theme}
        className={`${className}`}
        yspace="none"
        xspace="none"
        {...props}
      >
        <HorizontalScroll sections={sections} />
      </Section>
    );
  }
);

About.displayName = 'About';
