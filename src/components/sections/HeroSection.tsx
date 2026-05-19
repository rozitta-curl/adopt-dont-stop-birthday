import Button from "@/components/ui/Button";
import styles from "@/styles/sections/hero.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Main heading */}
        <h1 className={styles.heading}>
          7 років<br />
          попри <span className={styles.accentBadge}>все.</span>
          <br />
          – ми тут.
        </h1>

        <h3 className={styles.subheading}>
          І досі рятуємо.
        </h3>

        {/* Subtext */}
        <p className={styles.subtext}>
          День народження фонду – березень. Та цього березня було не до святкувань: після тяжкої зими, ми змушені були переїжджати. Знайшли нове приміщення, перевезли всіх — і нарешті видихнули. 7 років попри все. Це варто відзначити разом з вами.
        </p>

        {/* CTA buttons */}
        <div className={styles.ctaGroup}>
          <Button variant="primary" href="#donation">
            Поздоровити донатом 💛
          </Button>
          <Button variant="outline" href="#timeline">
            Наша історія
          </Button>
        </div>
      </div>
    </section>
  );
}
