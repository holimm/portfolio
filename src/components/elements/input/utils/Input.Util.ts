import { cloneElement, isValidElement, type ReactNode, useMemo } from 'react';

import { inputVariants, type InputVariantProps } from '../config/Input.Config';
import { InputType } from '@/types';

export interface InputProps extends InputVariantProps {
  ref?: React.Ref<HTMLInputElement> | undefined;
  type?: InputType;
  placeholder?: string;
}
export type UseInputProps = InputProps &
  Omit<InputVariantProps, keyof InputVariantProps>;

export const useInput = (props: UseInputProps) => {
  const { type, placeholder, variant, size, ref: inputRef } = props;

  const { root: inputStyle } = useMemo(
    () =>
      inputVariants({
        variant,
        size,
      }),
    [variant, size]
  );

  return {
    type,
    placeholder,
    variant,
    inputStyle,
    inputRef,
  };
};
