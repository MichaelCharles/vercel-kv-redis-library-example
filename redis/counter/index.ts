import { getRedisClient } from "..";

const COUNTER_NAMESPACE = "counter";

export const incrementCount = async (
  increment: number = 1
): Promise<number> => {
  const client = getRedisClient();
  try {
    const newCount = await client.incrBy(`${COUNTER_NAMESPACE}`, increment);
    return newCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const decrementCount = async (
  decrement: number = 1
): Promise<number> => {
  const client = getRedisClient();
  try {
    const newCount = await client.decrBy(`${COUNTER_NAMESPACE}`, decrement);
    if (newCount < 0) {
      await client.set(`${COUNTER_NAMESPACE}`, "0");
      return 0;
    }
    return newCount;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getCount = async (): Promise<number> => {
  const client = getRedisClient();
  try {
    const count = await client.get(`${COUNTER_NAMESPACE}`);
    if (count) {
      return parseInt(count);
    }
    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
