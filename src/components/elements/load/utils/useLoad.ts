import { cloneElement, isValidElement, type ReactNode, useMemo } from "react";

import { loadVariants, type LoadVariantProps } from "../styles/load.config";

export interface LoadProps extends LoadVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}
export type UseLoadProps = LoadProps &
  Omit<LoadVariantProps, keyof LoadVariantProps>;

export const useLoad = (props: UseLoadProps) => {
  const { ref: loadRef, variant = "default", loading = false } = props;

  const { root: loadStyle } = useMemo(
    () =>
      loadVariants({
        variant,
        loading,
      }),
    [variant, loading],
  );

  return {
    variant,
    loadStyle,
    loadRef,
  };
};
