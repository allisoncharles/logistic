import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pick: { type: String, required: true },
    drop: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Delivery ||
  mongoose.model("Delivery", DeliverySchema);
