import { cloneElement, isValidElement, type ReactNode, useMemo } from "react";

import {
  buttonVariants,
  type ButtonVariantProps,
} from "../styles/button.config";
import type { IButtonType } from "../types/button.types";

export interface ButtonProps extends ButtonVariantProps {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  type?: IButtonType;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
export type UseButtonProps = ButtonProps &
  Omit<ButtonVariantProps, keyof ButtonVariantProps>;

export const useButton = (props: UseButtonProps) => {
  const {
    custom,
    size,
    width,
    type,
    rounded,
    upperCase,
    ref: buttonRef,
    variant = "default",
    color,
    contrast,
    endContent: endContentProp,
    startContent: startContentProp,
  } = props;

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const startContent = getIconClone(startContentProp);
  const endContent = getIconClone(endContentProp);

  const { root: buttonStyle } = useMemo(
    () =>
      buttonVariants({
        variant,
        custom,
        color,
        contrast,
        rounded,
        upperCase,
        size,
        width,
      }),
    [variant, custom, color, contrast, rounded, upperCase, size, width],
  );

  return {
    type,
    variant,
    buttonStyle,
    buttonRef,
    endContent,
    startContent,
  };
};
