"use client";
import React from "react";

import { forwardRef, useEffect, useMemo, type HTMLAttributes } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useModal, type UseModalProps } from "../utils/useModal";
import { Locale } from "../../../../../i18n.config";
import { fadeVariants, slideToTopVariants } from "@/config/animations";

export interface ModalData {}

export interface ModalOptions extends UseModalProps {}

export interface ModalProps
  extends ModalOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseModalProps>,
    ModalData {
  locale?: Locale;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, children, locale, ...props }, ref) => {
    const { ...context } = useModal({ ref, ...props });

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
            ref={ctx.modalRef}
            data-comp="modal"
            className={`${ctx.modalStyle()}`}
            data-lenis-prevent="true"
            tabIndex={-1}
            {...props}
          >
            <motion.div
              data-comp="modal-overlay"
              onClick={() => ctx.onCancel && ctx.onCancel()}
              className={`${ctx.modalOverlayStyle()}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeVariants()}
            />
            <motion.div
              data-comp="modal-content"
              className={`${className} ${ctx.modalContentStyle()}`}
              tabIndex={-1}
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

Modal.displayName = "Modal";
