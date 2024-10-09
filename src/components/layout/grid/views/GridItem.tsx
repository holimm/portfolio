"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useGridItem, UseGridItemProps } from "../utils/useGridItem";

export interface GridItemData {}

export interface GridItemOptions extends UseGridItemProps {}

export interface GridItemProps
  extends GridItemOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof GridItemData>,
    GridItemData {}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useGridItem({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <div
        id={props.id}
        data-variant={ctx.variant}
        data-comp="grid-item"
        className={`${className} ${ctx.gridItemStyle()}`}
        ref={ctx.gridItemRef}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GridItem.displayName = "GridItem";
