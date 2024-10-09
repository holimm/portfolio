"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useHeading, UseHeadingProps } from "../utils/useHeading";

interface HeadingData {}

interface HeadingOptions extends UseHeadingProps {}

export interface HeadingProps
  extends HeadingOptions,
    Omit<HTMLAttributes<HTMLElement>, keyof HeadingData>,
    HeadingData {}

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  ({ className, children, ...props }: HeadingProps, ref) => {
    const { defaultConfig, ...context } = useHeading({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <defaultConfig.Component
        data-comp="heading"
        data-variant={ctx.variant}
        className={`${className} ${ctx.headingStyle()}`}
        ref={ctx.headingRef}
        {...props}
      >
        {children}
      </defaultConfig.Component>
    );
  },
);

Heading.displayName = "Heading";
