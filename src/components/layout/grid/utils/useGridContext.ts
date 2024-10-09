"use client";
import { createContext, useContext } from "react";

import { type UseGridReturn } from "./useGrid";

const GridContext = createContext<UseGridReturn | undefined>(undefined);

const useGridContext = () => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("Missing GridProvider");
  }
  return context;
};

const GridProvider = GridContext.Provider;

export { GridProvider, useGridContext };
