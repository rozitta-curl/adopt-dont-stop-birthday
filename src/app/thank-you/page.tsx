import type { Metadata } from "next";
import Image from "next/image";
import NavBar from "@/components/sections/NavBar";
import styles from "@/styles/pages/thank-you.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Дякуємо! — Adopt Don't Stop",
  description: "Ваш донат отримано. Дякуємо за підтримку!",
};

const THANK_YOU_IMAGES = [
  "/assets/Thank-you.svg",
  "/assets/Thank-you1.svg",
  "/assets/Thank-you2.svg",
  "/assets/Thank-you3.svg",
  "/assets/Thank-you4.svg",
  "/assets/Thank-you5.svg",
];

export default function ThankYouPage() {
  const image = THANK_YOU_IMAGES[Math.floor(Math.random() * THANK_YOU_IMAGES.length)];

  return (
    <>
      <NavBar />
      <main className={styles.page}>
        <section className={styles.yellowSection}>
          <h1 className={styles.heading}>Дякую за подарунок!</h1>

          <div className={styles.catHeartWrapper}>
            <Image
              src={image}
              alt="Кіт у серці"
              width={320}
              height={300}
              className={styles.catHeart}
            />
          </div>

          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Світ змінюється. Твоя доброта&nbsp;– ні.</h2>
            <p className={styles.infoText}>
              Дякуємо, що допомагаєш притулку впевнено зустріти наше 7-річчя. Ти щойно зробив те, що насправді не має ціни — подарував іншому живому створінню день, повний любові та турботи.
            </p>
            <p className={styles.infoText}>
              Поки на твою пошту летить особливий лист із твоїм персональним «Дзеркалом доброти», поділися цією миттю з іншими. Твій приклад може стати для когось світлом, яке зараз так потрібно.
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <Image
            src="/assets/Small-heart.svg"
            alt=""
            width={48}
            height={44}
            aria-hidden="true"
          />
          <p className={styles.footerText}>Дякуємо, що ви з нами</p>
        </footer>
      </main>
    </>
  );
}
