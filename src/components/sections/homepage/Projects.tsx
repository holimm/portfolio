'use client';

import React, { forwardRef, useRef } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/layout';
import { LayoutProps, SELECTED_PROJECTS } from '@/types';
import { cn } from '@/utils';
import {
  CONTAINER,
  META_LABEL,
  SECTION_SPACING,
  SectionHeader,
  formatIndex,
  useScrollReveal,
  useStackedExit,
} from '../common';

type Project = (typeof SELECTED_PROJECTS)[number];

// Categories are stored as a trailing-comma list, e.g. "ReactJS, TailwindCSS, "
const toTags = (category: string) =>
  category
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

const LINK =
  'text-contrast-medium hover:text-contrast-highest flex items-center gap-1.5 transition-colors duration-300';

const ProjectCard = ({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) => {
  const liveSite =
    project.liveSite && project.liveSite !== project.href
      ? project.liveSite
      : undefined;

  return (
    <article className={cn('flex flex-col', className)}>
      <a
        href={liveSite ?? project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title}`}
        className="group block"
      >
        <div
          data-reveal-image
          className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gray-900"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
          />
          <span className="bg-contrast-highest text-invert-highest absolute right-4 bottom-4 flex size-12 scale-0 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-100 md:size-14">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </a>

      <div
        data-reveal-fade
        className="border-contrast-lowest mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 border-t pt-3"
      >
        <span className="text-contrast-medium pt-1 text-sm tabular-nums md:text-base">
          {formatIndex(index)}
        </span>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-contrast-highest text-2xl leading-none font-medium tracking-[-0.03em] md:text-4xl">
            {project.title}
          </h3>
          <div className="flex items-center gap-5 text-sm">
            {liveSite && (
              <a
                href={liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                <span className="bg-success size-2 animate-pulse rounded-full" />
                Live site
              </a>
            )}
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
        <p className={cn(META_LABEL, 'col-start-2 leading-relaxed')}>
          {toTags(project.category).join(' / ')}
        </p>
      </div>
    </article>
  );
};

export const Projects = forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, theme, ...props }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useScrollReveal(sectionRef);
    useStackedExit(sectionRef);

    return (
      <Section
        id="projects"
        variant={'default'}
        comp="projects"
        theme={'dark'}
        layout="block"
        className={className}
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
            index="03"
            label="Selected work"
            aside={`${SELECTED_PROJECTS.length} projects`}
            title="A few things I’ve designed and built."
          />

          {/* Two columns, the right one set lower for an editorial rhythm */}
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
            {SELECTED_PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                className={cn(index % 2 === 1 && 'md:mt-40')}
              />
            ))}
          </div>
        </div>

        {/* Lifts towards the light contact section as it scrolls over */}
        <div
          aria-hidden="true"
          data-exit-shade
          className="pointer-events-none invisible absolute inset-0 bg-white opacity-0"
        />
      </Section>
    );
  }
);

Projects.displayName = 'Projects';
