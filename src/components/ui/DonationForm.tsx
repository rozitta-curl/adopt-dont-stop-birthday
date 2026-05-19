"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/ui/donation-form.module.css";

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000];

export default function DonationForm() {
  const [tab, setTab] = useState<"money" | "items">("money");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(200);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount ?? 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!finalAmount || finalAmount < 1) {
      setError("Будь ласка, оберіть або введіть суму донату.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Будь ласка, введіть коректний email.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/liqpay/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Помилка при створенні платежу.");
      }

      const { data, signature, checkoutUrl } = await res.json();

      const form = document.createElement("form");
      form.method = "POST";
      form.action = checkoutUrl;
      form.style.display = "none";

      const dataInput = document.createElement("input");
      dataInput.name = "data";
      dataInput.value = data;
      form.appendChild(dataInput);

      const sigInput = document.createElement("input");
      sigInput.name = "signature";
      sigInput.value = signature;
      form.appendChild(sigInput);

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Щось пішло не так. Спробуйте пізніше."
      );
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Tab switcher */}
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tab === "money" ? styles.tabActive : ""}`}
          onClick={() => setTab("money")}
        >
          Донат
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tab === "items" ? styles.tabActive : ""}`}
          onClick={() => setTab("items")}
        >
          Речі
        </button>
      </div>

      {tab === "money" && (
        <>
          {/* Preset amounts — 3 then 2 */}
          <div className={styles.amountsGrid3}>
            {PRESET_AMOUNTS.slice(0, 3).map((v) => (
              <button
                key={v}
                type="button"
                className={`${styles.amountBtn} ${
                  selectedAmount === v && !customAmount ? styles.selected : ""
                }`}
                onClick={() => { setSelectedAmount(v); setCustomAmount(""); }}
              >
                {v} ₴
              </button>
            ))}
          </div>
          <div className={styles.amountsGrid2}>
            {PRESET_AMOUNTS.slice(3).map((v) => (
              <button
                key={v}
                type="button"
                className={`${styles.amountBtn} ${
                  selectedAmount === v && !customAmount ? styles.selected : ""
                }`}
                onClick={() => { setSelectedAmount(v); setCustomAmount(""); }}
              >
                {v} ₴
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <input
            className={`${styles.pillInput} ${customAmount ? styles.pillInputSelected : ""}`}
            type="number"
            min="1"
            placeholder="Інша сума"
            value={customAmount}
            onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
          />

          {/* Email */}
          <input
            className={styles.pillInput}
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className={styles.errorMsg}>{error}</p>}

          <div className={styles.submitWrapper}>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Зачекайте..." : "Привітати 💛"}
            </Button>
          </div>
        </>
      )}

      {tab === "items" && (
        <div className={styles.itemsPlaceholder}>
          <p>Вішліст речей з'явиться тут — слідкуйте за оновленнями!</p>
        </div>
      )}
    </form>
  );
}
