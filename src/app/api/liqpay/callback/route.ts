import { NextRequest, NextResponse } from "next/server";
import { verifyLiqpayCallback } from "@/lib/liqpay";
import { sendDonationThankYouEmail } from "@/lib/email";

/**
 * POST /api/liqpay/callback
 *
 * Liqpay server-to-server payment result callback.
 * Liqpay sends this after every payment (success or failure).
 *
 * Body (application/x-www-form-urlencoded):
 *   data      – Base64-encoded JSON with payment result
 *   signature – SHA1 signature to verify authenticity
 *
 * Architecture:
 * 1. Verify the signature using LIQPAY_PRIVATE_KEY.
 * 2. Decode the `data` field to get payment status, order_id, amount, etc.
 * 3. If status === "success" or "sandbox":
 *    a. Retrieve the user email from the order (stored in payment description
 *       or a DB/KV store keyed by order_id — implement as needed).
 *    b. Call sendDonationThankYouEmail() with the donor's details.
 *
 * TODO:
 * - Implement order storage (e.g., Redis, Vercel KV, or DB) to persist
 *   user email between create-payment and callback.
 * - Replace verifyLiqpayCallback stub with real crypto verification.
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = formData.get("data") as string | null;
  const signature = formData.get("signature") as string | null;

  if (!data || !signature) {
    return NextResponse.json(
      { error: "Missing data or signature" },
      { status: 400 }
    );
  }

  // Step 1: Verify signature
  const isValid = verifyLiqpayCallback(data, signature);
  if (!isValid) {
    console.warn("[liqpay/callback] Signature verification failed (placeholder).");
    // In production: return 400 if signature is invalid.
    // For now, we continue so the flow can be tested end-to-end.
  }

  // Step 2: Decode payment data
  let paymentData: Record<string, unknown>;
  try {
    paymentData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  } catch {
    return NextResponse.json({ error: "Invalid data payload" }, { status: 400 });
  }

  console.log("[liqpay/callback] Payment data:", paymentData);

  const status = paymentData.status as string | undefined;
  const orderId = paymentData.order_id as string | undefined;
  const amount = paymentData.amount as number | undefined;

  // Step 3: Handle successful payment
  if (status === "success" || status === "sandbox") {
    // TODO: Retrieve user email from order storage by orderId
    // const userEmail = await getOrderEmail(orderId);
    const userEmail: string | null = null; // placeholder

    if (userEmail && orderId && amount) {
      try {
        await sendDonationThankYouEmail({
          recipientEmail: userEmail,
          donationAmount: amount,
          orderId,
        });
      } catch (err) {
        console.error("[liqpay/callback] Failed to send email:", err);
        // Do not fail the callback response — email is best-effort
      }
    } else {
      console.warn(
        "[liqpay/callback] Email not sent — userEmail not found for orderId:",
        orderId
      );
    }
  }

  // Liqpay expects a 200 response to confirm receipt
  return NextResponse.json({ received: true });
}
