import DonationForm from "@/components/ui/DonationForm";
import styles from "@/styles/sections/donation.module.css";

export default function DonationSection() {
  return (
    <section className={styles.section} id="donation">
      <div className={styles.badge}>Поздоровити</div>
      <h2 className={styles.heading}>Привітайте</h2>
      <p className={styles.subtext}>
        Найкращий подарунок – це впевненість в тому, що в хвостиків є і буде
        все необхідне. Поздоровте нас копіечкою або подаруйте необхідні речі.
      </p>

      <DonationForm />
    </section>
  );
}
