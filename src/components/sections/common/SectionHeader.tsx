import React from 'react';
import { Typography } from '@/components/elements';
import { cn } from '@/utils';
import { RevealLine } from './RevealLine';

interface SectionHeaderProps {
  /** Running section number, e.g. `01`. */
  index: string;
  label: string;
  title: React.ReactNode;
  /** Short note on the right of the hairline, such as a count or status. */
  aside?: React.ReactNode;
  className?: string;
}

/**
 * Opens a section the way the hero's content is set: a hairline carrying the index and label, then
 * a tight medium headline starting a third of the way across.
 */
export const SectionHeader = ({
  index,
  label,
  title,
  aside,
  className,
}: SectionHeaderProps) => (
  <header className={cn('grid gap-y-8 md:grid-cols-3 md:gap-x-6', className)}>
    <div
      data-reveal-fade
      className="border-contrast-lowest text-contrast-medium flex items-center justify-between gap-4 border-t pt-3 text-sm md:col-span-3 md:text-base"
    >
      <span>
        <span className="tabular-nums">({index})</span> {label}
      </span>
      {aside && <span className="text-end">{aside}</span>}
    </div>

    <RevealLine className="md:col-span-2 md:col-start-2">
      <Typography
        ashtml="h2"
        weight="medium"
        contrast="highest"
        className="max-w-[24ch] text-[2.25rem] leading-[0.95] tracking-[-0.045em] text-balance md:text-6xl 2xl:text-7xl"
      >
        {title}
      </Typography>
    </RevealLine>
  </header>
);
