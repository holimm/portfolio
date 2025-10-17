'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Typography } from '@/components/elements';
import { Section, Container, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroImage from '@/assets/images/hero-image.webp';

export const Hero = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const heroRef = useRef<HTMLDivElement>(null);

    const [currentTime, setCurrentTime] = useState(' ');

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        const utcTime = new Date(
          now.getTime() + now.getTimezoneOffset() * 60000
        );
        const utcPlus7 = new Date(utcTime.getTime() + 7 * 3600000);

        const timeString = utcPlus7.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        setCurrentTime(timeString);
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <Section
        id={props.id}
        variant={'parallax'}
        comp="hero-section"
        theme={theme}
        className={`relative h-screen overflow-hidden ${className}`}
        yspace="10xl"
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
        <Container height="full" width="2xl">
          {/* UTC+7 Clock */}
          <div className="animate-fadeInUp animation-delay-900 absolute right-0 bottom-10 text-right">
            <Flex variant="col" gap="xs">
              <Flex justify="start" align="center" gap="sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{
                    opacity: { duration: 1 },
                  }}
                >
                  <Clock size={16} className="text-contrast-higher font-bold" />
                </motion.div>
                <Typography
                  ashtml="h1"
                  size="xl"
                  weight="semibold"
                  contrast="higher"
                  align="center"
                  animation={{
                    type: 'split-words',
                    delay: 0.1,
                    duration: 0.2,
                  }}
                >
                  UTC+7
                </Typography>
              </Flex>
              <Typography
                ashtml="h1"
                size="lg"
                contrast="high"
                align="center"
                letterSpacing="widest"
                animation={{
                  type: 'split-chars',
                  delay: 0.1,
                  duration: 0.2,
                }}
              >
                {currentTime}
              </Typography>
            </Flex>
          </div>

          {/* UTC+7 Clock */}
          <div className="animate-fadeInUp animation-delay-900 absolute bottom-10 left-0 text-left">
            <Flex variant="col" gap="xs">
              <Flex justify="start" align="center" gap="sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{
                    opacity: { duration: 1 },
                  }}
                >
                  <MapPin
                    size={16}
                    className="text-contrast-higher font-bold"
                  />
                </motion.div>
                <Typography
                  ashtml="h1"
                  size="xl"
                  weight="semibold"
                  contrast="higher"
                  align="center"
                  animation={{
                    type: 'split-words',
                    delay: 0.1,
                    duration: 0.2,
                  }}
                >
                  Vietnam
                </Typography>
              </Flex>
              <Typography
                ashtml="h1"
                size="lg"
                contrast="high"
                align="center"
                letterSpacing="widest"
                animation={{
                  type: 'split-chars',
                  delay: 0.1,
                  duration: 0.2,
                }}
              >
                Ho Chi Minh City
              </Typography>
            </Flex>
          </div>

          {/* Hero Content */}
          <Flex
            variant="col"
            justify="center"
            align="center"
            className="relative z-10 h-full"
            gap="xl"
          >
            <Typography
              ashtml="h1"
              size="10xl"
              weight="bold"
              align="center"
              animation={{
                type: 'split-chars',
                delay: 0.1,
                duration: 0.5,
              }}
            >
              HO LIM
            </Typography>
            <Typography
              ashtml="h1"
              size="lg"
              weight="light"
              align="center"
              animation={{
                type: 'split-words',
                delay: 0.1,
                duration: 0.4,
              }}
            >
              Crafting visual stories that captivate and inspire
            </Typography>
            <Button
              // onClick={() => scrollToSection('work')}
              color="primary"
              custom="outline"
              rounded="none"
              padding="md"
            >
              <Typography className="tracking-[0px]" ashtml="span">
                VIEW MY WORK
              </Typography>
              <ArrowRight size={16} className="text-contrast-highest ml-2" />
            </Button>
          </Flex>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
            <div className="h-16 w-px bg-black/30"></div>
          </div>
        </Container>
      </Section>
    );
  }
);

Hero.displayName = 'Hero';
