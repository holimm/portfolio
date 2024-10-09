"use client";
import { forwardRef, HTMLAttributes, useMemo } from "react";
import { useText, UseTextProps } from "../utils/useText";

interface TextData {}

interface TextOptions extends UseTextProps {}

export interface TextProps
  extends TextOptions,
    Omit<HTMLAttributes<HTMLElement>, keyof UseTextProps>,
    TextData {}

export const Text = forwardRef<HTMLDivElement, TextProps>(
  ({ className, children, ...props }: TextProps, ref) => {
    const { defaultConfig, ...context } = useText({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    return (
      <defaultConfig.Component
        data-comp="text"
        data-variant={ctx.variant}
        className={`${className} ${ctx.textStyle()}`}
        ref={ctx.textRef}
        {...props}
      >
        {children}
      </defaultConfig.Component>
    );
  },
);

Text.displayName = "Text";
