"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { toastVariants, type ToastVariantProps } from "../styles/toast.config";
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
} from "../../icon/icons";

export interface ToastData {
  id: number;
  content: ToastContentType;
  duration: number;
  variant: VariantTypes;
}

export interface UseToastProps extends ToastVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}

export const useToast = (props: UseToastProps) => {
  const { ref: toastRef, variant = "default" } = props;

  const [toasts, setToasts] = useState<ToastData[]>([]);

  const { root: toastStyle, child: toastChildStyle } = useMemo(
    () => toastVariants({ variant }),
    [variant],
  );

  const addToast = useCallback(
    (variant: VariantTypes, content: ToastContentType) => {
      const id = Date.now();
      setToasts((prevToasts) => [
        { id, content, duration: 2000, variant },
        ...prevToasts,
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id),
        );
      }, 3000);
    },
    [],
  );

  const getVariantData = useCallback(
    (
      variant: VariantTypes,
    ): {
      className: string;
      textColor: VariantTextColorTypes;
      iconColor: VariantIconColorTypes;
      icon: ReactNode;
    } => {
      switch (variant) {
        case "info":
          return {
            className: "border-primary bg-primary-lighter",
            textColor: "primary",
            iconColor: "primary",
            icon: <InfoIcon />,
          };
        case "error":
          return {
            className: "border-error bg-error-lighter",
            textColor: "error",
            iconColor: "error",
            icon: <ErrorIcon />,
          };
        case "success":
          return {
            className: "border-success bg-success-lighter",
            textColor: "success",
            iconColor: "success",
            icon: <SuccessIcon />,
          };
        case "warning":
          return {
            className: "border-warning bg-warning-lighter",
            textColor: "warning",
            iconColor: "warning",
            icon: <WarningIcon />,
          };
        default:
          return {
            className: "bg-background-base",
            textColor: "none",
            iconColor: "background",
            icon: <InfoIcon />,
          };
      }
    },
    [],
  );

  return {
    variant,
    toasts,
    getVariantData,
    addToast,
    toastStyle,
    toastChildStyle,
    toastRef,
  };
};
