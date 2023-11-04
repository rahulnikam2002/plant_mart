import { redis } from "@/lib/redis/connect.redis.js";

export const checkInRedisCache = async (key) => {
  try {
    const isInRedis = await redis.get(key);
    if (isInRedis) {
      return { isInRedis: true, value: isInRedis, source: "Redis" };
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
