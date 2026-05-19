"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/ui/floating-donate.module.css";

export default function FloatingDonateButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero");
    const donationSection = document.getElementById("donation");

    let heroGone = false;
    let donationVisible = false;

    const update = () => setShow(heroGone && !donationVisible);

    const heroObserver = new IntersectionObserver(([e]) => {
      heroGone = !e.isIntersecting;
      update();
    });

    const donationObserver = new IntersectionObserver(
      ([e]) => {
        donationVisible = e.isIntersecting;
        update();
      },
      { threshold: 0.15 }
    );

    if (heroCta) heroObserver.observe(heroCta);
    if (donationSection) donationObserver.observe(donationSection);

    return () => {
      heroObserver.disconnect();
      donationObserver.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.wrapper} ${show ? styles.visible : ""}`}>
      <Button variant="primary" href="#donation">
        Поздоровити донатом 💛
      </Button>
    </div>
  );
}
