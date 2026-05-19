import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "@/styles/sections/housewarming.module.css";

// TODO: Replace with the actual Telegram chat/group link
const TELEGRAM_LINK = "https://t.me/adopt_hello";

export default function HousewarmingSection() {
  return (
    <section className={styles.section}>
      {/* Garland decoration at top */}
      <div className={styles.crownWrapper}>
        <Image
          src="/assets/Crown.svg"
          alt=""
          width={70}
          height={50}
          className={styles.crownImage}
          aria-hidden="true"
        />
      </div>

      <div className={styles.inner}>

        <div className={styles.badge}>Подія</div>
        <h2 className={styles.heading}>
          Новосілля
        </h2>
        <p className={styles.subheading}>
          Ювілей + новосілля — святкуємо одразу двічі. Приходьте!
        </p>

        {/* Ticket */}
        <div className={styles.ticketWrapper}>
          <Image
            src="/assets/Ticket.svg"
            alt="Квиток на подію"
            width={480}
            height={200}
            className={styles.ticketImage}
          />
        </div>

        {/* What to expect */}
        <div className={styles.knowMoreList}>
          {[
            {
              title: "Екскурсія новим приміщенням",
              desc: "Покажемо де ми тепер живемо — і чому нам тут добре",
            },
            {
              title: "Пікнік просто неба",
              desc: "Їжа, напої, гарне товариство і (можливо) сонце",
            },
            {
              title: "Знайомство з мешканцями",
              desc: "Наші пухнасті вихованці будуть раді провести час разом. Обійми вітаються!",
            },
          ].map((item, i) => (
            <div key={i} className={styles.knowMoreItem}>
              <Image
                src="/assets/Small-heart.svg"
                alt=""
                width={15}
                height={15}
                className={styles.knowMoreHeart}
                aria-hidden="true"
              />
              <div>
                <div className={styles.knowMoreTitle}>{item.title}</div>
                <p className={styles.knowMoreText}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          Буду!
        </Button>
        <p className={styles.Register}>Реєстрація не потрібна – просто напиши нам у Telegram, щоб ми записали тебе на прохідній. Одна хвилинка – і ти в списку!</p>
      </div>
    </section>
  );
}
