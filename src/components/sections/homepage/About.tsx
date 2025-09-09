'use client';

import React, { forwardRef } from 'react';
import { Typography } from '@/components/elements';
import { Section, Container, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { HorizontalScroll } from '@/components/interactions';

const sections = [
  {
    key: 'about',
    content: (
      <Container height="screen" width="screen">
        <Flex
          height="full"
          width="full"
          variant="col"
          justify="center"
          align="center"
          gap="4xl"
        >
          <Typography
            ashtml="h1"
            size="8xl"
            weight="bold"
            align="left"
            className="animate-fadeInUp mt-4"
          >
            ABOUT ME
          </Typography>
        </Flex>
      </Container>
    ),
  },
  {
    key: 'image',
    content: (
      <Container height="screen" width="screen">
        <Flex
          height="full"
          width="full"
          variant="col"
          justify="center"
          align="center"
          gap="4xl"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBvcnRyYWl0fGVufDB8MnwwfHx8MA%3D%3D"
            alt="About Me"
            className="animate-fadeInUp h-96 w-80 object-cover shadow grayscale filter"
          />
        </Flex>
      </Container>
    ),
  },
  {
    key: 'text1',
    content: (
      <Container height="screen" width="screen">
        <Flex
          height="full"
          width="full"
          variant="col"
          justify="center"
          align="center"
          gap="4xl"
        >
          <Typography
            ashtml="h1"
            size="lg"
            align="left"
            className="animate-fadeInUp leading-8"
          >
            I’m a full-stack developer who enjoys building things that are both
            functional and user-friendly...
          </Typography>
        </Flex>
      </Container>
    ),
  },
  {
    key: 'text2',
    content: (
      <Container height="screen" width="screen">
        <Flex
          height="full"
          width="full"
          variant="col"
          justify="center"
          align="center"
          gap="4xl"
        >
          <Typography
            ashtml="h1"
            size="lg"
            align="left"
            className="animate-fadeInUp leading-8"
          >
            I care about the details, the people using what I build, and the
            impact it makes...
          </Typography>
        </Flex>
      </Container>
    ),
  },
];

export const About = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    return (
      <Section
        variant={'default'}
        comp="about-section"
        theme={'default'}
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
