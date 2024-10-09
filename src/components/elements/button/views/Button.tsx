"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useButton, type UseButtonProps } from "../utils/useButton";
import { Status } from "../types/button.types";

export interface ButtonData {}

export interface ButtonOptions extends UseButtonProps {
  state?: Status;
}

export interface ButtonProps
  extends ButtonOptions,
    Omit<HTMLAttributes<HTMLButtonElement>, keyof UseButtonProps>,
    ButtonData {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      title,
      state,
      type,
      endContent,
      startContent,
      ...props
    },
    ref,
  ) => {
    const { ...context } = useButton({
      ref,
      endContent,
      startContent,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = "button";

    return (
      <Component
        type={type}
        title={title}
        ref={ctx.buttonRef}
        data-comp="button"
        aria-label={title}
        data-variant={ctx.variant}
        disabled={state === Status.Disable}
        className={`${className} ${ctx.buttonStyle()}`}
        {...props}
      >
        {ctx.startContent}
        {children}
        {ctx.endContent}
      </Component>
    );
  },
);

Button.displayName = "Button";
