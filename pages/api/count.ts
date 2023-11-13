import { getCount } from "@/redis/counter";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const count = await getCount();
    res.status(200).json({ message: "Succes", count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
