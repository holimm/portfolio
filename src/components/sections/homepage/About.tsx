import React, { forwardRef, useRef } from 'react';
import { Typography } from '@/components/elements';
import { Section, Container, Grid, Flex } from '@/components/layout';
import { LayoutProps } from '@/types';
import { motion, useScroll, useTransform } from 'framer-motion';

const sections = [
  {
    key: 'about',
    content: (
      <Flex variant="col" justify="start" align="start" gap="4xl">
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
    ),
  },
  {
    key: 'image',
    content: (
      <Flex variant="col" justify="center" align="start" className="h-full">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBvcnRyYWl0fGVufDB8MnwwfHx8MA%3D%3D"
          alt="About Me"
          className="animate-fadeInUp h-96 w-80 object-cover shadow grayscale filter"
        />
      </Flex>
    ),
  },
  {
    key: 'text1',
    content: (
      <Typography
        ashtml="h1"
        size="lg"
        align="left"
        className="animate-fadeInUp leading-8"
      >
        I’m a full-stack developer who enjoys building things that are both
        functional and user-friendly...
      </Typography>
    ),
  },
  {
    key: 'text2',
    content: (
      <Typography
        ashtml="h1"
        size="lg"
        align="left"
        className="animate-fadeInUp leading-8"
      >
        I care about the details, the people using what I build, and the impact
        it makes...
      </Typography>
    ),
  },
];

export const About = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // The scrollable height is (sections.length) * 100vh minus 100vh (since the first section is visible initially)
    const scrollLength = window.innerHeight * (sections.length - 1);

    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ['start start', 'end end'],
    });

    // Animate x from 0 to -((sections.length - 1) * 100vw) as scroll progresses from 0 to 1
    const x = useTransform(
      scrollYProgress,
      [0, 1],
      [0, -window.innerWidth * (sections.length - 1)]
    );

    return (
      <div
        ref={containerRef}
        style={{
          height: `${sections.length * 100}vh`,
          position: 'relative',
        }}
        id={props.id}
      >
        <Section
          variant={'default'}
          comp="about-section"
          theme={'default'}
          className={`border-contrast-lower sticky top-0 h-screen min-h-screen overflow-hidden border-t ${className}`}
          yspace="10xl"
          style={{
            position: 'sticky',
            top: 0,
            overflow: 'hidden',
            height: '100vh',
          }}
          {...props}
        >
          <motion.div
            style={{
              display: 'flex',
              width: `${sections.length * 100}vw`,
              height: '100%',
              x,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {sections.map((section) => (
              <div
                key={section.key}
                style={{
                  width: '100vw',
                  height: '100%',
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {section.content}
              </div>
            ))}
          </motion.div>
        </Section>
      </div>
    );
  }
);

About.displayName = 'About';
