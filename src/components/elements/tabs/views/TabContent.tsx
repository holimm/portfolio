"use client";
import {
  Children,
  forwardRef,
  useMemo,
  useRef,
  type HTMLAttributes,
} from "react";

import { useTabs, type UseTabsProps } from "../utils/useTabs";
import { useTabsContext } from "../utils/useTabsContext";

export interface TabContentData {}

export interface TabContentOptions extends UseTabsProps {}

export interface TabContentProps
  extends TabContentOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseTabsProps>,
    TabContentData {
  tabKey?: number;
}

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, children, tabKey, ...props }, ref) => {
    const ctx = useTabsContext();
    const Component = "div";

    return (
      <Component
        ref={ref}
        data-comp="tab-content"
        data-variant={ctx.variant}
        className={`${className} ${ctx.tabContentStyle()} ${ctx.currentTab === tabKey ? "block" : "hidden"}`}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

TabContent.displayName = "TabContent";
