import styles from "@/styles/sections/whats-next.module.css";

const CARDS = [
  {
    id: 1,
    title: "Не зупинятися",
    description:
      "Наша основна ціль – це продовжити працювати ще 7, а краще ще 77 років. На жаль, вуличних тварин не стає менше і наша робота зараз потрібна.",
    color: "#C4B5FD",
  },
  {
    id: 2,
    title: "Нові програми допомоги безхатнім тваринам",
    description:
      "Ми мріємо перевідкрити Програму стерилізації. Це надзвичайно складний, але дуже потрібний напрям роботи.",
    color: "#FFE227",
  },
  {
    id: 3,
    title: "Просвітницька діяльність",
    description:
      "Свого часу ми суттєво доклали зусиль, щоб змінити ставлення багатьох людей до питання стерилізації тварин. І це спрацювало!\n\nМи хочемо робити це знову. Говорити про гуманність, про потреби тварин, про суспільство, в якому можна співіснувати разом з тваринами, з турботою і повагою.",
    color: "#57C47A",
  },
  {
    id: 4,
    title: "Нові друзі",
    description:
      "Бачите скільки в нас планів? Так от, це далеко не все: від простого побутового (як наприклад, довести до толку наше нове приміщення) до більш амбіційних проєктів як то допомога тваринам на вулиці, освітні програми, тощо. Тож ми завжди раді новим друзям, партнерам та самим незвичайним колабораціям!",
    color: "#FF9F43",
  },
];

export default function WhatsNextSection() {
  return (
    <section className={styles.section} id="whats-next">
      <div className={styles.badge}>Наші плани</div>
      <h2 className={styles.heading}>Що далі?</h2>
      <p className={styles.subtext}>
        В нас неймовірно багато ідей і неймовірно мало ресурсів!
      </p>

      <div className={styles.cards}>
        {CARDS.map((card) => (
          <div
            key={card.id}
            className={styles.card}
            style={{ backgroundColor: card.color }}
          >
            <h3 className={styles.cardTitle}>{card.title}</h3>
            {card.description.split("\n\n").map((para, i) => (
              <p key={i} className={styles.cardDesc}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
