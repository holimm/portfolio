import { useMemo, useRef, useState } from "react";

import {
  drawerVariants,
  type DrawerVariantProps,
} from "../styles/drawer.config";

export interface DrawerProps extends DrawerVariantProps {
  open?: boolean;
  onCancel?: () => void;
  ref?: React.Ref<HTMLDivElement> | undefined;
}
export type UseDrawerProps = DrawerProps &
  Omit<DrawerVariantProps, keyof DrawerVariantProps>;

export const useDrawer = (props: UseDrawerProps) => {
  const { ref: drawerRef, open, onCancel, variant = "default" } = props;
  const contentRef = useRef(null);

  const {
    root: drawerStyle,
    content: drawerContentStyle,
    overlay: drawerOverlayStyle,
  } = useMemo(
    () =>
      drawerVariants({
        variant,
      }),
    [variant],
  );
  return {
    variant,
    open,
    onCancel,
    drawerStyle,
    drawerContentStyle,
    drawerOverlayStyle,
    drawerRef,
    contentRef,
  };
};
