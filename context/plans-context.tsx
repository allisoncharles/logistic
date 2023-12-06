"use client";
import { ContextProviderPropType, PlansType } from "@/types";
import { createContext, useState } from "react";

const initialCtx = {
  plans: [],
  setPlans: () => null,
};

type PlansContextType = {
  plans: PlansType;
  setPlans: (plan: PlansType) => void;
};

export const PlansContext = createContext<PlansContextType>(initialCtx);

const PlansContextProvider = ({ children }: ContextProviderPropType) => {
  const [plans, setPlans] = useState<PlansType>([]);

  return (
    <PlansContext.Provider value={{ plans, setPlans }}>
      {children}
    </PlansContext.Provider>
  );
};

export default PlansContextProvider;
