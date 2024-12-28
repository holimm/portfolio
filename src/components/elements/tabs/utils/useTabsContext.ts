"use client";
import { createContext, useContext } from "react";

import { type UseTabsReturn } from "./useTabs";

const TabsContext = createContext<UseTabsReturn | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Missing TabsProvider");
  }
  return context;
};

const TabsProvider = TabsContext.Provider;

export { TabsProvider, useTabsContext };
