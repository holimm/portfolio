'use client';
import { forwardRef, useMemo, type HTMLAttributes } from 'react';

import { useButton, type UseButtonProps } from '../utils/Button.Util';
import { Status } from '@/types';

export interface ButtonProps
  extends UseButtonProps,
    Omit<HTMLAttributes<HTMLButtonElement>, keyof UseButtonProps> {
  state?: Status;
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
    ref
  ) => {
    const { ...context } = useButton({
      ref,
      endContent,
      startContent,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = 'button';

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
  }
);

Button.displayName = 'Button';
