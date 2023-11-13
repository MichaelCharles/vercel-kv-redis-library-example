import { incrementCount } from "@/redis/counter";
import { NextApiRequest, NextApiResponse } from "next";

export default async function increment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await incrementCount();
    res.status(200).json({ message: "Incremented count" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
