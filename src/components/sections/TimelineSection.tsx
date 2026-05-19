import Image from "next/image";
import styles from "@/styles/sections/timeline.module.css";
import type { TimelineItem } from "@/types";

const TIMELINE: TimelineItem[] = [
  {
    year: "2016–2019",
    description:
      "Ми були просто людьми, які не могли пройти повз. Ніхто інший не прийшов — тому прийшли ми. З нуля, без досвіду, зате з бажанням.",
  },
  {
    year: "2019",
    description:
      "Навесні 2019 року запустили програму стерилізації вуличних тварин у Києві та зареєстрували благодійний фонд. З'явилось безпечне місце для тих, хто не може швидко знайти новий дім.",
  },
  {
    year: "2020",
    description:
      "Народилась наша Книжкова Барахолка. Під час карантину організовували вебінари та благодійні лекції. Флеш-моб «я не вірус» об'єднав тисячі людей.",
  },
  {
    year: "2021",
    description:
      "З'явився Центр Допомоги Безхатнім Тваринам. Відкрили програми дистанційної опіки. У грудні перші підопічні потрапили до Центру — а за два місяці почалось повномасштабне вторгнення.",
  },
  {
    year: "2022",
    description:
      "Рятуючи від війни, вивезли десятки тварин. Допомагали тваринам із деокупованих територій. Прийняли перші масові евакуації.",
  },
  {
    year: "2023",
    description:
      "Стали тимчасовим місцем для понад 50 тварин після трагедії на Каховській ГЕС. Надавали гуманітарну допомогу опікунам із деокупованих територій.",
  },
  {
    year: "2024",
    description:
      "Провели численні заходи для збору коштів. Залучили нових дистанційних опікунів. Налагодили співпрацю з міжнародними партнерами та брендами.",
  },
  {
    year: "2025",
    description:
      "Попри виклики, зміцнили спільноту. Провели успішні акції, підтримали сотні тварин. Підвищили обізнаність суспільства про захист тварин.",
  },
  {
    year: "2026",
    description:
      "Переїзд у новий простір — наш перший власний Центр. Продовжуємо рухатись вперед разом з вами.",
  },
];

const DOT_COLORS = [
  "#BDB8FF",
  "#2ECC71",
  "#4B7CEC",
  "#FF9F43",
  "#E83151",
  "#FFE227",
  "#BDB8FF",
  "#2ECC71",
  "#4B7CEC",
];

export default function TimelineSection() {
  return (
    <section className={styles.section} id="timeline">
      <div className={styles.balloonsRow}>
        <Image
          src="/assets/balloon-left.svg"
          alt=""
          width={130}
          height={130}
          className={styles.balloonLeft}
          aria-hidden="true"
        />
        <Image
          src="/assets/balloon-right.svg"
          alt=""
          width={120}
          height={120}
          className={styles.balloonRight}
          aria-hidden="true"
        />
      </div>

      <div className={styles.header}>
        <div className={styles.badge}>Наша історія</div>
        <h2 className={styles.heading}>Те, що за цифрами</h2>
      </div>

      {/* Compact horizontal-scroll timeline */}
      <div className={styles.compactTimeline}>
        <div className={`scroll-row ${styles.compactScroll}`}>
          {TIMELINE.map((item, i) => (
            <div key={i} className={styles.compactItem}>
              <div className={styles.compactRail}>
                <div
                  className={styles.compactDot}
                  style={{ backgroundColor: DOT_COLORS[i] }}
                />
                <div className={styles.compactLine} />
              </div>
              <div className={styles.compactYear}>{item.year}</div>
              <p className={styles.compactDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
