"use client";
import { forwardRef, ReactNode, useMemo, type HTMLAttributes } from "react";

import { useIcon, type UseIconProps } from "../utils/useIcon";

export interface IconData {}

export interface IconOptions extends UseIconProps {}

export interface IconProps
  extends IconOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseIconProps>,
    IconData {
  icon?: ReactNode;
  iconClassName?: string;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, children, title, icon, iconClassName, ...props }, ref) => {
    const { ...context } = useIcon({
      ref,
      icon,
      className,
      iconClassName,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <Component
        ref={ctx.iconRef}
        data-comp="icon"
        aria-label={title}
        data-variant={ctx.variant}
        className={`${className}`}
        {...props}
      >
        {ctx.icon}
      </Component>
    );
  },
);

Icon.displayName = "Icon";
