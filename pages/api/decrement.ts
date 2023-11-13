import { decrementCount } from "@/redis/counter";
import { NextApiRequest, NextApiResponse } from "next";

export default async function decrement(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await decrementCount();
    res.status(200).json({ message: "Decremented count" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
