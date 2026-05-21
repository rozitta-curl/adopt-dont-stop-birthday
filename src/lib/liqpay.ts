import crypto from "crypto";
import type { LiqpayPaymentParams, LiqpayPaymentResponse } from "@/types";

const LIQPAY_CHECKOUT_URL = "https://www.liqpay.ua/api/3/checkout";

function sha1Base64(str: string): string {
  return crypto.createHash("sha1").update(str).digest("base64");
}

export function createLiqpayPayment(
  params: LiqpayPaymentParams
): LiqpayPaymentResponse {
  const publicKey = process.env.LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error(
      "Liqpay keys not configured. Set LIQPAY_PUBLIC_KEY and LIQPAY_PRIVATE_KEY."
    );
  }

  const payload: Record<string, unknown> = {
    version: 3,
    public_key: publicKey,
    amount: params.amount,
    currency: "UAH",
    description: params.description,
    order_id: params.orderId,
    result_url: params.resultUrl,
    server_url: params.serverUrl,
  };

  if (params.paymentType === "monthly") {
    payload.action = "subscribe";
    payload.subscribe_periodicity = "month";
    payload.subscribe_date_start = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  } else {
    payload.action = "pay";
  }

  const data = Buffer.from(JSON.stringify(payload)).toString("base64");
  const signature = sha1Base64(privateKey + data + privateKey);

  return { data, signature, checkoutUrl: LIQPAY_CHECKOUT_URL };
}

export function verifyLiqpayCallback(data: string, signature: string): boolean {
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  if (!privateKey) return false;

  const expected = sha1Base64(privateKey + data + privateKey);
  return expected === signature;
}

export { LIQPAY_CHECKOUT_URL };
