'use client';

import React, { forwardRef, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout';
import { LayoutProps, TECH_STACK } from '@/types';
import { cn } from '@/utils';
import {
  CONTAINER,
  SECTION_SPACING,
  SectionHeader,
  formatIndex,
  useScrollReveal,
  useStackedExit,
} from '../common';

export const TechStack = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useScrollReveal(sectionRef);
    useStackedExit(sectionRef);

    return (
      <Section
        id="tech-stack"
        variant={'default'}
        comp="tech-stack"
        theme={'default'}
        layout="block"
        className={cn('min-h-screen', className)}
        yspace="none"
        xspace="none"
        ref={sectionRef}
        {...props}
      >
        <div
          data-exit-content
          className={cn(CONTAINER, SECTION_SPACING, 'flex flex-col gap-16')}
        >
          <SectionHeader
            index="02"
            label="Stack"
            aside={`${TECH_STACK.length} tools`}
            title="The tools I reach for to ship fast, polished interfaces."
          />

          {/* Hairline grid: every cell draws its right and bottom edge */}
          <ul className="border-contrast-lowest grid grid-cols-2 border-t border-l md:grid-cols-3">
            {TECH_STACK.map((tech, index) => (
              <li
                key={tech.name}
                data-reveal-fade
                className="border-contrast-lowest border-r border-b last:col-span-2 md:last:col-span-1"
              >
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group hover:bg-contrast-highest hover:text-invert-highest text-contrast-highest flex h-full min-h-40 flex-col justify-between gap-6 p-4 transition-colors duration-500 md:min-h-56 md:p-6 2xl:min-h-64"
                >
                  <span className="text-contrast-medium group-hover:text-invert-medium flex items-start justify-between text-sm transition-colors duration-500 md:text-base">
                    <span className="tabular-nums">{formatIndex(index)}</span>
                    <ArrowUpRight className="size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 md:size-5" />
                  </span>

                  <tech.icon
                    aria-hidden="true"
                    className="size-8 transition-transform duration-500 group-hover:scale-110 md:size-11"
                  />

                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-xl leading-none font-medium tracking-[-0.03em] md:text-3xl">
                      {tech.name}
                    </span>
                    <span className="text-contrast-medium group-hover:text-invert-medium text-xs tracking-wider uppercase transition-colors duration-500">
                      {tech.role}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Deepens as the dark work section scrolls over */}
        <div
          aria-hidden="true"
          data-exit-shade
          className="pointer-events-none invisible absolute inset-0 bg-black opacity-0"
        />
      </Section>
    );
  }
);

TechStack.displayName = 'TechStack';
