'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutProps } from '@/types';
import { HEADER_NAVIGATION } from '@/types';
import { Section, Container, Flex } from '@/components/layout';
import { Typography } from '@/components/elements';
import { cn } from '@/utils';

export const Header = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    // States & refs
    const [currentPath, setCurrentPath] = useState(HEADER_NAVIGATION[0].key);
    const [currentSection, setCurrentSection] = useState<string>('');
    const headerRef = useRef<HTMLDivElement>(null);

    // Methods
    const renderLink = (key: string, label: string) => (
      <Container
        className="group relative cursor-pointer"
        onClick={() => setCurrentPath(key)}
      >
        <Flex height="full" width="full" align="center" justify="center">
          {currentPath === key && (
            <motion.div
              layoutId="activeNavBg"
              className={cn(
                'bg-contrast-highest/40 rounded-2xs absolute inset-x-0 shadow-sm backdrop-blur-md'
              )}
              style={{ height: '2.5rem' }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <Flex
            className={cn(
              'relative rounded-full px-3 py-2 transition-all duration-200 ease-in-out',
              { 'z-10': currentPath === key }
            )}
            justify="center"
            align="center"
          >
            <Typography size="sm" color="invert" weight="semibold">
              {label}
            </Typography>
          </Flex>
        </Flex>
      </Container>
    );

    // Effects
    useEffect(() => {
      const header = headerRef.current;
      if (!header) return;

      const sections = document.querySelectorAll<HTMLElement>(
        'section[data-theme]'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const section = entry.target.getAttribute('data-section');
              setCurrentSection(section || '');
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => observer.observe(section));

      return () => {
        observer.disconnect();
      };
    }, []);

    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="header"
        theme={theme}
        className={cn('!fixed top-8 left-0 z-50 w-full !bg-[unset]', className)}
        xspace="none"
        yspace="none"
        ref={ref}
        {...props}
      >
        <Container
          id="header"
          className={cn(
            'bg-contrast-highest/40 h-full max-w-screen-md overflow-hidden rounded-xs shadow-sm backdrop-blur-md'
          )}
          width="full"
          yspace="sm"
          xspace="xs"
          ref={headerRef}
        >
          <Flex height="full" gap="xs" justify="between" align="center">
            <Container xspace="xs">
              <Typography
                size="xl"
                color="invert"
                weight="semibold"
                fontFamily="oldschool-grotesk-condensed"
              >
                HO LIM
              </Typography>
            </Container>
            <Flex gap="xs">
              {HEADER_NAVIGATION.map((item) => (
                <React.Fragment key={item.key}>
                  {renderLink(item.key, item.name)}
                </React.Fragment>
              ))}
            </Flex>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Header.displayName = 'Header';
