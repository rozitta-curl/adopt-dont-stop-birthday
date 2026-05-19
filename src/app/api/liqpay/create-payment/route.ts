import { NextRequest, NextResponse } from "next/server";
import { createLiqpayPayment } from "@/lib/liqpay";

/**
 * POST /api/liqpay/create-payment
 *
 * Creates a Liqpay payment session.
 *
 * Request body:
 *   { amount: number, email: string }
 *
 * Response:
 *   { data: string, signature: string, checkoutUrl: string }
 *
 * The client receives data + signature and POSTs them to the Liqpay checkout URL.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, email } = body as { amount: number; email: string };

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Сума має бути більше 0" },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Некоректний email" },
        { status: 400 }
      );
    }

    const orderId = `ads-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? req.nextUrl.origin;

    const payment = await createLiqpayPayment({
      amount,
      description: "Донат для Adopt Don't Stop — 7 років разом",
      orderId,
      resultUrl: `${baseUrl}/thank-you`,
      serverUrl: `${baseUrl}/api/liqpay/callback`,
      userEmail: email,
    });

    return NextResponse.json(payment);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";

    // Return 503 if Liqpay keys are not configured (development)
    const status = message.includes("not configured") ? 503 : 500;

    console.error("[create-payment]", err);
    return NextResponse.json({ error: message }, { status });
  }
}
