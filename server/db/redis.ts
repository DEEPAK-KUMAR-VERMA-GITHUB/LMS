import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error("Redis URL or token is not defined");
}

const redisClient = new redis({
  host: process.env.UPSTASH_REDIS_REST_URL,
  port: parseInt(process.env.UPSTASH_REDIS_REST_TOKEN || "6379"),
});

export default redisClient;
