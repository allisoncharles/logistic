import { ReactNode } from "react";
import {
  DeliveryType,
  DeliveriesType,
  DeliveriesTableProp,
} from "./delivery.type";
import { PlanType, PlansType, SlotPropKeyType } from "./plan.type";
import { SlotType } from "./slot.type";

export type {
  ContextProviderPropType,
  DeliveryType,
  DeliveriesType,
  DeliveriesTableProp,
  PlanType,
  PlansType,
  SlotType,
  SlotPropKeyType,
};
// export type DeliveryType = {
//   _id: string;
//   name: string;
//   pick: string;
//   drop: string;
// };

// export type SlotItemType = {
//   _id: string;
//   customer_id: string;
//   name: string;
//   pick: string;
//   drop: string;
// };

// export type SlotDetailType = {
//   0?: SlotItemType;
//   1?: SlotItemType;
//   2?: SlotItemType;
//   3?: SlotItemType;
// };

// export type SlotType = SlotItemType;

// export type SlotsType = SlotDetailType[];

// export type DeliveriesType = DeliveryType[];

// export type DeliveryListPropType = {
//   deliveriesData: DeliveryType[];
// };

type ContextProviderPropType = {
  children: ReactNode;
};
