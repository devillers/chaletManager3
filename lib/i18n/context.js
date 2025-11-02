"use client";

import { createContext, useContext } from "react";

const DictionaryContext = createContext(null);

export function DictionaryProvider({ value, children }) {
  return <DictionaryContext.Provider value={value}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const value = useContext(DictionaryContext);
  if (!value) {
    throw new Error("Dictionary context not found");
  }
  return value;
}
