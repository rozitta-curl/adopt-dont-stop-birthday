import Image from "next/image";
import styles from "@/styles/sections/stories.module.css";

const STORIES = [
  "Story1.png","Story2.png","Story3.png","Story4.png",
  "Story5.png","Story6.png","Story7.png","Story8.png",
  "Story9.png","Story10.png","Story11.png","Story12.png",
  "Story13.png","Story14.png","Story15.png","Story16.png",
  "Story17.png","Story18.png","Story19.png","Story20.png","Story21.png",
  "Story21.png","Story22.png","Story23.png","Story24.png",
];

export default function StoriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Історії<br />порятунку
        </h2>
      </div>

      <div className={`scroll-row ${styles.scrollArea}`}>
        {STORIES.map((file, i) => (
          <div key={i} className={styles.card}>
            <Image
              src={`/stories/${file}`}
              alt={`Istorія порятунку ${i + 1}`}
              width={260}
              height={300}
              className={styles.cardImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
