import dbConnect from "../../../utils/mongo";
import Delivery from "../../../models/Delivery";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    try {
      const deliveries = await Delivery.find();
      res.status(200).json(deliveries);
    } catch (err) {
      res.status(500).json(err);
      throw err;
    }
  }

  if (method === "POST") {
    try {
      const body = req.body;
      const newDelivery = new Delivery(body);
      const savedDelivery = await newDelivery.save();
      res.status(200).json(savedDelivery);
    } catch (err) {
      res.status(500).json(err);
      throw err;
    }
  }
}
