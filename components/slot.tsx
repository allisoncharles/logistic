"use client";
import styles from "../styles/slot.module.css";
import { useState, DragEvent, useContext, useEffect } from "react";
import { SlotType } from "../types";
import { DeliveriesContext } from "@/context/deliveries-context";
import { SlotCountContext } from "@/context/slot-count-context";
import { AddEventContext } from "@/context/add-event-context";
import { PlanContext } from "@/context/plan-context";

type SlotPropType = {
  idx: number;
};

const Slot = ({ idx }: SlotPropType) => {
  const [slot, setSlot] = useState<SlotType | null>(null);
  const { deliveries, setDeliveries } = useContext(DeliveriesContext);
  const { freeSlots, setFreeSlots } = useContext(SlotCountContext);
  const { plan, setPlan } = useContext(PlanContext);
  const { addSlot, setAddSlot } = useContext(AddEventContext);

  useEffect(() => {
    // update the slot from db, if it exists
    if (!slot && plan && !addSlot) {
      const slotItem: SlotType | null = plan[idx as keyof typeof slot] || null;
      setSlot(slotItem);

      // // remove slotted deliveries from delivery list.
      const slottedDelivery: string[] = [];

      Object.values(plan).forEach((slotItem) => {
        if (typeof slotItem == "object") {
          slottedDelivery.push(slotItem?.customer_id);
        }
      });

      const unSlottedDeliveries = deliveries.filter(
        (delivery) => !slottedDelivery.includes(delivery._id)
      );

      setDeliveries(unSlottedDeliveries);
    }
  }, [plan]);

  // keep track of the idx of the empty slot.
  useEffect(() => {
    if (plan) {
      if (!plan[idx as keyof typeof plan]) {
        setFreeSlots([...freeSlots, idx]);
      }
    }
  }, []);

  // Deleting the slots when the user presses clear button.
  useEffect(() => {
    if (slot && !plan) {
      setSlot(null);
      setFreeSlots([0, 1, 2, 3]);
    }
  }, [plan]);

  // maintaining a full slot when plan is empty
  useEffect(() => {
    if (!slot && !plan) {
      setFreeSlots([0, 1, 2, 3]);
    }
  }, []);

  useEffect(() => {
    // update the slot when the user presses the + button
    if (!slot && plan && addSlot) {
      if (plan[idx as keyof typeof slot]) {
        const slotItem: SlotType = plan[idx as keyof typeof slot];

        setSlot(slotItem);

        const modSlotData = deliveries.filter(
          (delivery) => delivery._id != slotItem?.customer_id
        );

        setAddSlot(false);

        setDeliveries(modSlotData);
      }
    }
  }, [plan]);

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDrop = (ev: DragEvent) => {
    const slotDataString = ev.dataTransfer.getData("slot");
    const slotData: SlotType = JSON.parse(slotDataString);
    const modSlotData = deliveries.filter(
      (delivery) => delivery._id !== slotData.customer_id
    );

    if (slot) {
      setDeliveries([...modSlotData, slot]);
    } else {
      setDeliveries(modSlotData);
    }
    setSlot(slotData);
    setPlan({ ...plan, [idx]: slotData });
    setFreeSlots(freeSlots.filter((freeSlot) => freeSlot != idx));
  };

  return (
    <div
      className={
        slot ? `${styles.slot}` : `${styles.slot} ${styles.slot__empty}`
      }
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      {slot ? (
        <div className={styles.slot__data}>
          <p className={styles.slot__bg__text__id}>
            {slot?.customer_id?.slice(0, 3)}...
          </p>
          <p className={styles.slot__bg__text}>{slot?.name}</p>
          <p className={styles.slot__sm__text}>{slot?.pick}</p>
          <p className={styles.slot__sm__text}>{slot?.drop}</p>
        </div>
      ) : (
        <p className={styles.slot__empty__text}>Slot {+idx + 1}</p>
      )}
    </div>
  );
};

export default Slot;
