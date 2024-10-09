"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useFlex, UseFlexProps } from "../utils/useFlex";
import { FlexProvider } from "../utils/useFlexContext";

export interface FlexData {}

export interface FlexOptions extends UseFlexProps {}

export interface FlexProps
  extends FlexOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof FlexData>,
    FlexData {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useFlex({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <FlexProvider value={ctx}>
        <div
          id={props.id}
          data-variant={ctx.variant}
          data-comp="flex"
          className={`${className} ${ctx.flexStyle()}`}
          ref={ctx.flexRef}
          {...props}
        >
          {children}
        </div>
      </FlexProvider>
    );
  },
);

Flex.displayName = "Flex";
