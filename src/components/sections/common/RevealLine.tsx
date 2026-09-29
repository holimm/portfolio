import React from 'react';
import { cn } from '@/utils';

/** Clips its child so a line of text can rise into view. */
export const RevealLine = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('overflow-hidden pb-[0.06em]', className)}>
    <div data-reveal>{children}</div>
  </div>
);
