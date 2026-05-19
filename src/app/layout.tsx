import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700", "800", "900"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "7 років разом — Adopt Don't Stop",
  description:
    "Святкуємо 7 років разом! Adopt Don't Stop — благодійний фонд допомоги безхатнім тваринам.",
  openGraph: {
    title: "7 років разом — Adopt Don't Stop",
    description:
      "Святкуємо 7 років разом! Допоможіть нам і далі рятувати тварин.",
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${unbounded.variable} ${manrope.variable}`}
    >
      <body>
        <div className="site-wrapper">{children}</div>
      </body>
    </html>
  );
}
