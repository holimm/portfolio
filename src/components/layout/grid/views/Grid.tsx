'use client';

import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { GridProvider, useGrid, UseGridProps } from '../utils/Grid.Util';

export interface GridProps
  extends UseGridProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'cols' | 'rows'> {}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useGrid({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <GridProvider value={ctx}>
        <div
          id={props.id}
          data-variant={ctx.variant}
          data-comp="grid"
          className={`${className} ${ctx.gridStyle()}`}
          ref={ctx.gridRef}
          {...props}
        >
          {children}
        </div>
      </GridProvider>
    );
  }
);

Grid.displayName = 'Grid';
