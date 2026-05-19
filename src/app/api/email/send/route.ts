import { NextRequest, NextResponse } from "next/server";
import { sendDonationThankYouEmail } from "@/lib/email";
import type { EmailTemplateData } from "@/types";

/**
 * POST /api/email/send
 *
 * Manually trigger sending a donation thank-you email.
 * Useful for testing the email template before connecting Liqpay.
 *
 * Request body:
 *   {
 *     recipientEmail: string,
 *     recipientName?: string,
 *     donationAmount: number,
 *     orderId: string
 *   }
 *
 * Note: In production, emails are sent automatically from /api/liqpay/callback.
 * This endpoint is primarily for development/testing.
 *
 * TODO: Restrict this endpoint in production (add auth header or remove it).
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<EmailTemplateData>;

    const { recipientEmail, donationAmount, orderId } = body;

    if (!recipientEmail || !donationAmount || !orderId) {
      return NextResponse.json(
        { error: "recipientEmail, donationAmount, and orderId are required" },
        { status: 400 }
      );
    }

    await sendDonationThankYouEmail({
      recipientEmail,
      recipientName: body.recipientName,
      donationAmount,
      orderId,
    });

    return NextResponse.json({ sent: true });
  } catch (err) {
    console.error("[email/send]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
