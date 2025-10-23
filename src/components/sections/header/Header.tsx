'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutProps } from '@/types';
import { HEADER_NAVIGATION } from '@/types';
import { Section, Container, Flex } from '@/components/layout';
import { Typography } from '@/components/elements';
import { cn } from '@/utils';
import Marquee from 'react-fast-marquee';
import { Menu } from 'lucide-react';

export const Header = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    // States & refs
    const [currentPath, setCurrentPath] = useState(HEADER_NAVIGATION[0].key);
    const [currentSection, setCurrentSection] = useState<string>('');
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const headerRef = useRef<HTMLDivElement>(null);

    // Methods
    const linkLabelRef = useRef<any>(null);

    const renderLink = useCallback(
      (key: string, label: string) => {
        return (
          <Container
            className="group relative cursor-pointer"
            width="fit"
            onClick={() => setCurrentPath(key)}
          >
            <Flex height="full" width="full" align="start" justify="end">
              <AnimatePresence>
                {currentSection === key && (
                  <motion.div
                    layoutId="activeNavBg"
                    className={cn(
                      'bg-contrast-highest/40 absolute inset-x-0 rounded-sm shadow-sm backdrop-blur-md'
                    )}
                    style={{ height: '2.5rem' }}
                    initial={{ opacity: 0, scale: 0.98, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 700,
                      damping: 35,
                      mass: 0.5,
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
                  size="lg"
                  color="invert"
                  weight="semibold"
                  animation={{
                    type: 'split-words',
                    duration: 0.2,
                    delay: 0.05,
                    ease: 'easeOut',
                    hover: {
                      text: label,
                      duration: 0.2,
                      delay: 0.05,
                      ease: 'linear',
                      stagger: 0.05,
                    },
                  }}
                >
                  {label}
                </Typography>
              </Flex>
            </Flex>
          </Container>
        );
      },
      [currentPath, currentSection, linkLabelRef]
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
        className={cn(
          '!fixed bottom-12 left-0 z-50 h-24 w-full !bg-[unset]',
          className
        )}
        xspace="none"
        yspace="none"
        ref={ref}
        {...props}
      >
        <AnimatePresence>
          {openMenu && (
            <motion.div
              className="bg-contrast-highest/80 absolute bottom-20 h-60 w-full max-w-[600px] overflow-hidden rounded-t-lg backdrop-blur-md"
              initial={{ height: 0 }}
              animate={{ height: 'fit-content' }}
              exit={{ height: 0 }}
            >
              <Container
                className="!pb-8"
                height="full"
                width="full"
                yspace="lg"
                xspace="md"
              >
                <Flex
                  variant="col"
                  width="full"
                  justify="start"
                  align="end"
                  gap="xs"
                >
                  {HEADER_NAVIGATION.map((item) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={item.key}
                    >
                      {renderLink(item.key, item.name)}
                    </motion.div>
                  ))}
                </Flex>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
        <Container
          id="header"
          className="bg-contrast-highest/80 relative max-w-[600px] overflow-hidden shadow-sm backdrop-blur-md"
          height="full"
          width="full"
          yspace="sm"
          xspace="sm"
          rounded="md"
          ref={headerRef}
        >
          <Flex height="full" gap="md" justify="between" align="center">
            <div className="bg-invert-highest aspect-square h-full w-auto rounded-sm"></div>
            <Flex className="relative basis-full" variant="col" gap="sm">
              <Typography
                fontFamily="oldschool-grotesk-compact"
                weight="bold"
                color="invert"
                size="xl"
              >
                HO LIM
              </Typography>
              <Marquee speed={20} direction="left" autoFill>
                <Typography
                  className="uppercase"
                  fontFamily="oldschool-grotesk-compact"
                  weight="medium"
                  color="invert"
                  letterSpacing="wider"
                  size="lg"
                >
                  Full-stack Developer, Web Designer, UI/UX Designer, Next.js
                  Developer, Node.js Developer, React Developer, Front-end
                  Developer, Back-end Developer,
                </Typography>
              </Marquee>
            </Flex>
            <Flex className="pr-4" justify="center" align="center">
              <motion.button
                onClick={() => setOpenMenu(!openMenu)}
                initial={{ rotate: 0 }}
                animate={{ rotate: openMenu ? 90 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Menu className="text-invert-highest cursor-pointer transition-all duration-200 hover:scale-110" />
              </motion.button>
            </Flex>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Header.displayName = 'Header';
