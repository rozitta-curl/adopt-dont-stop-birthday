import Image from "next/image";
import styles from "@/styles/sections/animals.module.css";

const ANIMALS = [
  { id: 1, name: "Персик", age: "1 рік" },
  { id: 2, name: "Граф", age: "3 роки" },
  { id: 3, name: "Лілу", age: "6 місяців" },
  { id: 4, name: "Бублик", age: "2 роки" },
  { id: 5, name: "Нуар", age: "4 роки" },
  { id: 6, name: "Хмарка", age: "8 місяців" },
  { id: 7, name: "Рудик", age: "1,5 роки" },
  { id: 8, name: "Зефір", age: "5 місяців" },
  { id: 9, name: "Марся", age: "2 роки" },
  { id: 10, name: "Сіра", age: "3 роки" },
  { id: 11, name: "Сіра2", age: "3 роки" },
  { id: 12, name: "Сіра3", age: "3 роки" },
  { id: 13, name: "Сіра4", age: "3 роки" },
  { id: 14, name: "Сіра5", age: "3 роки" },
  { id: 15, name: "Сіра6", age: "3 роки" },
  { id: 16, name: "Сіра6", age: "3 роки" },
  { id: 17, name: "Сіра6", age: "3 роки" },
  { id: 18, name: "Сіра6", age: "3 роки" },
  { id: 19, name: "Сіра6", age: "3 роки" },
  { id: 20, name: "Сіра6", age: "3 роки" },
  { id: 21, name: "Сіра6", age: "3 роки" },
];

export default function AnimalsSection() {
  return (
    <section className={styles.section} id="animals">
      <div className={styles.header}>
        <div className={styles.badge}>Наші випускники</div>
        <h2 className={styles.heading}>Заради кого ми тут</h2>
        <p className={styles.subtext}>
          Знаєте, чому ми досі тут? Тому що є ради кого. І ради вас — людей, яким теж не байдуже. Поки є безхаті тварини, ми нікуди не йдемо. А кожна щаслива історія — це привід вставати зранку і продовжувати.
        </p>
      </div>

      <div className={styles.garlandWrapper}>
        <Image
          src="/assets/Garland-hearts.svg"
          alt=""
          width={480}
          height={60}
          className={`${styles.garlandImage} ${styles.garlandMobile}`}
          aria-hidden="true"
        />
        <Image
          src="/assets/Garland-hearts-desktop.svg"
          alt=""
          width={1440}
          height={80}
          className={`${styles.garlandImage} ${styles.garlandDesktop}`}
          aria-hidden="true"
        />
      </div>

      <div className={`scroll-row ${styles.scrollArea}`}>
        {ANIMALS.map((animal) => (
          <div key={animal.id} className={styles.card}>
            <div className={styles.photoWrapper}>
              <Image
                src={`/animals/Animal${animal.id}.png`}
                alt={animal.name}
                fill
                className={styles.photo}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
