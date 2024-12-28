"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";
import { motion } from "motion/react";
import { type UseDropdownProps } from "../utils/useDropdown";
import { useDropdownContext } from "../utils/useDropdownContext";
import { Flex } from "@/components/layout/flex";
import { ArrowHeadDownIcon } from "../../icon/icons";
import { Icon } from "../../icon";
import { rotateVariants } from "@/config/animations";

export interface DropdownHeaderData {}

export interface DropdownHeaderOptions extends UseDropdownProps {}

export interface DropdownHeaderProps
  extends DropdownHeaderOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseDropdownProps>,
    DropdownHeaderData {
  asChild?: boolean;
}

export const DropdownHeader = forwardRef<HTMLDivElement, DropdownHeaderProps>(
  ({ className, children, title, ...props }, ref) => {
    const { ...context } = useDropdownContext();

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <Component
        ref={ctx.dropdownRef}
        data-comp="dropdown-header"
        aria-label={title}
        data-variant={ctx.variant}
        className={`${className} ${ctx.dropdownHeaderStyle()}`}
        {...props}
      >
        <Flex justify="start" gap="lg">
          {children}
          <Flex justify="center" align="center" gap="none">
            <motion.div
              initial={{ rotate: ctx.open ? 0 : -180 }}
              animate={{
                rotate: ctx.open ? -180 : 0,
                transition: { duration: 0.1 },
              }}
            >
              <Icon
                size="md"
                color="background"
                contrast="highest"
                onClick={() => ctx.handleToggleDropdown(!ctx.open)}
                icon={<ArrowHeadDownIcon />}
              />
            </motion.div>
          </Flex>
        </Flex>
      </Component>
    );
  },
);

DropdownHeader.displayName = "DropdownHeader";
