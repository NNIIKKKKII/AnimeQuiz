import redis from "../config/redis.js";

await redis.set("hello", "world");
const value = await redis.get("hello");

console.log("Redis says:", value);
process.exit();
