import Image from "next/image";
import styles from "@/styles/sections/thank-you-banner.module.css";

export default function ThankYouBanner() {
  return (
    <section className={styles.section}>
      {/* Garland decoration */}
      <div className={styles.garlandWrapper}>
        <Image
          src="/assets/Big-heart.svg"
          alt=""
          width={50}
          height={45}
          className={styles.garlandImage}
          aria-hidden="true"
        />
      </div>

      <h2 className={styles.heading}>Дякуємо, що ви з нами</h2>
      <p className={styles.subtext}>
        Кожен донат, репост і просто добре слово — це частина цих 7 років. Ви частина цієї історії. І це — ваш проєкт теж.
      </p>
    </section>
  );
}
