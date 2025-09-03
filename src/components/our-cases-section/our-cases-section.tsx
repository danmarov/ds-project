"use client";

import React, { ReactNode } from "react";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CasesCardProps {
  preTitle?: string;
  title: string;
  gradientTitle?: boolean;
  variant: "dark" | "light";
  subtitle: string | ReactNode;
  delay?: number;
}

const CasesCard = ({
  preTitle = "",
  gradientTitle = false,
  title,
  variant = "light",
  subtitle,
  delay = 0,
}: CasesCardProps) => {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: "easeOut",
      }}
      className={cn(
        "grid flex-shrink-0 cursor-pointer place-items-center rounded-[20px] md:rounded-[40px]",
        // Адаптивная ширина и отступы
        "w-full min-w-[280px] px-4 py-8", // мобильные
        "sm:min-w-[320px] sm:px-6 sm:py-10", // малые планшеты
        "md:w-fit md:min-w-[350px] md:px-8 md:py-12", // средние планшеты
        "lg:min-w-[400px] lg:px-[59px] lg:py-[56px]", // десктоп (исходные значения)
        isDark ? "bg-black" : "bg-white",
      )}
    >
      <div className="space-y-3 md:space-y-4">
        <p
          className={cn(
            // Адаптивные размеры текста
            "text-4xl leading-tight", // мобильные
            "sm:text-5xl sm:leading-tight", // малые планшеты
            "md:text-6xl md:leading-tight", // средние планшеты
            "lg:text-7xl lg:leading-[80px]", // большие экраны
            "xl:text-[119px] xl:leading-[100px]", // десктоп (исходные значения)
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
        </p>

        <p
          className={cn(
            "font-body leading-5 md:text-center",
            // Адаптивные размеры текста для subtitle
            "text-sm", // мобильные
            "sm:text-base", // малые планшеты
            "lg:text-lg", // десктоп (исходный размер)
            isDark ? "text-white/80" : "text-accent/50",
          )}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
};

export default function OurCasesSection() {
  return (
    <section className="relative bg-[#F8F8F8]" id="cases">
      <div className="relative container pt-[200px] pb-[60px] md:py-[150px]">
        <Stepper
          value="O5"
          className="-top-[30px] left-full -translate-x-full text-[180px] md:-top-[80px] md:left-0 md:-translate-x-1/3 md:text-[380px]"
        />
        <div className="relative z-10">
          <div className="flex flex-col items-start justify-between xl:flex-row">
            <motion.h2
              initial={{ x: -80, opacity: 0, rotateY: -20 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.4, 0.25, 1],
                type: "spring",
                damping: 12,
              }}
              className="text-accent 490:text-[38px] flex-nowrap text-[32px] leading-none font-semibold tracking-tight sm:text-[48px] md:text-[64px]"
            >
              Приклади наших успішних кейсів
            </motion.h2>

            <motion.div
              initial={{ x: 70, opacity: 0, rotateY: 20 }}
              whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.25, 0.4, 0.25, 1],
                type: "spring",
                damping: 12,
              }}
              className=""
            >
              <div className="font-body mt-6 leading-5 text-[#525252] md:w-[530px] xl:mt-[41px] xl:text-right">
                Реальні суми, кейси та строки. Дані частково анонімізовано;
                фінальні умови — після KYC/AML.
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="mt-[60px] flex flex-nowrap gap-6 overflow-x-auto pb-3 md:mt-[100px]"
        >
          <div className="container">
            <div
              className="scrollbar-custom flex items-center gap-6 overflow-x-auto pb-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#000000 #e5e5e5",
              }}
            >
              <CasesCard
                variant="light"
                preTitle="€"
                title="100,000"
                subtitle={
                  <>
                    Перевод из Германии · T+3 · Цель: инвестиции <br /> в бизнес
                    · Поступление: Deutsche Bank
                  </>
                }
                delay={0}
              />
              <CasesCard
                gradientTitle
                variant="dark"
                preTitle="€"
                title="450,000"
                subtitle={
                  <>
                    Перевод из Германии · T+3 · Цель: инвестиции <br /> в бизнес
                    · Поступление: Deutsche Bank
                  </>
                }
                delay={0.12}
              />
              <CasesCard
                variant="light"
                preTitle="€"
                title="100,000"
                subtitle={
                  <>
                    Перевод из Германии · T+3 · Цель: инвестиции <br /> в бизнес
                    · Поступление: Deutsche Bank
                  </>
                }
                delay={0.24}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
