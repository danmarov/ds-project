import React from "react";
import { CustomIcon } from "../ui/custom-icon";
import Stepper from "../ui/stepper";
import Accordion from "./accordion";

const accordionItems = [
  {
    title: "Яка мінімальна сума для переказу?",
    content: "Залежить від конкретного кейсу. Стандартно — від 50 000 €.",
  },
  {
    title: "Скільки часу займає процес?",
    content: "У середньому до 2 робочих тижнів від початку.",
  },
  {
    title: "Яка комісія і чи є приховані платежі?",
    content:
      "Комісія від 2%, залежно від кейсу. Усі витрати проговорюються на особистій консультації та фіксуються в договорі.",
  },
  {
    title: "На які банки можна вивести кошти?",
    content: "На будь-який європейський IBAN-рахунок.",
  },
  {
    title: "Чи працюєте тільки з ЄС, чи й з іншими країнами?",
    content:
      "Так, ми готові допомогти з вирішенням фінансових задач і за межами ЄС.",
  },
  {
    title: "Які документи потрібно підготувати для переказу коштів за кордон?",
    content:
      "Мінімальний пакет включає: паспорт, підтвердження походження коштів, контракт або інвойс. Детальний список формуємо під конкретний кейс.",
  },
  {
    title:
      "Чи можете допомогти, якщо в мене немає документів про походження коштів?",
    content:
      "Так. Ми надаємо консультацію щодо альтернативних шляхів заведення коштів до ЄС і допоможемо обрати легальну структуру для підтвердження походження та розміщення їх на рахунку.",
  },
];

export default function FaqSection() {
  return (
    <section className="relative bg-white pb-[60px] md:pb-[100px]" id="faq">
      <div className="relative container pt-[160px]">
        <Stepper
          value="O6"
          className="-top-[40px] left-full -translate-x-full text-[180px] md:left-0 md:-translate-x-1/3 md:text-[380px] lg:-top-[80px] xl:-top-[80px]"
        />
      </div>
      <h2 className="text-accent 1430:text-[102px] 450:text-[32px] relative z-10 mt-6 flex-nowrap text-center text-[26px] leading-none font-semibold tracking-tight sm:text-[48px] md:mt-0 md:text-[80px]">
        Відповіді на питання
      </h2>
      <div className="text-accent relative z-10 container mt-[60px] md:mt-[130px]">
        <Accordion items={accordionItems} defaultOpenIndex={0} />
      </div>
    </section>
  );
}
