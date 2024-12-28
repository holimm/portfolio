"use client";
import { forwardRef, useMemo, type HTMLAttributes } from "react";

import { useTabs, type UseTabsProps } from "../utils/useTabs";
import { useTabsContext } from "../utils/useTabsContext";

export interface TabItemData {}

export interface TabItemOptions extends UseTabsProps {}

export interface TabItemProps
  extends TabItemOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseTabsProps>,
    TabItemData {
  tabKey?: number;
}

export const TabItem = forwardRef<HTMLDivElement, TabItemProps>(
  ({ className, children, tabKey, ...props }, ref) => {
    const ctx = useTabsContext();
    const Component = "div";

    return (
      <Component
        ref={ref}
        data-comp="tab-item"
        data-variant={ctx.variant}
        onClick={() => {
          ctx.setCurrentTab(tabKey);
        }}
        className={`${className} ${ctx.tabItemStyle()} ${ctx.currentTab === tabKey ? "border-b-2 border-solid border-background-dark" : ""}`}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

TabItem.displayName = "TabItem";
