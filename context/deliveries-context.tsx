"use client";

import { createContext, useState } from "react";
import { ContextProviderPropType, DeliveriesType } from "../types";

type DeliveriesContextProviderType = {
  readonly deliveries: DeliveriesType | [];
  readonly setDeliveries: (deliveries: DeliveriesType | []) => void;
};

const initialState: DeliveriesContextProviderType = {
  deliveries: [],
  setDeliveries: (deliveries) => null,
};

export const DeliveriesContext =
  createContext<DeliveriesContextProviderType>(initialState);

const DeliveriesContextProvider = ({ children }: ContextProviderPropType) => {
  const [deliveries, setDeliveries] = useState<DeliveriesType | []>([]);

  return (
    <DeliveriesContext.Provider value={{ deliveries, setDeliveries }}>
      {children}
    </DeliveriesContext.Provider>
  );
};

export default DeliveriesContextProvider;
