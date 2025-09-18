'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    const linkLabelRef = useRef<any>(null);

    const renderLink = (key: string, label: string) => (
      <Container
        className="group relative cursor-pointer"
        onClick={() => setCurrentPath(key)}
      >
        <Flex height="full" width="full" align="center" justify="center">
          <AnimatePresence>
            {currentSection === key && (
              <motion.div
                layoutId="activeNavBg"
                className={cn(
                  'bg-contrast-highest/40 absolute inset-x-0 rounded-sm shadow-sm backdrop-blur-md'
                )}
                style={{ height: '2.5rem' }}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </AnimatePresence>
          <Flex
            className={cn(
              'relative rounded-full px-3 py-2 transition-all duration-200 ease-in-out',
              { 'z-10': currentPath === key }
            )}
            justify="center"
            align="center"
          >
            <Typography
              ref={linkLabelRef}
              size="sm"
              color="invert"
              weight="semibold"
              animation={{
                type: 'split-words',
                duration: 0.4,
                delay: 0.05,
                ease: 'easeInOut',
              }}
            >
              {label}
            </Typography>
          </Flex>
        </Flex>
      </Container>
    );

    // Effects
    useEffect(() => {
      const handleScroll = () => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>('section[data-theme]')
        );

        let current: string = '';
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;
          if (scrollPosition >= top && scrollPosition < bottom) {
            current = section.getAttribute('data-section') || '';
            setCurrentSection(current);
            break;
          }
        }

        setCurrentSection(current);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
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
            'bg-contrast-highest/40 h-full max-w-screen-md overflow-hidden rounded-md shadow-sm backdrop-blur-md'
          )}
          width="full"
          yspace="sm"
          xspace="xs"
          ref={headerRef}
        >
          <Flex height="full" gap="xs" justify="between" align="center">
            <Container xspace="xs" width="fit">
              <Flex variant="col" gap="none">
                <Typography
                  size="xl"
                  color="invert"
                  weight="semibold"
                  fontFamily="oldschool-grotesk-condensed"
                  animation={{
                    type: 'split-chars',
                    duration: 0.3,
                    delay: 0.05,
                    ease: 'easeInOut',
                  }}
                >
                  HO LIM
                </Typography>
              </Flex>
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
