import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/sections/navbar.module.css";

const NAV_LINKS = [
  { label: "7 РОКІВ У ЦИФРАХ", href: "/#stats" },
  { label: "НАША ІСТОРІЯ", href: "/#timeline" },
  { label: "ВИПУСКНИКИ", href: "/#animals" },
  { label: "НАШІ ПЛАНИ", href: "/#whats-next" },
  { label: "ПОДІЯ", href: "/#housewarming" },
];

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          src="/assets/Logo.svg"
          alt="Adopt Don't Stop"
          width={176}
          height={32}
          className={styles.logoImage}
          priority
        />
      </Link>
      <div className={styles.navLinks}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
