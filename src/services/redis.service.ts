import { Redis } from "ioredis";
import config from "../config";

const client = new Redis({
  host: config.redis.host || "localhost",
  port: config.redis.port ? config.redis.port : 6379,
  password: config.redis.pass,
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

// convertObjectIdsToStrings

client.on("error", (error) => {
  console.log("Error in Redis: ", error);
});

const set = async (
  key: string,
  value: string,
  expiration: number | null = null
): Promise<boolean | null> => {
  try {
    if (expiration) {
      await client.set(key, value, "EX", expiration);
    } else {
      await client.set(key, value);
    }
    return true;
  } catch (error) {
    console.log("Error in Redis set: ", error);
    return null;
  }
};

const get = async (key: string): Promise<string | null> => {
  try {
    const value = await client.get(key);
    return value;
  } catch (err) {
    console.log("Error in Redis get: ", err);
    return null;
  }
};

const del = async (key: string): Promise<boolean | null> => {
  try {
    await client.del(key);
    return true;
  } catch (error) {
    console.log("Error in Redis get: ", error);
    return null;
  }
};

const createKey = (table: string, key: string, value: string): string => {
  return `${table}:${key}:${value}`;
};

const close = async () => {
  try {
    await client.quit();
  } catch (error) {
    console.error("Error in Redis close: ", error);
  }
};

export const RedisService = {
  set,
  get,
  del,
  createKey,
  close,
};
