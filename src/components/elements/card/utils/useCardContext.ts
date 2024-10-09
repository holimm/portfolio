"use client";
import { createContext, useContext } from "react";
import { type UseCardReturn } from "./useCard";

const CardContext = createContext<UseCardReturn | undefined>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("Missing CardProvider");
  }
  return context;
};

const CardProvider = CardContext.Provider;

export { CardProvider, useCardContext };
