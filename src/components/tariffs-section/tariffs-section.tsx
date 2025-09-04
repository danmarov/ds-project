"use client";

import React, { ReactNode } from "react";
import { CustomIcon } from "../ui/custom-icon";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface TariffsCardProps {
  preTitle?: string;
  title: string;
  gradientTitle?: boolean;
  variant: "dark" | "light";
  subtitle: string | ReactNode;
  delay?: number;
}

const TariffsCard = ({
  preTitle = "",
  gradientTitle = false,
  title,
  variant = "light",
  subtitle,
  delay = 0,
}: TariffsCardProps) => {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.95 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(
        "grid flex-shrink-0 cursor-pointer place-items-center rounded-[20px] md:rounded-[40px]",

        "w-full min-w-[280px] px-4 py-8",
        "sm:min-w-[320px] sm:px-6 sm:py-10",
        "md:w-fit md:min-w-[350px] md:px-8 md:py-12",
        "lg:min-w-[400px] lg:px-[59px] lg:py-[56px]",
        isDark ? "bg-black" : "bg-white",
      )}
    >
      <div className="space-y-3 md:space-y-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
          className={cn(
            "text-4xl leading-tight",
            "sm:text-5xl sm:leading-tight",
            "md:text-6xl md:leading-tight",
            "lg:text-7xl lg:leading-[80px]",
            "xl:text-[119px] xl:leading-[100px]",
            isDark ? "text-white" : "text-accent",
            gradientTitle && "gradient-text",
          )}
        >
          {preTitle && (
            <span className="mr-2 text-lg sm:text-xl md:text-2xl lg:text-3xl">
              {preTitle}{" "}
            </span>
          )}
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.15 }}
          className={cn(
            "font-manrope text-center leading-5 font-medium",

            "text-sm",
            "sm:text-base",
            "lg:text-lg",
            isDark ? "text-white/80" : "text-accent/50",
          )}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default function TariffsSection() {
  return (
    <section className="bg-background relative pb-6" id="pricing">
      <div className="relative container pt-[180px] md:pt-[140px] xl:pt-[160px]">
        <Stepper
          value="O2"
          className="-top-[40px] left-full -translate-x-full text-[180px] md:left-0 md:-translate-x-1/3 md:text-[380px] xl:-top-[60px]"
        />
        <div className="relative z-10">
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-accent 1315:text-[113px] flex-nowrap text-[30px] leading-none font-semibold tracking-tight sm:text-[50px] md:text-[60px] lg:text-[90px]"
          >
            Тарифи та строки
          </motion.h2>

          <div className="mt-[30px] flex flex-col-reverse items-start justify-between md:mt-[140px] xl:mt-[80px] xl:flex-row">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="mt-1.5 xl:mt-0 xl:translate-y-1/2"
            >
              <div className="font-manrope w-full text-left text-sm leading-5 font-semibold text-[#525252] md:w-[70%] md:text-base md:leading-5 xl:w-[530px]">
                Повідомте суму та країну — підберемо оптимальний маршрут. Ви
                заздалегідь бачите чисту суму на рахунку, а комісія прозора й
                зафіксована. Переказ займає до двох тижнів.
              </div>
              <motion.div whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                <Link
                  href="/feedback"
                  className="text-accent mt-4 flex w-fit items-center gap-3 text-left font-sans text-sm font-medium md:gap-6 md:text-lg xl:flex-row"
                >
                  Заполнить анкету
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="scale-70 sm:scale-100"
                  >
                    <CustomIcon.ArrowLeft />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.h3
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="text-accent flex-nowrap text-[21px] leading-none font-semibold tracking-tight sm:text-[28px] lg:text-[48px] xl:text-right xl:text-[64px]"
            >
              Дізайтесь найголовніше
            </motion.h3>
          </div>

          {/* Измененный контейнер для карточек */}
          <div className="mt-[60px] md:mt-[90px]">
            {/* Мобильная версия - вертикальное расположение */}
            <div className="flex flex-col gap-4 text-black md:hidden">
              <TariffsCard
                gradientTitle
                variant="dark"
                preTitle="до"
                title="2 тижнів"
                subtitle={
                  <>
                    Строки процесу переказу, з урахуванням <br /> зарахування,
                    грошових коштів на Ваш рахунок
                  </>
                }
                delay={0}
              />
              <TariffsCard
                variant="light"
                preTitle="від"
                title="2%"
                subtitle={"Комісія від суми переказу"}
                delay={0.1}
              />
            </div>
            {/* Планшеты и десктоп - горизонтальный скролл */}
            <div className="mx-0.5 hidden flex-nowrap gap-4 overflow-x-auto text-black md:mx-5 md:flex lg:gap-6">
              <TariffsCard
                gradientTitle
                variant="dark"
                preTitle="до"
                title="2 тижнів"
                subtitle={
                  <>
                    Строки процесу переказу, з урахуванням <br /> зарахування,
                    грошових коштів на Ваш рахунок
                  </>
                }
                delay={0}
              />
              <TariffsCard
                variant="light"
                preTitle="від"
                title="2%"
                subtitle={"Комісія від суми переказу"}
                delay={0.1}
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="font-manrope text-muted/50 mt-2 text-sm font-medium md:mt-4 md:text-center md:text-base"
          >
            Строк та комісія залежать від кейсу. Детальніше — в FAQ.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
