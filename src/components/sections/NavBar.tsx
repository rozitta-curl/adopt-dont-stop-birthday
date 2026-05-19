import Image from "next/image";
import styles from "@/styles/sections/navbar.module.css";

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
    </nav>
  );
}
