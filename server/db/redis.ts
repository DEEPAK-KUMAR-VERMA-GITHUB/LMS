import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("Redis URL or token is not defined");
}

const redisClient = new redis(redisUrl);
export default redisClient;
