'use client';

import { forwardRef, useMemo, type HTMLAttributes } from 'react';

import { useInput, type UseInputProps } from '../utils/Input.Util';
import { InputType, Status } from '@/types';

export interface InputProps
  extends UseInputProps,
    Omit<HTMLAttributes<HTMLInputElement>, keyof UseInputProps> {
  state?: Status;
  type: InputType;
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, children, title, state, type, placeholder, size, ...props },
    ref
  ) => {
    const { ...context } = useInput({
      ref,
      size,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = 'input';

    return (
      <Component
        type={type}
        placeholder={placeholder}
        ref={ctx.inputRef}
        data-comp="input"
        aria-label={title}
        data-variant={ctx.variant}
        disabled={state === Status.Disable}
        className={`${className} ${ctx.inputStyle()}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps
  extends UseInputProps,
    Omit<HTMLAttributes<HTMLTextAreaElement>, keyof UseInputProps> {
  state?: Status;
  placeholder?: string;
  cols?: number;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      children,
      title,
      state,
      placeholder,
      size,
      cols,
      rows,
      ...props
    },
    ref
  ) => {
    const { ...context } = useInput({
      size,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = 'textarea';

    return (
      <Component
        placeholder={placeholder}
        ref={ref}
        data-comp="textarea"
        data-variant={ctx.variant}
        disabled={state === Status.Disable}
        className={`${className} ${ctx.inputStyle()}`}
        cols={cols}
        rows={rows}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
