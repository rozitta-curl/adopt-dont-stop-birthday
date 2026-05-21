import { Redis } from "@upstash/redis";
import type { OrderData } from "@/types";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ORDER_TTL_SECONDS = 86400; // 24 hours

export async function saveOrder(orderId: string, data: OrderData): Promise<void> {
  await redis.set(`order:${orderId}`, data, { ex: ORDER_TTL_SECONDS });
}

export async function getOrder(orderId: string): Promise<OrderData | null> {
  return redis.get<OrderData>(`order:${orderId}`);
}

export async function deleteOrder(orderId: string): Promise<void> {
  await redis.del(`order:${orderId}`);
}
