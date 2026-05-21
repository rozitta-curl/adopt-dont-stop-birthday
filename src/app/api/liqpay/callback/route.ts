import { NextRequest, NextResponse } from "next/server";
import { verifyLiqpayCallback } from "@/lib/liqpay";
import { getOrder, deleteOrder } from "@/lib/redis";
import { insertSubscription } from "@/lib/neon";
import { notifyAboutNew } from "@/lib/email";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = formData.get("data") as string | null;
  const signature = formData.get("signature") as string | null;

  if (!data || !signature) {
    return NextResponse.json({ error: "Missing data or signature" }, { status: 400 });
  }

  // Step 1: Verify signature — reject in production if invalid
  const isValid = verifyLiqpayCallback(data, signature);
  if (!isValid) {
    console.error("[liqpay/callback] Invalid signature — rejecting callback.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Step 2: Decode payment data
  let paymentData: Record<string, unknown>;
  try {
    paymentData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  } catch {
    return NextResponse.json({ error: "Invalid data payload" }, { status: 400 });
  }

  const status = paymentData.status as string | undefined;
  const orderId = paymentData.order_id as string | undefined;
  const paymentId = paymentData.payment_id != null
    ? String(paymentData.payment_id)
    : null;

  if (!orderId) {
    return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
  }

  // Step 3: Retrieve order context from Redis
  const orderData = await getOrder(orderId);
  if (!orderData) {
    console.warn("[liqpay/callback] Order not found in Redis for orderId:", orderId);
    // Still return 200 so LiqPay doesn't retry indefinitely
    return NextResponse.json({ received: true });
  }

  // Step 4: Handle successful payment
  if (status === "success" || status === "sandbox") {
    // Save subscription to NeonDB
    if (orderData.paymentType === "monthly") {
      try {
        await insertSubscription({
          email: orderData.email,
          amount: orderData.amount,
          orderId,
          paymentId,
          status: status ?? "unknown",
          liqpayData: paymentData,
        });
      } catch (err) {
        console.error("[liqpay/callback] Failed to insert subscription:", err);
      }
    }

    // Send thank-you email
    try {
      await notifyAboutNew(orderData, paymentData);
    } catch (err) {
      console.error("[liqpay/callback] Failed to send email:", err);
    }
  }

  // Step 5: Clean up Redis entry
  await deleteOrder(orderId);

  return NextResponse.json({ received: true });
}
