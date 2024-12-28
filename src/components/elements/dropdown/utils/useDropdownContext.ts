"use client";
import { createContext, useContext } from "react";

import { type UseDropdownReturn } from "./useDropdown";

const DropdownContext = createContext<UseDropdownReturn | undefined>(undefined);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Missing DropdownProvider");
  }
  return context;
};

const DropdownProvider = DropdownContext.Provider;

export { DropdownProvider, useDropdownContext };
