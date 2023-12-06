"use client";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/planner.module.css";
import Slot from "./slot";
import { DeliveriesContext } from "@/context/deliveries-context";
import { PlansContext } from "@/context/plans-context";
import { PlanContext } from "@/context/plan-context";
import { postPlan, updatePlan } from "@/lib/plans";
import { PlanType, PlansType } from "@/types";

const getNextSevenDays = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  date.setHours(1, 0, 0);
  return date;
};

const Planner = () => {
  const slots = Array(4).fill("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [date, setDate] = useState<Date>(getNextSevenDays());

  const { plans, setPlans } = useContext(PlansContext);
  const { plan, setPlan } = useContext(PlanContext);
  const { deliveries, setDeliveries } = useContext(DeliveriesContext);

  useEffect(() => {
    if (plans.length > 0) {
      setPlan(
        plans.filter((plan) => {
          if (plan.date) {
            const planDate = new Date(plan?.date);
            return planDate.toDateString() == date.toDateString();
          }
        })[0]
      );
    }
  }, [plans]);

  const handleUpdate = async () => {
    setError(false);
    setSuccess(false);
    setLoading(true);
    const body: PlanType = {
      ...plan,
      _id: plan?._id || id,
      date: date.toString(),
    };

    try {
      const res = await updatePlan(body);
      if (res.status == 200) {
        const newPlans: PlansType = plans.filter(
          (plan) => plan._id != res.data._id
        );
        setPlans([...newPlans, res.data]);
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      throw err;
    }
  };

  const handleSave = async () => {
    setError(false);
    setSuccess(false);
    setLoading(true);
    const body: PlanType = {
      ...plan,
      date: date.toString(),
    };
    try {
      const res = await postPlan(body);

      if (res.status == 201) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      throw err;
    }
  };

  const handleClear = () => {
    if (plan) {
      const slottedDelivery: any = [];
      Object.values(plan).forEach((slot) => {
        if (typeof slot == "object") {
          slottedDelivery.push(slot);
        }
      });

      if (plan._id) {
        setId(plan._id);
      }

      setDeliveries([...deliveries, ...slottedDelivery]);
      setPlan(null);
    }
  };

  return (
    <div className={styles.planner}>
      <div className={styles.planner__header}>
        <h3 className={styles.planner__title}>Planner</h3>
        <div className={styles.planner__btn__wrapper}>
          {success && (
            <div
              className={`${styles.planner__info} ${styles.planner__info__success}`}
            >
              <p>Action Completed</p>
              <p
                className={styles.planner__info__x}
                onClick={() => setSuccess(false)}
              >
                <svg className={styles.planner__close}>
                  <use xlinkHref="/close.svg#close"></use>
                </svg>
              </p>
            </div>
          )}

          {error && (
            <div
              className={`${styles.planner__info} ${styles.planner__info__error}`}
            >
              <p>Action Failed</p>
              <p
                className={styles.planner__info__x}
                onClick={() => setError(false)}
              >
                <svg className={styles.planner__close}>
                  <use xlinkHref="/close.svg#close"></use>
                </svg>
              </p>
            </div>
          )}

          <button
            className={`${styles.planner__clear} ${styles.planner__btn}`}
            onClick={handleClear}
          >
            Clear
          </button>
          {plan?.date || id ? (
            <button
              onClick={handleUpdate}
              className={`${styles.planner__save} ${styles.planner__btn}`}
            >
              {loading ? (
                <div className={styles.planner__loading}></div>
              ) : (
                "Update"
              )}
            </button>
          ) : (
            <button
              onClick={handleSave}
              className={`${styles.planner__save} ${styles.planner__btn}`}
            >
              {loading ? (
                <div className={styles.planner__loading}></div>
              ) : (
                "Save"
              )}
            </button>
          )}
        </div>
      </div>
      <p className={styles.planner__date}>{date.toDateString()}.</p>
      <div className={styles.planner__slot__wrapper}>
        {slots.map((_, idx) => (
          <Slot key={idx} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default Planner;
