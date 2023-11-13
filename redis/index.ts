import { createClient, RedisClientType } from "redis";

const REDIS_CONFIG = {
  url: process.env.REDIS_URL,
  socket: {
    tls: true,
  },
};

class RedisService {
  private static instance: RedisService;
  private client: RedisClientType;

  private constructor() {
    this.client = createClient(REDIS_CONFIG);
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.client.connect();
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  getClient() {
    return this.client;
  }
}

export const getRedisClient = () => RedisService.getInstance().getClient();
