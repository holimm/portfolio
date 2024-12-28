"use client";
import React from "react";

import { forwardRef, useEffect, useMemo, type HTMLAttributes } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDrawer, type UseDrawerProps } from "../utils/useDrawer";
import { Locale } from "../../../../../i18n.config";
import { fadeVariants, slideToTopVariants } from "@/config/animations";

export interface DrawerData {}

export interface DrawerOptions extends UseDrawerProps {}

export interface DrawerProps
  extends DrawerOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseDrawerProps>,
    DrawerData {
  locale?: Locale;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, children, locale, ...props }, ref) => {
    const { ...context } = useDrawer({ ref, ...props });

    const ctx = useMemo(() => context, [context]);

    useEffect(() => {
      if (ctx.open) {
        if (typeof window !== "undefined" && window.document) {
          document.body.style.overflow = "hidden";
        }
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [ctx.open]);

    return (
      <AnimatePresence>
        {ctx.open && (
          <div
            ref={ctx.drawerRef}
            data-comp="drawer"
            className={`${ctx.drawerStyle()}`}
            data-lenis-prevent="true"
            tabIndex={-1}
            {...props}
          >
            <motion.div
              data-comp="drawer-overlay"
              onClick={() => ctx.onCancel && ctx.onCancel()}
              className={`${ctx.drawerOverlayStyle()}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants()}
            />
            <motion.div
              data-comp="drawer-content"
              className={`${className} ${ctx.drawerContentStyle()}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideToTopVariants(0.4)}
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  },
);

Drawer.displayName = "Drawer";
