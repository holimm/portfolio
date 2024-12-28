"use client";
import React, { forwardRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useToast, type UseToastProps } from "../utils/useToast";
import { Locale } from "../../../../../i18n.config";
import { fadeVariants } from "@/config/animations";
import { Heading, Text } from "../../typography";
import { Flex } from "@/components/layout/flex";
import { Icon } from "../../icon";

export interface ToastOptions extends UseToastProps {}

export interface ToastProps
  extends ToastOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof UseToastProps> {
  locale?: Locale;
}

let openToast: (variant: VariantTypes, content: ToastContentType) => void;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, locale, ...props }, ref) => {
    const ctx = useToast({ ref, ...props });

    openToast = (variant: VariantTypes, content: ToastContentType) => {
      ctx.addToast(variant, content);
    };

    return (
      <div
        ref={ctx.toastRef}
        className={`${className} ${ctx.toastStyle()}`}
        {...props}
      >
        <AnimatePresence>
          {ctx.toasts.map((toast) => {
            const variantData = ctx.getVariantData(toast.variant);
            return (
              <motion.div
                key={toast.id}
                className={`${ctx.toastChildStyle()} ${variantData.className}`}
                variants={fadeVariants()}
                initial="hidden"
                animate="visible"
                exit="exit"
                data-comp="toast"
                style={{
                  transitionDuration: `${toast.duration}ms`,
                }}
              >
                <Flex>
                  <Flex justify="center">
                    <Icon
                      size="xl"
                      color={variantData.iconColor}
                      contrast={
                        toast.variant === "default" ? "highest" : "medium"
                      }
                      icon={variantData.icon}
                    />
                  </Flex>
                  <Flex layout="col" gap="3xs">
                    <Heading
                      ashtml="h6"
                      weight="semibold"
                      letterSpacing="tight"
                    >
                      {toast.content.title}
                    </Heading>
                    <Text
                      color={variantData.textColor}
                      contrast={
                        toast.variant === "default" ? "medium" : "highest"
                      }
                      size="sm"
                      letterSpacing="tight"
                    >
                      {toast.content.message}
                    </Text>
                  </Flex>
                </Flex>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  },
);

export { openToast };
Toast.displayName = "Toast";
