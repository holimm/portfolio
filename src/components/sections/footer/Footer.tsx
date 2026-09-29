'use client';

import React, { forwardRef, useCallback, useRef } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { LayoutProps, SOCIAL_MEDIA_LINKS } from '@/types';
import { Section } from '@/components/layout';
import { Typography } from '@/components/elements';
import { HEADER_NAVIGATION } from '@/types';
import { cn } from '@/utils';
import { smoothScrollTo } from '@/config';
import {
  Availability,
  CONTAINER,
  LocalTime,
  META_LABEL,
  RevealLine,
  useScrollReveal,
} from '../common';

const FOOTER_META = [
  { label: 'Local time', value: <LocalTime /> },
  { label: 'Availability', value: <Availability /> },
];

const COLUMN_LABEL =
  'border-contrast-lowest text-contrast-medium border-t pt-3 text-sm md:text-base';

const LINK =
  'text-contrast-highest hover:text-contrast-medium group flex items-center gap-2 text-2xl leading-tight font-medium tracking-[-0.03em] transition-colors duration-300 md:text-3xl';

export const Footer = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const footerRef = useRef<HTMLDivElement>(null);
    useScrollReveal(footerRef);

    const handleScrollToSection = useCallback((sectionId: string) => {
      const section = document.querySelector(`[data-section="${sectionId}"]`);
      if (section) smoothScrollTo(section);
    }, []);

    return (
      <Section
        id={props.id}
        variant={'parallax'}
        comp="footer"
        theme={theme}
        layout="block"
        className={cn('min-h-screen overflow-hidden', className)}
        yspace="none"
        xspace="none"
        ref={footerRef}
        parallaxDirection="top"
        {...props}
      >
        <div
          className={cn(
            CONTAINER,
            'flex min-h-screen flex-col justify-between gap-20 pt-32 pb-6 md:pt-40 md:pb-8'
          )}
        >
          <div className="grid gap-12 md:grid-cols-3 md:gap-x-6">
            <RevealLine>
              <Typography
                weight="medium"
                contrast="highest"
                className="max-w-[20ch] text-3xl leading-[1] tracking-[-0.04em] md:text-4xl 2xl:text-5xl"
              >
                Thanks for stopping by. If something caught your eye, I’d be
                glad to connect.
              </Typography>
            </RevealLine>

            <nav
              aria-label="Footer"
              data-reveal-fade
              className="flex flex-col gap-5"
            >
              <span className={COLUMN_LABEL}>(Navigate)</span>
              <ul className="flex flex-col gap-2">
                {HEADER_NAVIGATION.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => handleScrollToSection(item.key)}
                      className={cn(LINK, 'cursor-pointer')}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div data-reveal-fade className="flex flex-col gap-5">
              <span className={COLUMN_LABEL}>(Elsewhere)</span>
              <ul className="flex flex-col gap-2">
                {SOCIAL_MEDIA_LINKS.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK}
                    >
                      {item.name}
                      <ArrowUpRight className="size-5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              data-reveal-fade
              className="border-contrast-lowest text-contrast-medium flex items-center justify-between gap-4 border-t pt-3 text-sm md:text-base"
            >
              <span>
                © {new Date().getFullYear()} — Designed &amp; developed by Ho
                Lim
              </span>
              <button
                type="button"
                onClick={() => handleScrollToSection('home')}
                className="hover:text-contrast-highest flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap transition-colors duration-300"
              >
                Back to top
                <ArrowUp className="size-4" />
              </button>
            </div>

            <div className="flex items-end justify-between gap-6">
              <RevealLine>
                <p
                  aria-hidden="true"
                  className="font-oldschool-grotesk-compressed text-contrast-highest -mb-[0.1em] -ml-[0.03em] text-[length:38vw] leading-[0.8] font-bold tracking-tight whitespace-nowrap select-none"
                >
                  HO LIM
                </p>
              </RevealLine>

              <dl className="hidden shrink-0 flex-col gap-5 pb-2 md:flex">
                {FOOTER_META.map((item) => (
                  <div
                    key={item.label}
                    data-reveal-fade
                    className="border-contrast-lowest flex min-w-48 flex-col gap-1.5 border-t pt-3"
                  >
                    <dt className={META_LABEL}>{item.label}</dt>
                    <dd className="text-contrast-highest text-sm md:text-base">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>
    );
  }
);

Footer.displayName = 'Footer';
