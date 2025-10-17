import { cloneElement, isValidElement, type ReactNode, useMemo } from 'react';

import {
  buttonVariants,
  type ButtonVariantProps,
} from '../config/Button.Config';
import { ButtonType } from '@/types';

export interface ButtonProps extends ButtonVariantProps {
  ref?: React.Ref<HTMLButtonElement> | undefined;
  type?: ButtonType;
  startContent?: ReactNode;
  endContent?: ReactNode;
}
export type UseButtonProps = ButtonProps &
  Omit<ButtonVariantProps, keyof ButtonVariantProps>;

export const useButton = (props: UseButtonProps) => {
  const {
    custom,
    width,
    type,
    rounded,
    upperCase,
    ref: buttonRef,
    variant = 'default',
    color,
    contrast,
    padding,
    endContent: endContentProp,
    startContent: startContentProp,
  } = props;

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          'aria-hidden': true,
          focusable: false,
          tabIndex: -1,
        } as any)
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
        width,
        padding,
      }),
    [variant, custom, color, contrast, rounded, upperCase, width, padding]
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
