"use client";

import { useState } from "react";
import DonationForm from "@/components/ui/DonationForm";
import styles from "@/styles/sections/donation.module.css";

export default function DonationSection() {
  const [tab, setTab] = useState<"money" | "items">("money");

  return (
    <section className={styles.section} id="donation">
      {/* Full-width outer tabs — above badge and heading */}
      <div className={styles.outerTabsBar}>
        <button
          type="button"
          className={`${styles.outerTab} ${tab === "money" ? styles.outerTabActive : styles.outerTabInactive}`}
          onClick={() => setTab("money")}
        >
          Донат
        </button>
        <button
          type="button"
          className={`${styles.outerTab} ${tab === "items" ? styles.outerTabActive : styles.outerTabInactive}`}
          onClick={() => setTab("items")}
        >
          Речі
        </button>
      </div>

      <div className={styles.leftContent}>
        <div className={styles.badge}>Поздоровити</div>
        <h2 className={styles.heading}>Привітайте</h2>
        <p className={styles.subtext}>
          Найкращий подарунок – це впевненість в тому, що в хвостиків є і буде
          все необхідне. Поздоровте нас копіечкою або подаруйте необхідні речі.
        </p>
      </div>

      <div className={styles.rightContent}>
        <DonationForm tab={tab} />
      </div>
    </section>
  );
}
