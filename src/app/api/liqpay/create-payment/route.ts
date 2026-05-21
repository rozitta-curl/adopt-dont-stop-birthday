import { NextRequest, NextResponse } from "next/server";
import { createLiqpayPayment } from "@/lib/liqpay";
import { saveOrder } from "@/lib/redis";
import type { PaymentType } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, email, paymentType } = body as {
      amount: number;
      email: string;
      paymentType: PaymentType;
    };

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Сума має бути більше 0" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Некоректний email" }, { status: 400 });
    }
    if (paymentType !== "once" && paymentType !== "monthly") {
      return NextResponse.json({ error: "Невірний тип платежу" }, { status: 400 });
    }

    const orderId = `ads-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const forwardedHost = req.headers.get("x-forwarded-host");
    const forwardedProto = req.headers.get("x-forwarded-proto") ?? "https";
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (forwardedHost ? `${forwardedProto}://${forwardedHost}` : req.nextUrl.origin);

    const payment = createLiqpayPayment({
      amount,
      description: "Донат для Adopt Don't Stop — 7 років разом",
      orderId,
      resultUrl: `${baseUrl}/thank-you`,
      serverUrl: `${baseUrl}/api/liqpay/callback`,
      userEmail: email,
      paymentType,
    });

    await saveOrder(orderId, { email, amount, paymentType });

    return NextResponse.json(payment);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    const status = message.includes("not configured") ? 503 : 500;
    console.error("[create-payment]", err);
    return NextResponse.json({ error: message }, { status });
  }
}
