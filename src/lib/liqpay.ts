/**
 * Liqpay Payment Integration Placeholder
 *
 * To connect the real Liqpay API:
 * 1. Add to .env.local:
 *    LIQPAY_PUBLIC_KEY=your_public_key
 *    LIQPAY_PRIVATE_KEY=your_private_key
 *
 * 2. Generate payment data:
 *    - Build JSON payload with version, public_key, action, amount, currency, description, order_id, result_url, server_url
 *    - Base64-encode the JSON → `data`
 *    - Create signature: Base64(SHA1(PRIVATE_KEY + data + PRIVATE_KEY)) → `signature`
 *
 * 3. POST form to: https://www.liqpay.ua/api/3/checkout
 *    with fields: data, signature
 *
 * See official docs: https://www.liqpay.ua/documentation/api/checkout
 */

import type { LiqpayPaymentParams, LiqpayPaymentResponse } from "@/types";

const LIQPAY_CHECKOUT_URL = "https://www.liqpay.ua/api/3/checkout";

/**
 * Creates Liqpay payment data and signature server-side.
 * Replace this stub with real crypto-based implementation.
 */
export async function createLiqpayPayment(
  params: LiqpayPaymentParams
): Promise<LiqpayPaymentResponse> {
  const publicKey = process.env.LIQPAY_PUBLIC_KEY;
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error(
      "Liqpay keys not configured. Set LIQPAY_PUBLIC_KEY and LIQPAY_PRIVATE_KEY in .env.local"
    );
  }

  // TODO: Replace with real implementation
  // const payloadJson = JSON.stringify({
  //   version: 3,
  //   public_key: publicKey,
  //   action: "pay",
  //   amount: params.amount,
  //   currency: "UAH",
  //   description: params.description,
  //   order_id: params.orderId,
  //   result_url: params.resultUrl,
  //   server_url: params.serverUrl,
  // });
  // const data = Buffer.from(payloadJson).toString("base64");
  // const signStr = privateKey + data + privateKey;
  // const signature = Buffer.from(
  //   require("crypto").createHash("sha1").update(signStr).digest()
  // ).toString("base64");

  // Placeholder response — remove when real keys are configured
  const placeholderData = Buffer.from(
    JSON.stringify({ placeholder: true, amount: params.amount })
  ).toString("base64");

  return {
    data: placeholderData,
    signature: "placeholder_signature",
    checkoutUrl: LIQPAY_CHECKOUT_URL,
  };
}

/**
 * Verifies the Liqpay server callback signature.
 * Returns true if the signature is valid.
 */
export function verifyLiqpayCallback(data: string, signature: string): boolean {
  const privateKey = process.env.LIQPAY_PRIVATE_KEY;
  if (!privateKey) return false;

  // TODO: Replace with real implementation
  // const crypto = require("crypto");
  // const expected = Buffer.from(
  //   crypto.createHash("sha1").update(privateKey + data + privateKey).digest()
  // ).toString("base64");
  // return expected === signature;

  console.warn("Liqpay callback verification is not implemented yet.");
  return false;
}

export { LIQPAY_CHECKOUT_URL };
