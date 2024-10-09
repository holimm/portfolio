"use client";
import { createContext, useContext } from "react";

import { type UseSectionReturn } from "./useSection";

const SectionContext = createContext<UseSectionReturn | undefined>(undefined);

const useSectionContext = () => {
  const context = useContext(SectionContext);

  if (!context) {
    throw new Error("Missing SectionProvider");
  }
  return context;
};

const SectionProvider = SectionContext.Provider;

export { SectionProvider, useSectionContext };
