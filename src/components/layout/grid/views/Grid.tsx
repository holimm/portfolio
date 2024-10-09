"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useGrid, UseGridProps } from "../utils/useGrid";
import { GridProvider } from "../utils/useGridContext";

export interface GridData {}

export interface GridOptions extends UseGridProps {}

export interface GridProps
  extends GridOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof GridData>,
    GridData {}

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
  },
);

Grid.displayName = "Grid";
