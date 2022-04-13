import { createContext, useContext } from "react";

export const MemoryContext = createContext();

export function useMemory() {
  return useContext(MemoryContext);
}
