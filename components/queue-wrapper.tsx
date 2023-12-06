"use client";
import { useContext, useEffect } from "react";
import styles from "../styles/queue-wrapper.module.css";
import Deliveries from "./deliveries";
import Planner from "./planner";
import { DeliveriesContext } from "@/context/deliveries-context";
import { DeliveriesType, PlansType } from "@/types";
import { PlansContext } from "@/context/plans-context";

type QueueWrapperProp = {
  deliveries: DeliveriesType;
  plans: PlansType;
};

const QueueWrapper = ({ deliveries, plans }: QueueWrapperProp) => {
  const { setDeliveries } = useContext(DeliveriesContext);
  const { setPlans } = useContext(PlansContext);

  useEffect(() => {
    setDeliveries(deliveries);
    setPlans(plans);
  }, []);

  return (
    <section className={styles.queueWrapper}>
      <Deliveries />
      <Planner />
    </section>
  );
};

export default QueueWrapper;
