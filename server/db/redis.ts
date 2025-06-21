import redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

let redisClient: redis | null = null;

if (redisUrl) {
  try {
    redisClient = new redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      connectTimeout: 10000,
    });
    
    redisClient?.on('error', (err) => {
      console.warn('Redis connection error:', err.message);
    });
    
    redisClient?.on('connect', () => {
      console.log('Redis connected successfully');
    });
  } catch (error) {
    console.warn('Failed to initialize Redis:', error);
    redisClient = null;
  }
} else {
  console.warn('REDIS_URL not provided, Redis functionality will be disabled');
}

export default redisClient;
