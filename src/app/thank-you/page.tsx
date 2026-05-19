/**
 * Thank You page — shown after successful Liqpay payment.
 *
 * Liqpay redirects here via the `result_url` parameter set in create-payment.
 * Query params from Liqpay: order_id, amount, status, etc.
 * (Full list: https://www.liqpay.ua/documentation/api/checkout)
 *
 * TODO:
 * - Add real content and design when ready.
 * - Read `order_id` from searchParams to display a reference.
 * - Optionally trigger client-side confetti or animations.
 */

import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/styles/pages/thank-you.module.css";

export const metadata: Metadata = {
  title: "Дякуємо! — Adopt Don't Stop",
  description: "Ваш донат отримано. Дякуємо за підтримку!",
};

interface ThankYouPageProps {
  searchParams: Promise<{ order_id?: string; amount?: string; status?: string }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const orderId = params.order_id;
  const status = params.status;
  const isSuccess = !status || status === "success";

  return (
    <main className={styles.page}>
      <div className={styles.icon}>{isSuccess ? "💛" : "😔"}</div>

      <h1 className={styles.heading}>
        {isSuccess ? "Дякуємо за підтримку!" : "Щось пішло не так"}
      </h1>

      <p className={styles.subtext}>
        {isSuccess
          ? "Ваш донат отримано. Ми дуже цінуємо кожну гривню, яку ви довіряєте нам. Разом ми продовжуємо рятувати тварин!"
          : "Платіж не було завершено. Спробуйте ще раз або зверніться до нас."}
      </p>

      {orderId && (
        <p className={styles.orderId}>Номер замовлення: {orderId}</p>
      )}

      {isSuccess && (
        <div className={styles.divider} />
      )}

      {isSuccess && (
        <p className={styles.emailNote}>
          На вашу пошту надійде підтвердження про отримання донату.
        </p>
      )}

      <div className={styles.actions}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: "16px 24px",
            borderRadius: "100px",
            backgroundColor: "var(--color-yellow)",
            color: "var(--color-navy)",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "15px",
            textDecoration: "none",
          }}
        >
          На головну
        </Link>

        {!isSuccess && (
          <Link
            href="/#donation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: "16px 24px",
              borderRadius: "100px",
              border: "2px solid rgba(18,18,42,0.2)",
              color: "var(--color-navy)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "15px",
              textDecoration: "none",
            }}
          >
            Спробувати знову
          </Link>
        )}
      </div>
    </main>
  );
}
