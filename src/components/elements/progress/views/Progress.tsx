"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useProgress, type UseProgressProps } from "../utils/useProgress";
import { SystemProgressSVG } from "@/assets/img";
import { Flex } from "@/components/layout/flex";
import { Text } from "../../typography";

export interface ProgressData {}

export interface ProgressOptions extends UseProgressProps {}

export interface ProgressProps
  extends ProgressOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseProgressProps>,
    ProgressData {
  percent: number;
  asChild?: boolean;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, children, title, percent, middleContent, ...props }, ref) => {
    const { ...context } = useProgress({ ref, middleContent, ...props });

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    const radius = 40; // Radius of the circle
    const fullCircumference = 2 * Math.PI * radius; // Full circle circumference

    // Determine the fraction of the circle: 0.5 for half-circle or 1 for full-circle
    const fraction = ctx.variant === "half-radial" ? 0.5 : 1;

    // Calculate the total strokeDasharray based on the circle fraction
    const strokeDasharray = fullCircumference * fraction;
    const strokeDashoffset = strokeDasharray * (1 - percent / 100);

    const arrowRotation = 180 * (percent / 100);

    return (
      <Component
        ref={ctx.progressRef}
        data-comp="progress"
        aria-label={title}
        data-variant={ctx.variant}
        className={`${ctx.progressStyle()} ${className}`}
        {...props}
      >
        {/* Middle Content */}
        <div className="absolute top-0 flex h-full w-full items-center justify-center">
          {ctx.middleContent}
        </div>

        {/* SVG Rendering */}

        {ctx.variant === "radial" || ctx.variant === "half-radial" ? (
          <svg
            className={`${ctx.progressChildContainerStyle()}`}
            viewBox={`0 0 100 ${fraction === 0.5 ? 50 : 100}`}
          >
            {/* Background Path */}
            <path
              d={`
              M 10 50 
              A 40 40 0 ${fraction === 0.5 ? 1 : 0} 1 90 50
              ${fraction === 1 ? "A 40 40 0 1 1 10 50" : ""} 
            `}
              fill="none"
              stroke="#eee"
              strokeWidth="6"
            />
            {/* Progress Path */}
            <path
              className={`stroke-current ${ctx.progressChildStyle()}`}
              d={`
              M 10 50 
              A 40 40 0 ${fraction === 0.5 ? 1 : 0} 1 90 50
              ${fraction === 1 ? "A 40 40 0 1 1 10 50" : ""} 
            `}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="6"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
        ) : null}
        {ctx.variant === "straight" ? (
          <Flex className="w-fit" justify="between" align="center" gap="2xs">
            <svg
              width="100%"
              height="0.25rem"
              viewBox="0 0 100 1"
              className={`${ctx.progressChildContainerStyle()}`}
            >
              {/* Background line */}
              <path
                d={`M 0 0.125 H 100`} // Horizontal line in the middle
                stroke="var(--color-background-light)"
                strokeWidth="0.25rem"
                strokeLinecap="round"
              />
              {/* Progress line */}
              <path
                className={`stroke-current ${ctx.progressChildStyle()}`}
                d={`M 0 0.125 H ${percent}`} // Progress length depends on `percent`
                strokeWidth="0.25rem"
                strokeLinecap="round"
              />
            </svg>
            <Flex>
              <Text size="sm" weight="medium" letterSpacing="tight">
                {percent}%
              </Text>
            </Flex>
          </Flex>
        ) : null}
        {ctx.variant === "dashboard" ? (
          <SystemProgressSVG percent={percent} arrowRotation={arrowRotation} />
        ) : null}
      </Component>
    );
  },
);

Progress.displayName = "Progress";
