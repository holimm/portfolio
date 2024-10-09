import { cloneElement, isValidElement, type ReactNode, useMemo } from "react";

import { iconVariants, type IconVariantProps } from "../styles/icon.config";

export interface IconProps extends IconVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
}
export type UseIconProps = IconProps &
  Omit<IconVariantProps, keyof IconVariantProps>;

export const useIcon = (props: UseIconProps) => {
  const {
    size,
    ref: iconRef,
    variant = "default",
    color,
    contrast,
    className,
    iconClassName,
    icon: iconProp,
  } = props;

  const { root: iconStyle } = useMemo(
    () =>
      iconVariants({
        variant,
        color,
        contrast,
        size,
      }),
    [variant, color, contrast, size],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          className: `${iconClassName} ${iconStyle()}`,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const icon = getIconClone(iconProp);

  return {
    variant,
    iconStyle,
    iconRef,
    icon,
  };
};
