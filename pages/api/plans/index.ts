import Plan from "@/models/Plan";
import dbConnect from "../../../utils/mongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const plans = await Plan.find();
      res.status(200).json(plans);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const body = req.body;
      const newPlan = new Plan(body);
      const savedPlan = await newPlan.save();
      res.status(201).json(savedPlan);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "PUT") {
    try {
      const body = req.body
      const updatedPlan = await Plan.findOneAndReplace(
        { _id: body._id },
        body,
        {
          new: true,
        }
      );

      res.status(200).json(updatedPlan);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
