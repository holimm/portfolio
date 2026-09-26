'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Marquee from 'react-fast-marquee';
import { Menu } from 'lucide-react';
import { LayoutProps, HEADER_NAVIGATION } from '@/types';
import { Section, Container, Flex } from '@/components/layout';
import { Typography } from '@/components/elements';
import { cn } from '@/utils';
import {
  DEFAULT_TRANSITION,
  Flip,
  gsap,
  ScrollTrigger,
  smoothScrollTo,
  spring,
  springTo,
  useGSAP,
} from '@/config';
import { useManagedAnimation, usePresence } from '@/hooks';
import { SpringOptions } from '@/types';

const NAV_BG_SPRING: SpringOptions = { stiffness: 700, damping: 35, mass: 0.5 };
const MENU_BUTTON_SPRING: SpringOptions = { stiffness: 500, damping: 30 };

export const Header = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    // Refs
    const headerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const navBgRef = useRef<HTMLDivElement>(null);
    const navBgFlipStateRef = useRef<Flip.FlipState | null>(null);

    // Animations
    const navBgAnimation = useManagedAnimation();
    const menuButtonAnimation = useManagedAnimation();

    // States
    const [currentPath, setCurrentPath] = useState(HEADER_NAVIGATION[0].key);
    const [currentSection, setCurrentSection] = useState<string>('');
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    // Nav item that currently renders the active background; trails currentSection during exits
    const [activeNavKey, setActiveNavKey] = useState<string>('');

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
              {activeNavKey === key && (
                <div
                  ref={navBgRef}
                  data-flip-id="activeNavBg"
                  className={cn(
                    'bg-contrast-highest/40 absolute inset-x-0 rounded-sm shadow-sm backdrop-blur-md'
                  )}
                  style={{ height: '2.5rem' }}
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
                <button
                  type="button"
                  onClick={() => handleScrollToSection(key)}
                  className="cursor-pointer"
                >
                  <Typography
                    ref={linkLabelRef}
                    size="lg"
                    color="invert"
                    weight="semibold"
                    animation={{
                      type: 'split-words',
                      duration: 0.2,
                      delay: 0.2,
                      ease: 'easeOut',
                      hover: {
                        text: label,
                        duration: 0.2,
                        delay: 0.2,
                        ease: 'linear',
                        stagger: 0.05,
                      },
                    }}
                  >
                    {label}
                  </Typography>
                </button>
              </Flex>
            </Flex>
          </Container>
        );
      },
      [currentPath, activeNavKey, linkLabelRef]
    );

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        const menuEl = menuRef.current;
        const headerEl = headerRef.current;
        if (
          menuEl &&
          !menuEl.contains(event.target as Node) &&
          headerEl &&
          !headerEl.contains(event.target as Node)
        ) {
          setOpenMenu(false);
        }
      },
      [menuRef, headerRef]
    );

    const handleScrollToSection = useCallback((sectionId: string) => {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (section) {
        smoothScrollTo(section);
      }
    }, []);

    // Effects
    useGSAP(() => {
      const handleScroll = () => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>('section[data-theme]')
        );

        let current: string = '';
        const viewportCenter = window.innerHeight / 2;

        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (viewportCenter >= rect.top && viewportCenter < rect.bottom) {
            current = section.getAttribute('data-section') || '';
            break;
          }
        }

        setCurrentSection(current);
      };

      // ScrollTrigger updates on every smoothed scroll frame, not just native scroll events
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: handleScroll,
        onRefresh: handleScroll,
      });
      handleScroll();
    });

    // Move the active background to the current section's nav item, or fade it out
    useGSAP(
      () => {
        const navBg = navBgRef.current;
        const isNavSection = HEADER_NAVIGATION.some(
          (item) => item.key === currentSection
        );

        if (isNavSection && currentSection === activeNavKey && navBg) {
          // Returned to the same item before its exit finished
          navBgAnimation.play(() =>
            springTo(navBg, { opacity: 1, scale: 1, y: 0 }, NAV_BG_SPRING)
          );
        } else if (isNavSection) {
          // The Flip transition starts once the new item renders; stop any exit meanwhile
          navBgAnimation.kill();
          if (navBg)
            navBgFlipStateRef.current = Flip.getState(navBg, {
              props: 'opacity',
            });
          setActiveNavKey(currentSection);
        } else if (navBg) {
          navBgAnimation.play(() =>
            springTo(navBg, { opacity: 0, scale: 0.98, y: -5 }, NAV_BG_SPRING, {
              onComplete: () => setActiveNavKey(''),
            })
          );
        } else {
          setActiveNavKey('');
        }
      },
      { dependencies: [currentSection] }
    );

    const isMenuMounted = usePresence(openMenu, {
      onEnter: (isInitial) => {
        const items = gsap.utils.toArray('[data-menu-item]', menuRef.current);
        if (isInitial) {
          gsap.set(menuRef.current, { height: 0 });
          gsap.set(items, { opacity: 0 });
        }
        return gsap
          .timeline()
          .to(menuRef.current, { height: 'auto', ...DEFAULT_TRANSITION }, 0)
          .to(items, { opacity: 1, ...DEFAULT_TRANSITION }, 0);
      },
      onExit: () => {
        const items = gsap.utils.toArray('[data-menu-item]', menuRef.current);
        return gsap
          .timeline()
          .to(menuRef.current, { height: 0, ...DEFAULT_TRANSITION }, 0)
          .to(items, { opacity: 0, ...DEFAULT_TRANSITION }, 0);
      },
    });

    // Animate the active background in, sliding it from the previous item when there was one
    useGSAP(
      () => {
        const navBg = navBgRef.current;
        const flipState = navBgFlipStateRef.current;
        navBgFlipStateRef.current = null;
        if (!navBg) return;

        navBgAnimation.play(() => {
          if (flipState) {
            return Flip.from(flipState, {
              targets: navBg,
              ...spring(NAV_BG_SPRING),
            });
          }
          gsap.set(navBg, { opacity: 0, scale: 0.98, y: 5 });
          return springTo(navBg, { opacity: 1, scale: 1, y: 0 }, NAV_BG_SPRING);
        });
      },
      { dependencies: [activeNavKey, isMenuMounted] }
    );

    useGSAP(
      () => {
        menuButtonAnimation.play(() =>
          springTo(
            menuButtonRef.current,
            { rotation: openMenu ? 90 : 0 },
            MENU_BUTTON_SPRING
          )
        );
      },
      { dependencies: [openMenu] }
    );

    useEffect(() => {
      if (!openMenu) return;

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [openMenu]);

    return (
      <Section
        id={props.id}
        variant={'default'}
        comp="header"
        theme={theme}
        className={cn(
          '!fixed bottom-8 left-1/2 z-50 h-24 w-[95%] -translate-x-1/2 !bg-[unset] lg:bottom-12 lg:w-full',
          className
        )}
        xspace="none"
        yspace="none"
        ref={ref}
        {...props}
      >
        {isMenuMounted && (
          <div
            className="bg-contrast-highest/80 absolute bottom-20 h-60 w-full max-w-[600px] overflow-hidden rounded-t-lg backdrop-blur-md"
            ref={menuRef}
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
                  <div data-menu-item key={item.key}>
                    {renderLink(item.key, item.name)}
                  </div>
                ))}
              </Flex>
            </Container>
          </div>
        )}
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
              <button
                ref={menuButtonRef}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <Menu className="text-invert-highest cursor-pointer transition-all duration-200 hover:scale-110" />
              </button>
            </Flex>
          </Flex>
        </Container>
      </Section>
    );
  }
);

Header.displayName = 'Header';
