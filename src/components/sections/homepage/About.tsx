'use client';

import React, { forwardRef } from 'react';
import { Typography } from '@/components/elements';
import { Section, Container, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { HorizontalScroll } from '@/components/interactions';

const sections = [
  {
    key: 'intro_engineer',
    content: (
      <Container
        height="screen"
        width="screen"
        xspace="6xl"
        yspace="4xl"
        className="relative bg-gray-50 transition-colors"
      >
        {/* Decorative Element: The Continuous Path (Subtle) */}
        <div
          className="absolute top-1/2 left-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            clipPath: "path('M0,10 Q25,0 50,10 T100,10')",
            transform: 'scale(8, 1)',
            opacity: 0.1, // Subtle start
          }}
        />
        <Flex
          height="full"
          width="full"
          variant="col"
          justify="center"
          align="start"
          gap="3xl"
        >
          <Typography
            ashtml="span"
            size="md"
            weight="semibold"
            contrast="medium"
            className="animate-fadeInUp tracking-widest text-cyan-500/70 uppercase"
          >
            [ I. THE ARCHITECT ]
          </Typography>

          <Typography
            ashtml="h1"
            size="6xl"
            weight="extrabold"
            align="left"
            className="animate-fadeInUp max-w-5xl leading-tight"
          >
            I build systems that **scale**. Clean code and robust architecture
            are my non-negotiables.
          </Typography>
          <Typography
            size="lg"
            weight="light"
            align="left"
            className="animate-fadeInUp max-w-3xl text-gray-600 dark:text-gray-300"
          >
            Full-Stack expertise allows me to manage the complexity of
            end-to-end delivery—from the first schema to the final deployment.
          </Typography>
        </Flex>
      </Container>
    ),
  },
  {
    key: 'image_blueprint',
    content: (
      <Container
        height="screen"
        width="screen"
        className="relative bg-gray-50 transition-colors"
      >
        {/* Decorative Element: The Continuous Path (Slightly More Visible) */}
        <div
          className="absolute top-1/2 left-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            clipPath: "path('M0,10 Q25,0 50,10 T100,10')",
            transform: 'scale(8, 1)',
            opacity: 0.3, // Building up visibility
          }}
        />
        <Flex
          height="full"
          width="full"
          variant="row"
          justify="center"
          align="center"
          gap="8xl"
          xspace="6xl"
        >
          {/* Image with a more artistic, blueprint-like styling */}
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBvcnRyYWl0fGVufDB8MnwwfHx8MA%3D%3D"
            alt="About Me Portrait"
            className="animate-fadeInUp h-[50vh] w-[40vh] border-4 border-cyan-400/50 object-cover shadow-xl brightness-110 grayscale"
          />
          <Flex
            variant="col"
            justify="center"
            align="start"
            className="max-w-xl"
          >
            <Typography
              ashtml="span"
              size="md"
              weight="semibold"
              contrast="medium"
              className="animate-fadeInUp mb-4 tracking-widest text-cyan-500/70 uppercase"
            >
              [ II. THE VISUALIZER ]
            </Typography>
            <Typography
              ashtml="h2"
              size="4xl"
              weight="light"
              className="animate-fadeInUp leading-snug tracking-tight"
            >
              I write code that understands **aesthetics**.
            </Typography>
            <Typography
              size="lg"
              weight="light"
              className="animate-fadeInUp mt-4 max-w-lg text-gray-500 italic dark:text-gray-400"
            >
              Every component is a chance for pixel-perfect craftsmanship. I
              translate design into functional, responsive reality.
            </Typography>
          </Flex>
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
