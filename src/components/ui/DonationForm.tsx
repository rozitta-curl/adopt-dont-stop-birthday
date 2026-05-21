"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "@/styles/ui/donation-form.module.css";

const TELEGRAM_LINK = "https://t.me/adopt_hello";
const EXCEL_LINK = "https://docs.google.com/spreadsheets/d/1qxlXyphI7e5mNHowWUqttkg8TeIhdW3Vzem2najeWfk/edit?usp=sharing";

const WISHLIST = [
  "Пральна машинка",
  "Машинка для сушки речей",
  "Очисна система для води",
  "Сітки антикішки на вікна",
  "Металопластикові двері для кімнат з тваринками",
  "Нові надійні вхідні двері",
  "Великі міцні клітки XL від 1.5м",
  "Іграшки мʼякі та для гризіння",
  "Смаколики",
];

const PRESET_AMOUNTS = [100, 200, 500, 1000, 2000];

interface Props {
  tab: "money" | "items";
}

export default function DonationForm({ tab }: Props) {
  const [paymentType, setPaymentType] = useState<"monthly" | "once">("monthly");
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
        body: JSON.stringify({ amount: finalAmount, email, paymentType }),
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
      {tab === "money" && (
        <>
          {/* Inner sub-tabs: Щомісяця / Разово */}
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tab} ${paymentType === "monthly" ? styles.tabActive : ""}`}
              onClick={() => setPaymentType("monthly")}
            >
              Щомісяця
            </button>
            <button
              type="button"
              className={`${styles.tab} ${paymentType === "once" ? styles.tabActive : ""}`}
              onClick={() => setPaymentType("once")}
            >
              Разово
            </button>
          </div>

          {/* Info block — only for monthly */}
          {paymentType === "monthly" && (
            <div className={styles.infoBlock}>
              <p>
                <span className={styles.infoBlockBold}>Чому щомісяця?</span>{" "}
                Регулярна підтримка дає нам стабільність – ми можемо планувати
                лікування, корм і ремонт наперед. Навіть 100 ₴ на місяць — це
                вже впевненість.
              </p>
            </div>
          )}

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
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
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
        <div className={styles.itemsTab}>
          {/* Wishlist */}
          <ul className={styles.wishlist}>
            {WISHLIST.map((item, i) => (
              <li key={i} className={styles.wishlistItem}>
                <Image
                  src="/assets/bullet-dot.svg"
                  alt=""
                  width={12}
                  height={12}
                  className={styles.bulletDot}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.itemLink}>
            <a href={EXCEL_LINK} target="_blank" rel="noopener noreferrer">
              Детальний список потрібних речей
            </a>
          </div>

          {/* Delivery card */}
          <div className={styles.deliveryCard}>
            <div className={styles.deliveryOption}>
              <div className={styles.deliveryTitle}>Привезти</div>
              <div className={styles.deliveryDetail}>м. Київ, вул. Амосова 9</div>
              <div className={styles.deliveryDetail}>Пн–Нд: 12.00–16.00</div>
            </div>
            <div className={styles.deliveryDivider} />
            <div className={styles.deliveryOption}>
              <div className={styles.deliveryTitle}>Передати поштою</div>
              <div className={styles.deliveryDetail}>НП 129, м. Київ</div>
              <div className={styles.deliveryDetail}>+38 (063) 194-68-59</div>
              <div className={styles.deliveryDetail}>Микитенко Альона</div>
            </div>
          </div>

          <div className={styles.submitWrapper}>
            <Button variant="primary" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              Повідомити, що передам
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
