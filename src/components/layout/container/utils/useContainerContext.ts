"use client";
import { createContext, useContext } from "react";

import { type UseContainerReturn } from "./useContainer";

const ContainerContext = createContext<UseContainerReturn | undefined>(
  undefined,
);

const useContainerContext = () => {
  const context = useContext(ContainerContext);

  if (!context) {
    throw new Error("Missing ContainerProvider");
  }
  return context;
};

const ContainerProvider = ContainerContext.Provider;

export { ContainerProvider, useContainerContext };
