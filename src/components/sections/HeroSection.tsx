import Image from "next/image";
import Button from "@/components/ui/Button";
import styles from "@/styles/sections/hero.module.css";

const STORIES = [
  "Story1.png","Story2.png","Story3.png","Story4.png",
  "Story5.png","Story6.png","Story7.png","Story8.png",
  "Story9.png","Story10.png","Story11.png","Story12.png",
  "Story13.png","Story14.png","Story15.png","Story16.png",
  "Story17.png","Story18.png","Story19.png","Story20.png",
  "Story21.png","Story22.png","Story23.png","Story24.png",
];

export default function HeroSection() {
  return (
    <section id="hero" className={styles.section}>
      {/* Left column: text content */}
      <div className={styles.textContent}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>
            7 років<br />
            попри <span className={styles.accentBadge}>все.</span>
            <br />
            – ми тут.
          </h1>
        </div>

        {/* Stories horizontal scroll — mobile only */}
        <div className={`scroll-row ${styles.storiesScroll}`}>
          {STORIES.map((file, i) => (
            <div key={i} className={styles.storyCard}>
              <Image
                src={`/stories/${file}`}
                alt={`Istorія порятунку ${i + 1}`}
                width={300}
                height={360}
                className={styles.storyImage}
              />
            </div>
          ))}
        </div>

        <div className={styles.innerSubheading}>
          <h3 className={styles.subheading}>І досі рятуємо.</h3>
          <p className={styles.subtext}>
            День народження фонду – березень. Та цього березня було не до святкувань: після тяжкої зими, ми змушені були переїжджати. Знайшли нове приміщення, перевезли всіх — і нарешті видихнули. 7 років попри все. Це варто відзначити разом з вами.
          </p>
          <div id="hero-cta" className={styles.ctaGroup}>
            <Button variant="primary" href="#donation">
              Поздоровити донатом 💛
            </Button>
            <Button variant="outline" href="#timeline">
              Наша історія
            </Button>
          </div>
        </div>
      </div>

      {/* Right column: stories grid — desktop only */}
      <div className={styles.storiesGridDesktop} aria-hidden="true">
        {STORIES.map((file, i) => (
          <div key={i} className={styles.storyCardDesktop}>
            <Image
              src={`/stories/${file}`}
              alt=""
              fill
              className={styles.storyImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
