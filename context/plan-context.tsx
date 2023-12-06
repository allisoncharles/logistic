"use client";
import { ContextProviderPropType, PlanType } from "@/types";
import { createContext, useState } from "react";

const initialCtx = {
  plan: null,
  setPlan: () => null,
};

type PlanContextType = {
  plan: PlanType | null;
  setPlan: (plan: PlanType | null) => void;
};

export const PlanContext = createContext<PlanContextType>(initialCtx);

const PlanContextProvider = ({ children }: ContextProviderPropType) => {
  const [plan, setPlan] = useState<PlanType | null>(null);

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanContextProvider;
