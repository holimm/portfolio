"use client";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  useMemo,
  type HTMLAttributes,
} from "react";

import { useTabs, type UseTabsProps } from "../utils/useTabs";
import { TabItem } from "./TabItem";
import { useTabsContext } from "../utils/useTabsContext";

export interface TabListData {}

export interface TabListOptions extends UseTabsProps {}

export interface TabListProps
  extends TabListOptions,
    Omit<HTMLAttributes<HTMLDivElement>, keyof UseTabsProps>,
    TabListData {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useTabsContext();
    const childrenArray = Children.toArray(children);
    const Component = "div";

    return (
      <Component
        ref={ref}
        data-comp="tab-list"
        data-variant={ctx.variant}
        className={`${className} ${ctx.tabListStyle()}`}
        {...props}
      >
        {childrenArray.map((child: ReactNode, index: number) => {
          if (isValidElement(child)) {
            return cloneElement<any>(child, { tabKey: index });
          }
          return child;
        })}
      </Component>
    );
  },
);

TabList.displayName = "TabList";
