import { SlotType } from ".";

export type SlotPropKeyType = {
  0?: SlotType;
  1?: SlotType;
  2?: SlotType;
  3?: SlotType;
};

export type UtilType = {
  _id?: string;
  date?: string;
};

export type PlanType = SlotPropKeyType & UtilType;

export type PlansType = PlanType[];
