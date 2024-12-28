import { cloneElement, isValidElement, type ReactNode, useMemo } from "react";

import { inputVariants, type InputVariantProps } from "../styles/input.config";
import type { IInputType } from "../types/input.types";

export interface InputProps extends InputVariantProps {
  ref?: React.Ref<HTMLInputElement> | undefined;
  type?: IInputType;
}
export type UseInputProps = InputProps &
  Omit<InputVariantProps, keyof InputVariantProps>;

export const useInput = (props: UseInputProps) => {
  const {
    custom,
    size,
    width,
    type,
    rounded,
    ref: inputRef,
    variant = "default",
  } = props;

  const { root: inputStyle } = useMemo(
    () =>
      inputVariants({
        variant,
        custom,
        rounded,
        size,
        width,
      }),
    [variant, custom, rounded, size, width],
  );

  return {
    type,
    variant,
    inputStyle,
    inputRef,
  };
};
