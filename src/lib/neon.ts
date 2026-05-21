import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface SubscriptionRecord {
  email: string;
  amount: number;
  orderId: string;
  paymentId: string | null;
  status: string;
  liqpayData: Record<string, unknown>;
}

export async function insertSubscription(record: SubscriptionRecord): Promise<void> {
  await sql`
    INSERT INTO "birthday-2026" (email, amount, order_id, payment_id, status, liqpay_data)
    VALUES (
      ${record.email},
      ${record.amount},
      ${record.orderId},
      ${record.paymentId},
      ${record.status},
      ${JSON.stringify(record.liqpayData)}
    )
    ON CONFLICT (order_id) DO NOTHING
  `;
}
