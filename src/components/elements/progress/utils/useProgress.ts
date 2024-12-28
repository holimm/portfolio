import { cloneElement, isValidElement, type ReactNode, useMemo } from "react";

import {
  progressVariants,
  type ProgressVariantProps,
} from "../styles/progress.config";

export interface ProgressProps extends ProgressVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
  middleContent?: ReactNode;
}
export type UseProgressProps = ProgressProps &
  Omit<ProgressVariantProps, keyof ProgressVariantProps>;

export const useProgress = (props: UseProgressProps) => {
  const {
    size,
    ref: progressRef,
    variant = "radial",
    color,
    contrast,
    middleContent: middleContentProp,
  } = props;

  const getMiddleContentClone = (middleContent: ReactNode) =>
    isValidElement(middleContent)
      ? cloneElement(middleContent, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
        })
      : null;

  const middleContent = getMiddleContentClone(middleContentProp);

  const {
    root: progressStyle,
    childContainer: progressChildContainerStyle,
    child: progressChildStyle,
  } = useMemo(
    () =>
      progressVariants({
        variant,
        color,
        contrast,
        size,
      }),
    [variant, color, contrast, size],
  );

  return {
    variant,
    progressStyle,
    progressChildContainerStyle,
    progressChildStyle,
    progressRef,
    middleContent,
  };
};
