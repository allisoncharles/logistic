import { PlanType } from "@/types";

export const getPlans = async () => {
  const BASE_URL = process.env.BASE_URI;
  try {
    const res = await fetch(`${BASE_URL}/api/plans`, { cache: "no-store" });
    return await res.json();
  } catch (err) {
    throw err;
  }
};

export const postPlan = async (body: PlanType) => {
  try {
    const res = await fetch(`/api/plans`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return {
      data,
      status: res.status,
    };
  } catch (err) {
    throw err;
  }
};

export const updatePlan = async (body: PlanType) => {
  try {
    const res = await fetch(`/api/plans`, {
      method: "PUT",
      body: JSON.stringify(body),
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return {
      data,
      status: res.status,
    };
  } catch (err) {
    throw err;
  }
};
