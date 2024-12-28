"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useTabs, type UseTabsProps } from "../utils/useTabs";
import { TabsProvider } from "../utils/useTabsContext";

export interface TabsData {}

export interface TabsOptions extends UseTabsProps {}

export interface TabsProps
  extends TabsOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseTabsProps>,
    TabsData {}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, children, ...props }, ref) => {
    const { ...context } = useTabs({ ref, ...props });

    const ctx = useMemo(() => context, [context]);
    const Component = "div";

    return (
      <TabsProvider value={ctx}>
        <Component
          ref={ctx.tabsRef}
          data-comp="tabs"
          data-variant={ctx.variant}
          className={`${className} ${ctx.tabsStyle()}`}
          {...props}
        >
          {children}
        </Component>
      </TabsProvider>
    );
  },
);

Tabs.displayName = "Tabs";
