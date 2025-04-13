import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: config.env.Upstash.redisUrl,
    token: config.env.Upstash.redisToken
})

export default redis