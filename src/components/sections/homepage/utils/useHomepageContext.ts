"use client";
import { createContext, useContext } from "react";

import { type UseHomepageReturn } from "./useHomepage";

const HomepageContext = createContext<UseHomepageReturn | undefined>(undefined);

const useHomepageContext = () => {
  const context = useContext(HomepageContext);

  if (!context) {
    throw new Error("Missing HomepageProvider");
  }
  return context;
};

const HomepageProvider = HomepageContext.Provider;

export { HomepageProvider, useHomepageContext };
