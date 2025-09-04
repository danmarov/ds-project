"use client";

import React from "react";
import Stepper from "../ui/stepper";
import { CustomIcon } from "../ui/custom-icon";
import Image from "next/image";
import CarouselSlider from "./carousel";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    cardImage: "/Card.svg",
    cardImage2: "/Card-1.svg",
    title: "KYC та AML перевірка",
    description:
      "KYC/AML зазвичай 1–2 дні: паспорт/ID, адреса та документи про походження коштів на суму обміну. Персональний менеджер допоможе з документами",
  },
  {
    id: 2,
    cardImage: "/slide2-back.svg",
    cardImage2: "/slide2-front.svg",
    title: "Підписання договору",
    description:
      "Підписуємо договір на надання послуг з переказу коштів: фіксуємо суму, маршрут, комісію та строки. Підпис — дистанційно (e-signature).",
  },
  {
    id: 3,
    cardImage: "/slide3-back.svg",
    cardImage2: "/slide3-front.svg",
    title: "Відкриття рахунку",
    description:
      "Відкриваємо рахунок в обраній фінансовій установі та підтверджуємо реквізити для майбутнього зарахування EUR.",
  },
  {
    id: 4,
    cardImage: "/slide4-back.svg",
    cardImage2: "/slide4-front.svg",
    title: "Реєстрація кабінету",
    description:
      "Особистий кабінет готовий; ви поповнюєте його за допомогою USDT і конвертуєте баланс в EUR.",
  },
  {
    id: 5,
    cardImage: "/slide5-back.svg",
    cardImage2: "/slide5-front.svg",
    title: "Отримання коштів",
    description:
      "Ви виводите EUR з особистого кабінету на ваш IBAN у банку-отримувачі — проводимо settlement. Супроводжуємо на кожному кроці.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="text-accent relative overflow-hidden bg-white"
      id="process"
    >
      <div className="relative container pt-[160px]">
        <Stepper
          value="O3"
          className="text-secondary font-display pointer-events-none absolute top-[0px] left-full z-0 -translate-x-full text-[180px] leading-none font-bold md:top-[50px] md:left-0 md:-translate-x-1/3 md:text-[380px]"
        />
        <div className="relative z-10">
          <div className="flex flex-col items-start justify-between lg:flex-row">
            <motion.h2
              initial={{ x: -60, opacity: 0, rotateY: -15 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
                type: "spring",
                damping: 12,
              }}
              className="text-accent flex-nowrap text-[38px] leading-none font-semibold tracking-tight sm:text-[48px] md:text-[64px]"
            >
              Процесс <br className="hidden md:block" /> переказу
            </motion.h2>

            <motion.div
              initial={{ x: 50, opacity: 0, rotateY: 15 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.4, 0.25, 1],
                type: "spring",
                damping: 12,
              }}
              className=""
            >
              <div className="font-manrope mt-4 w-[70%] text-[15px] leading-5 font-semibold text-[#525252] md:mt-[21px] md:w-[530px] xl:mt-[41px] xl:text-right">
                Комісія від 2%. Фінальні умови — після KYC/AML та вибору
                маршруту.
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            <CarouselSlider
              slides={slides}
              autoPlay={true}
              autoPlayDelay={5000}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
