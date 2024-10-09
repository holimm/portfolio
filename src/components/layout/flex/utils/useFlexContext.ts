"use client";
import { createContext, useContext } from "react";

import { type UseFlexReturn } from "./useFlex";

const FlexContext = createContext<UseFlexReturn | undefined>(undefined);

const useFlexContext = () => {
  const context = useContext(FlexContext);

  if (!context) {
    throw new Error("Missing FlexProvider");
  }
  return context;
};

const FlexProvider = FlexContext.Provider;

export { FlexProvider, useFlexContext };
