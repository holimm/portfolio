'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { cn } from '@/utils';
import { ResponsiveSpan } from '@/types';
import { useGridItem, UseGridItemProps } from '../utils/Grid.Util';

export interface GridItemProps
  extends Omit<UseGridItemProps, 'span'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  className?: string;
  children?: React.ReactNode;
  span?: string | number | ResponsiveSpan[];
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useGridItem({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <div
        id={props.id}
        data-variant={ctx.variant}
        data-comp="grid-item"
        className={cn(className, ctx.gridItemStyle(), ctx.spanClass)}
        ref={ctx.gridItemRef}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';
