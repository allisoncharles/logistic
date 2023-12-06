"use client";
import styles from "../styles/delivery-table.module.css";
import { DeliveriesTableProp, DeliveryType } from "../types";
import { DragEvent, useContext } from "react";
import { SlotCountContext } from "@/context/slot-count-context";
import { AddEventContext } from "@/context/add-event-context";
import { PlanContext } from "@/context/plan-context";

const DeliveryTable = ({ deliveriesData }: DeliveriesTableProp) => {
  const { freeSlots, setFreeSlots } = useContext(SlotCountContext);
  const { setAddSlot } = useContext(AddEventContext);
  const { plan, setPlan } = useContext(PlanContext);

  const handleOnDrag = (ev: DragEvent, delivery: DeliveryType) => {
    const { _id, name, drop, pick } = delivery;
    ev.dataTransfer.setData(
      "slot",
      JSON.stringify({ customer_id: _id, _id, name, drop, pick })
    );
  };

  const handleAddToSlot = (delivery: DeliveryType) => {
    if (freeSlots.length > 0) {
      const idx = freeSlots[0];
      setPlan({
        ...plan,
        [idx]: {
          customer_id: delivery._id,
          name: delivery.name,
          _id: delivery._id,
          drop: delivery.drop,
          pick: delivery.pick,
        },
      });
      setFreeSlots(freeSlots.filter((freeSlot) => freeSlot != idx));
      setAddSlot(true);
    }
  };

  return (
    <>
      <table className={styles.deliveries__table}>
        <thead className={styles.deliveries__table__header}>
          <tr>
            <th className={styles.deliveries__table__header__column}> </th>
            <th className={styles.deliveries__table__header__column}>Id</th>
            <th className={styles.deliveries__table__header__column}>Name</th>
            <th className={styles.deliveries__table__header__column}>
              Pick up Loc.
            </th>
            <th className={styles.deliveries__table__header__column}>
              Drop off Loc.
            </th>
          </tr>
        </thead>
        <tbody className={styles.deliveries__table__body}>
          {deliveriesData?.map((delivery) => (
            <tr
              key={delivery?._id}
              className={styles.deliveries__table__body__row}
              draggable
              onDragStart={(e) => handleOnDrag(e, delivery)}
            >
              <td
                className={`${styles.deliveries__table__body__column} ${styles.deliveries__add}`}
                onClick={() => handleAddToSlot(delivery)}
              >
                +
              </td>
              <td className={styles.deliveries__table__body__column}>
                {delivery?._id?.slice(0, 3)}...
              </td>

              <td className={styles.deliveries__table__body__column}>
                {delivery?.name}
              </td>
              <td className={styles.deliveries__table__body__column}>
                {delivery?.pick}
              </td>
              <td className={styles.deliveries__table__body__column}>
                {delivery?.drop}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DeliveryTable;
