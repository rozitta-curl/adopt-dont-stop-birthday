"use client";

import { useState } from "react";
import Image from "next/image";

const THANK_YOU_IMAGES = [
  "/assets/Thank-you.svg",
  "/assets/Thank-you1.svg",
  "/assets/Thank-you2.svg",
  "/assets/Thank-you3.svg",
  "/assets/Thank-you4.svg",
  "/assets/Thank-you5.svg",
];

export default function RandomThankYouImage({ className }: { className?: string }) {
  const [src] = useState(
    () => THANK_YOU_IMAGES[Math.floor(Math.random() * THANK_YOU_IMAGES.length)]
  );

  return (
    <Image
      src={src}
      alt="Кіт у серці"
      width={320}
      height={300}
      className={className}
    />
  );
}
