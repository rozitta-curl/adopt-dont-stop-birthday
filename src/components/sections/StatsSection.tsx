import Image from "next/image";
import styles from "@/styles/sections/stats.module.css";

const STATS = [
  { number: "506", label: "тварин врятовано з вулиці", colorClass: styles.statPurple },
  { number: "347", label: "хвостів знайшло нові домівки", colorClass: styles.statGreen },
  { number: "3476", label: "вуличних тварин стерилізовано", colorClass: styles.statOrange },
  { number: "45", label: "тварин евакуйовано", colorClass: styles.statBlue },
];

export default function StatsSection() {
  return (
    <section className={styles.section}>
      {/* Garland lights at top of section */}
      <div className={styles.garlandWrapper}>
        <Image
          src="/assets/Garland-with-lights.svg"
          alt=""
          width={480}
          height={100}
          className={styles.garlandImage}
          aria-hidden="true"
        />
      </div>

      <div className={styles.inner}>
        {/* Badge */}
        <div className={styles.badge}>7 РОКІВ У ЦИФРАХ</div>

        {/* Heading */}
        <h2 className={styles.heading}>Що нам вдалось?</h2>

        {/* Colored stat grid */}
        <div className={styles.grid}>
          {STATS.map((stat) => (
            <div key={stat.number} className={`${styles.statItem} ${stat.colorClass}`}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Highlight block */}
        <div className={styles.highlight}>
          <div className={styles.highlightText}>Жодного разу</div>
          <div className={styles.highlightSub}>
            не здались, хоча іноді дуже хотілось.
          </div>
        </div>
      </div>
    </section>
  );
}
