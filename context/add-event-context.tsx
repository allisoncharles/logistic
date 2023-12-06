"use client";
import { ContextProviderPropType } from "@/types";
import { createContext, useState } from "react";

type AddEventContextType = {
  addSlot: boolean;
  setAddSlot: (addSlot: boolean) => void;
};

const initialState = {
  addSlot: false,
  setAddSlot: () => null,
};

export const AddEventContext = createContext<AddEventContextType>(initialState);

const AddEventContextProvider = ({ children }: ContextProviderPropType) => {
  const [addSlot, setAddSlot] = useState<boolean>(false);
  return (
    <AddEventContext.Provider value={{ addSlot, setAddSlot }}>
      {children}
    </AddEventContext.Provider>
  );
};

export default AddEventContextProvider;
