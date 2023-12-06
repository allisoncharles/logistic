export type DeliveryType = {
  _id: string;
  name: string;
  pick: string;
  drop: string;
};

export type DeliveriesType = DeliveryType[];

export type DeliveriesTableProp = {
  deliveriesData: DeliveriesType;
};
