import Image from "next/image";
import styles from "@/styles/sections/navbar.module.css";

const NAV_LINKS = [
  { label: "7 РОКІВ У ЦИФРАХ", href: "#stats" },
  { label: "НАША ІСТОРІЯ", href: "#timeline" },
  { label: "ВИПУСКНИКИ", href: "#animals" },
  { label: "НАШІ ПЛАНИ", href: "#whats-next" },
  { label: "ПОДІЯ", href: "#housewarming" },
];

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Image
        src="/assets/Logo.svg"
        alt="Adopt Don't Stop"
        width={176}
        height={32}
        className={styles.logoImage}
        priority
      />
      <div className={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
