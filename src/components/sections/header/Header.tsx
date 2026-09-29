'use client';

import React, { forwardRef, useCallback } from 'react';
import { PRIMARY_NAVIGATION } from '@/types';
import { smoothScrollTo } from '@/config';
import { cn } from '@/utils';

interface HeaderProps {
  className?: string;
}

/**
 * Pure white text blended with `difference` inverts against whatever scrolls beneath it: light on
 * the globe's dark stage, dark on the white content, and back again over dark sections.
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ className }, ref) => {
    const handleNavigate = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        if (!section) return;

        event.preventDefault();
        smoothScrollTo(section);
      },
      []
    );

    return (
      <header
        ref={ref}
        data-comp="header"
        className={cn(
          'pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference',
          className
        )}
      >
        <div className="flex items-center justify-between gap-6 px-5 py-5 md:px-10 md:py-7 2xl:px-14">
          <a
            href="#home"
            onClick={(event) => handleNavigate(event, 'home')}
            className="pointer-events-auto flex focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="font-oldschool-grotesk-compact text-xl leading-none font-bold tracking-tight md:text-2xl">
              HO LIM
            </span>
          </a>

          <nav aria-label="Primary" className="pointer-events-auto">
            <ul className="flex items-center gap-5 md:gap-9">
              {PRIMARY_NAVIGATION.map((item) => (
                <li key={item.key}>
                  <a
                    href={`#${item.section}`}
                    onClick={(event) => handleNavigate(event, item.section)}
                    className="group relative block py-1 text-sm leading-none font-medium tracking-wide uppercase focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white md:text-[0.9375rem]"
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
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
