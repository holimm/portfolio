"use client";
import { AnimatePresence, motion } from "motion/react";
import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { type UseDropdownProps } from "../utils/useDropdown";
import { useDropdownContext } from "../utils/useDropdownContext";
import { fadeVariants } from "@/config/animations";

export interface DropdownContentData {}

export interface DropdownContentOptions extends UseDropdownProps {}

export interface DropdownContentProps
  extends DropdownContentOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseDropdownProps>,
    DropdownContentData {
  asChild?: boolean;
}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, title, ...props }, ref) => {
    const { ...context } = useDropdownContext();

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <AnimatePresence>
        {ctx.open ? (
          <motion.div
            variants={fadeVariants(0.1)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Component
              ref={ctx.dropdownRef}
              data-comp="dropdown-content"
              aria-label={title}
              data-variant={ctx.variant}
              className={`${className} ${ctx.dropdownContentStyle()}`}
              {...props}
            >
              {children}
            </Component>
          </motion.div>
        ) : null}
      </AnimatePresence>
    );
  },
);

DropdownContent.displayName = "DropdownContent";
