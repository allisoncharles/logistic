"use client";

import { ContextProviderPropType } from "@/types";
import { createContext, useState } from "react";

type SlotCountContextType = {
  freeSlots: number[] | [];
  setFreeSlots: (freeSlots: number[]) => void;
};
const initialState = {
  freeSlots: [],
  setFreeSlots: () => null,
};

export const SlotCountContext =
  createContext<SlotCountContextType>(initialState);

const SlotCountContextProvider = ({ children }: ContextProviderPropType) => {
  const [freeSlots, setFreeSlots] = useState<number[]>([]);

  return (
    <SlotCountContext.Provider value={{ freeSlots, setFreeSlots }}>
      {children}
    </SlotCountContext.Provider>
  );
};

export default SlotCountContextProvider;
