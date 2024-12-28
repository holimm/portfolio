"use client";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useRef,
  type HTMLAttributes,
} from "react";

import { useTabs, type UseTabsProps } from "../utils/useTabs";
import { TabContent } from "./TabContent";
import { useTabsContext } from "../utils/useTabsContext";

export interface TabPanelsData {}

export interface TabPanelsOptions extends UseTabsProps {}

export interface TabPanelsProps
  extends TabPanelsOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseTabsProps>,
    TabPanelsData {}

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const childrenArray = Children.toArray(children);
    const Component = "div";

    return (
      <Component
        ref={ref}
        data-comp="tab-panels"
        data-variant={ctx.variant}
        className={`${className} ${ctx.tabPanelsStyle()}`}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement<any>(child, { tabKey: index });
          }
          return child;
        })}
      </Component>
    );
  },
);

TabPanels.displayName = "TabPanels";
