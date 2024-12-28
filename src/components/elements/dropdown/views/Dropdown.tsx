"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useDropdown, type UseDropdownProps } from "../utils/useDropdown";
import { DropdownProvider } from "../utils/useDropdownContext";
import { AnimatePresence } from "motion/react";

export interface DropdownData {}

export interface DropdownOptions extends UseDropdownProps {}

export interface DropdownProps
  extends DropdownOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseDropdownProps>,
    DropdownData {
  asChild?: boolean;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, title, ...props }, ref) => {
    const { ...context } = useDropdown({
      ref,
      ...props,
    });

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <DropdownProvider value={ctx}>
        <Component
          title={title}
          ref={ctx.dropdownRef}
          data-comp="dropdown"
          aria-label={title}
          data-variant={ctx.variant}
          className={`${className} ${ctx.dropdownStyle()}`}
          onBlur={(e) => ctx.handleDropdownBlur(e)}
          tabIndex={0}
          {...props}
        >
          {children}
        </Component>
      </DropdownProvider>
    );
  },
);

Dropdown.displayName = "Dropdown";
