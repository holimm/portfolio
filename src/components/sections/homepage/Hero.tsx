'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@/components/elements';
import { Section, Container, Flex, Grid } from '@/components/layout';
import { LayoutProps } from '@/types';
import { ArrowDown, ArrowRight, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroImage from '@/assets/images/hero-image.webp';

export const Hero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const heroRef = useRef<HTMLDivElement>(null);

    const [currentTime, setCurrentTime] = useState(' ');

    useEffect(() => {
      const updateDateTime = () => {
        const now = new Date();
        const utcTime = new Date(
          now.getTime() + now.getTimezoneOffset() * 60000
        );
        const utcPlus7 = new Date(utcTime.getTime() + 7 * 3600000);

        const dateTimeString = utcPlus7.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        setCurrentTime(dateTimeString);
      };

      updateDateTime();
      const interval = setInterval(updateDateTime, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <Section
        id={props.id}
        variant={'parallax'}
        comp="hero-section"
        theme={theme}
        className={`relative h-screen overflow-hidden ${className}`}
        yspace="4xl"
        ref={heroRef}
        {...props}
      >
        {/* Hero background image */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url(${HeroImage.src || HeroImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Container height="full" width="full" xspace="xl">
          <Flex
            height="full"
            width="full"
            variant="col"
            justify="between"
            align="center"
          >
            <Grid>
              <Grid.Item span={3}>
                <Flex variant="col" gap="xs">
                  <Typography
                    className="select-none lg:text-xl 2xl:text-2xl"
                    ashtml="h1"
                    size="lg"
                    align="center"
                    contrast="medium"
                    animation={{
                      type: 'split-words',
                      delay: 0.1,
                      duration: 0.4,
                    }}
                  >
                    Based in
                  </Typography>
                  <Typography
                    className="select-none lg:text-xl 2xl:text-2xl"
                    ashtml="h1"
                    size="lg"
                    align="center"
                    animation={{
                      type: 'split-words',
                      delay: 0.1,
                      duration: 0.3,
                      ease: 'easeInOut',
                      hover: {
                        text: 'Ho Chi Minh City, Viet Nam',
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeInOut',
                        stagger: 0.05,
                      },
                    }}
                  >
                    Ho Chi Minh City, Viet Nam
                  </Typography>
                </Flex>
              </Grid.Item>
              <Grid.Item span={3}>
                <Flex variant="col" gap="xs">
                  <Typography
                    className="select-none lg:text-xl 2xl:text-2xl"
                    ashtml="h1"
                    size="lg"
                    align="center"
                    contrast="medium"
                    animation={{
                      type: 'split-words',
                      delay: 0.1,
                      duration: 0.4,
                    }}
                  >
                    UTC+7
                  </Typography>
                  <Typography
                    className="select-none lg:text-xl 2xl:text-2xl"
                    ashtml="h1"
                    size="lg"
                    align="center"
                    animation={{
                      type: 'split-words',
                      delay: 0.1,
                      duration: 0.3,
                      ease: 'easeInOut',
                      hover: {
                        text: currentTime,
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeInOut',
                        stagger: 0.05,
                      },
                    }}
                  >
                    {currentTime}
                  </Typography>
                </Flex>
              </Grid.Item>
              <Grid.Item span={3}>
                <Flex variant="col" gap="xs">
                  <Flex align="center">
                    <Typography
                      className="select-none lg:text-xl 2xl:text-2xl"
                      ashtml="h1"
                      size="lg"
                      align="center"
                      contrast="medium"
                      animation={{
                        type: 'split-words',
                        delay: 0.1,
                        duration: 0.4,
                      }}
                    >
                      Freelance availability
                    </Typography>
                    <div className="bg-success shadow-success h-3 w-3 animate-pulse rounded-full shadow-[0_0_10px_#22c55e]" />
                  </Flex>
                  <Typography
                    className="select-none lg:text-xl 2xl:text-2xl"
                    ashtml="h1"
                    size="lg"
                    align="center"
                    animation={{
                      type: 'split-words',
                      delay: 0.1,
                      duration: 0.3,
                      ease: 'easeInOut',
                      hover: {
                        text: 'October 2025',
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeInOut',
                        stagger: 0.05,
                      },
                    }}
                  >
                    October 2025
                  </Typography>
                </Flex>
              </Grid.Item>
              <Grid.Item span={3}>
                <Flex justify="end" align="start">
                  <Button
                    className="cursor-pointer transition-all duration-200 hover:scale-105"
                    variant="default"
                    color="primary"
                    contrast="highest"
                    padding="lg"
                    rounded="md"
                  >
                    <Typography
                      className="select-none lg:text-xl 2xl:text-2xl"
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
                      Get In Touch
                    </Typography>
                  </Button>
                </Flex>
              </Grid.Item>
            </Grid>

            {/* Hero Content */}
            <Flex variant="col" justify="center" align="center" gap="lg">
              <Typography
                className="4xl:text-3xl 3xl:text-4xl select-none lg:text-xl 2xl:text-2xl"
                ashtml="h1"
                size="lg"
                weight="light"
                align="center"
                animation={{
                  type: 'split-words',
                  delay: 0.1,
                  duration: 0.3,
                  hover: {
                    text: "Hello there! I'm",
                    duration: 0.3,
                    delay: 0.1,
                    ease: 'easeInOut',
                    stagger: 0.05,
                  },
                }}
                wrap={false}
              >
                Hello there! I&apos;m
              </Typography>
              <Typography
                className="4xl:text-14xl 3xl:text-13xl 2xl:text-12xl lg:text-10xl select-none"
                ashtml="h1"
                size="14xl"
                weight="bold"
                align="center"
                animation={{
                  type: 'split-chars',
                  delay: 0.1,
                  duration: 0.3,
                  hover: {
                    text: 'HO LIM',
                    duration: 0.3,
                    delay: 0.1,
                    ease: 'easeInOut',
                    stagger: 0.05,
                  },
                }}
                wrap={true}
              >
                HO LIM
              </Typography>
            </Flex>
            <Flex height="fit" width="full" justify="between">
              <Flex justify="start" gap="sm">
                <ArrowDown className="text-contrast-medium animate-bounce" />
                <Typography
                  className="4xl:text-2xl lg:text-lg 2xl:text-xl"
                  ashtml="h1"
                  size="lg"
                  weight="medium"
                  contrast="medium"
                  align="center"
                  animation={{
                    type: 'split-words',
                    delay: 0.1,
                    duration: 0.4,
                  }}
                >
                  Scroll for
                </Typography>
              </Flex>
              <Flex justify="start" gap="sm">
                <Typography
                  ashtml="h1"
                  size="xl"
                  weight="medium"
                  contrast="medium"
                  align="center"
                  animation={{
                    type: 'split-words',
                    delay: 0.1,
                    duration: 0.4,
                  }}
                >
                  more
                </Typography>
                <ArrowDown className="text-contrast-medium animate-bounce" />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Hero.displayName = 'Hero';
