'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PRIMARY_NAVIGATION } from '@/types';
import { Flip, ScrollTrigger, gsap, smoothScrollTo, useGSAP } from '@/config';
import { cn } from '@/utils';

interface HeaderProps {
  className?: string;
}

/** The header turns into a centred pill once this section reaches the top of the viewport. */
const COMPACT_AFTER_SECTION = 'about';

const MORPH = { duration: 0.9, ease: 'expo.inOut' };

/** Matches Tailwind's `md`, where the links show inline and the burger hides. */
const DESKTOP_QUERY = '(min-width: 48rem)';

/** Gap between the header bar and the mobile dropdown, in pixels. */
const MENU_OFFSET = 8;

// A 1px gradient ring: the padding box is masked out, leaving only the border area painted
const GLASS_RIM: React.CSSProperties = {
  background:
    'linear-gradient(to bottom left, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0.35) 40%, rgb(0 0 0 / 0.08) 60%, rgb(0 0 0 / 0.28))',
  mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
  WebkitMask:
    'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
};

/**
 * Pure white text blended with `difference` inverts against whatever scrolls beneath it: light on
 * the globe's dark stage, dark on the white content, and back again over dark sections.
 *
 * Past the landing content the bar collapses into a centred pill over a frosted glass layer. A
 * blended element can't blur what's behind it, so the glass is its own fixed layer under the text,
 * tweened to the pill's box, while the text keeps blending against the blurred page.
 *
 * On phones the links move into a dropdown behind a burger button. The dropdown is also outside
 * the blended header so it can blur the page, and uses solid dark text on a light frosted panel.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className }, ref) => {
    const [compact, setCompact] = useState(false);
    const compactRef = useRef(false);
    const rowRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const glassRef = useRef<HTMLDivElement>(null);
    const burgerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const flipState = useRef<Flip.FlipState | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        if (!section) return;

        event.preventDefault();
        setMenuOpen(false);
        smoothScrollTo(section);
      },
      []
    );

    const changeMode = useCallback((next: boolean) => {
      if (compactRef.current === next) return;
      compactRef.current = next;
      // Captured before React re-renders so Flip can animate from the old layout
      flipState.current = Flip.getState([
        logoRef.current,
        navRef.current,
        burgerRef.current,
      ]);
      // The bar moves while it morphs, so an open dropdown would be left floating
      setMenuOpen(false);
      setCompact(next);
    }, []);

    // Fits the glass to the pill (or the full bar, faded out, when expanded)
    const placeGlass = useCallback((duration: number) => {
      const row = rowRef.current;
      const glass = glassRef.current;
      if (!row || !glass) return;

      const box = row.getBoundingClientRect();
      gsap.to(glass, {
        x: box.left,
        y: box.top,
        width: box.width,
        height: box.height,
        autoAlpha: compactRef.current ? 1 : 0,
        duration,
        ease: MORPH.ease,
        overwrite: true,
      });
    }, []);

    useGSAP(() => {
      const section = document.querySelector(
        `[data-section="${COMPACT_AFTER_SECTION}"]`
      );
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // Measured after the hero's pin, which pushes this section further down the page
        refreshPriority: -1,
        onEnter: () => changeMode(true),
        onLeaveBack: () => changeMode(false),
      });
    });

    useLayoutEffect(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      const duration = reducedMotion ? 0 : MORPH.duration;

      if (flipState.current) {
        // `scale` lets the text shrink smoothly into the pill instead of jumping size
        Flip.from(flipState.current, {
          duration,
          ease: MORPH.ease,
          scale: true,
        });
        flipState.current = null;
      }
      placeGlass(duration);
    }, [compact, placeGlass]);

    useLayoutEffect(() => {
      const onResize = () => placeGlass(0);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, [placeGlass]);

    // Drops the menu in under the bar, or lifts it away
    useLayoutEffect(() => {
      const menu = menuRef.current;
      const row = rowRef.current;
      if (!menu || !row) return;

      if (menuOpen) {
        gsap.set(menu, {
          top: row.getBoundingClientRect().bottom + MENU_OFFSET,
        });
        gsap.fromTo(
          menu,
          { autoAlpha: 0, y: -10, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: true,
          }
        );
      } else {
        gsap.to(menu, {
          autoAlpha: 0,
          y: -6,
          scale: 0.98,
          duration: 0.2,
          ease: 'power2.in',
          overwrite: true,
        });
      }
    }, [menuOpen]);

    // Closes the menu on Escape, a tap outside it, or widening to the inline links
    useEffect(() => {
      if (!menuOpen) return;

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return;
        setMenuOpen(false);
        burgerRef.current?.focus();
      };
      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (menuRef.current?.contains(target)) return;
        if (burgerRef.current?.contains(target)) return;
        setMenuOpen(false);
      };
      const desktop = window.matchMedia(DESKTOP_QUERY);
      const onBreakpoint = () => desktop.matches && setMenuOpen(false);

      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('pointerdown', onPointerDown);
      desktop.addEventListener('change', onBreakpoint);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('pointerdown', onPointerDown);
        desktop.removeEventListener('change', onBreakpoint);
      };
    }, [menuOpen]);

    return (
      <>
        <div
          ref={glassRef}
          aria-hidden="true"
          className="pointer-events-none invisible fixed top-0 left-0 z-[49] rounded-full bg-white/[0.06] opacity-0 shadow-[inset_-1px_1px_1px_rgb(255_255_255/0.35),inset_1px_-1px_1px_rgb(0_0_0/0.06),0_12px_32px_-12px_rgb(0_0_0/0.3),0_2px_6px_rgb(0_0_0/0.05)] backdrop-blur-2xl backdrop-saturate-[1.8]"
        >
          {/* Rim lit from the top right: bright along the top and right, shaded along the bottom and left */}
          <div
            className="absolute inset-0 rounded-full p-px"
            style={GLASS_RIM}
          />
        </div>

        <header
          ref={ref}
          data-comp="header"
          data-compact={compact || undefined}
          className={cn(
            'pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference',
            className
          )}
        >
          <div
            ref={rowRef}
            className={cn(
              'flex items-center',
              compact
                ? // Wider than its contents: logo and links sit at either end of the pill
                  'mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-xl justify-between gap-6 px-6 py-2.5 md:mt-5 md:max-w-2xl md:px-8 md:py-3'
                : 'justify-between gap-6 px-5 py-5 md:px-10 md:py-7 2xl:px-14'
            )}
          >
            <a
              ref={logoRef}
              href="#home"
              onClick={(event) => handleNavigate(event, 'home')}
              className="pointer-events-auto flex focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span
                className={cn(
                  'font-oldschool-grotesk-compact leading-none font-bold tracking-tight',
                  compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                )}
              >
                HO LIM
              </span>
            </a>

            <nav
              ref={navRef}
              aria-label="Primary"
              className="pointer-events-auto hidden md:block"
            >
              <ul
                className={cn(
                  'flex items-center',
                  compact ? 'gap-5 md:gap-7' : 'gap-5 md:gap-9'
                )}
              >
                {PRIMARY_NAVIGATION.map((item) => (
                  <li key={item.key}>
                    <a
                      href={`#${item.section}`}
                      onClick={(event) => handleNavigate(event, item.section)}
                      className={cn(
                        'group relative block py-1 leading-none font-medium tracking-wide uppercase focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white',
                        compact
                          ? 'text-xs md:text-[0.8125rem]'
                          : 'text-sm md:text-[0.9375rem]'
                      )}
                    >
                      {item.name}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              ref={burgerRef}
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="pointer-events-auto relative -mr-1.5 flex size-8 cursor-pointer items-center justify-center focus-visible:outline-1 focus-visible:outline-white md:hidden"
            >
              {/* Three-line burger that turns a quarter when the menu opens */}
              <span
                aria-hidden="true"
                className={cn(
                  'flex w-5 flex-col gap-[5px] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]',
                  menuOpen && 'rotate-90'
                )}
              >
                <span className="h-[1.5px] w-full bg-white" />
                <span className="h-[1.5px] w-full bg-white" />
                <span className="h-[1.5px] w-full bg-white" />
              </span>
            </button>
          </div>
        </header>

        <div
          ref={menuRef}
          id="mobile-menu"
          inert={!menuOpen}
          className="invisible fixed inset-x-3 z-50 origin-top rounded-sm bg-white/85 text-neutral-950 opacity-0 shadow-[inset_-1px_1px_1px_rgb(255_255_255/0.6),0_20px_48px_-16px_rgb(0_0_0/0.35),0_2px_8px_rgb(0_0_0/0.06)] backdrop-blur-2xl backdrop-saturate-[1.8] md:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-sm p-px"
            style={GLASS_RIM}
          />
          <nav aria-label="Mobile">
            <ul className="flex flex-col p-2">
              {PRIMARY_NAVIGATION.map((item, index) => (
                <li
                  key={item.key}
                  className={cn(index > 0 && 'border-t border-black/[0.08]')}
                >
                  <a
                    href={`#${item.section}`}
                    onClick={(event) => handleNavigate(event, item.section)}
                    className="flex items-baseline justify-between rounded-2xs px-4 py-3.5 text-2xl leading-none font-medium tracking-[-0.03em] transition-colors duration-300 hover:bg-black/[0.04] focus-visible:bg-black/[0.06] focus-visible:outline-none"
                  >
                    {item.name}
                    <span className="text-xs tracking-wider text-neutral-500 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }
);

Header.displayName = 'Header';
