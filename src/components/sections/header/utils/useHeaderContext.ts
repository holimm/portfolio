"use client";
import { createContext, useContext } from "react";

import { type UseHeaderReturn } from "./useHeader";

const HeaderContext = createContext<UseHeaderReturn | undefined>(undefined);

const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error("Missing HeaderProvider");
  }
  return context;
};

const HeaderProvider = HeaderContext.Provider;

export { HeaderProvider, useHeaderContext };
