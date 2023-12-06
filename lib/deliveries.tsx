export const getDeliveries = async () => {
  const BASE_URL = process.env.BASE_URI;
  try {
    const res = await fetch(`${BASE_URL}/api/deliveries`);
    const deliveries = await res.json();
    return deliveries;
  } catch (err) {
    throw err;
  }
};
