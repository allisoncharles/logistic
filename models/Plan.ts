import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  name: { type: String, required: true },
  pick: { type: String, required: true },
  drop: { type: String, required: true },
});

const PlanSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    0: { type: SlotSchema },
    1: { type: SlotSchema },
    2: { type: SlotSchema },
    3: { type: SlotSchema },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
