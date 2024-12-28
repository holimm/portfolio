import {
  cloneElement,
  isValidElement,
  type ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";

import { tabsVariants, type TabsVariantProps } from "../styles/tabs.config";

export interface TabsProps extends TabsVariantProps {
  ref?: React.Ref<HTMLDivElement> | undefined;
}
export type UseTabsProps = TabsProps &
  Omit<TabsVariantProps, keyof TabsVariantProps>;

export const useTabs = (props: UseTabsProps) => {
  const { ref: tabsRef, variant } = props;
  const [currentTab, setCurrentTab] = useState<number | undefined>(0);

  const {
    root: tabsStyle,
    tabList: tabListStyle,
    tabItem: tabItemStyle,
    tabPanels: tabPanelsStyle,
    tabContent: tabContentStyle,
  } = useMemo(
    () =>
      tabsVariants({
        variant,
      }),
    [variant],
  );

  return {
    variant,
    tabsStyle,
    tabListStyle,
    tabItemStyle,
    tabPanelsStyle,
    tabContentStyle,
    currentTab,
    setCurrentTab,
    tabsRef,
  };
};

export type UseTabsReturn = ReturnType<typeof useTabs>;
