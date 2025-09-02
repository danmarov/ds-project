import React, { ReactNode } from "react";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";

interface CasesCardProps {
  preTitle?: string;
  title: string;
  gradientTitle?: boolean;
  variant: "dark" | "light";
  subtitle: string | ReactNode;
}

const CasesCard = ({
  preTitle = "",
  gradientTitle = false,
  title,
  variant = "light",
  subtitle,
}: CasesCardProps) => {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "grid flex-shrink-0 place-items-center rounded-[20px] md:rounded-[40px]",
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
    </div>
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
            <h2 className="text-accent 490:text-[38px] flex-nowrap text-[32px] leading-none font-semibold tracking-tight sm:text-[48px] md:text-[64px]">
              Приклади наших успішних кейсів
            </h2>
            <div className="">
              <div className="font-body mt-6 leading-5 text-[#525252] md:w-[530px] xl:mt-[41px] xl:text-right">
                Реальні суми, кейси та строки. Дані частково анонімізовано;
                фінальні умови — після KYC/AML.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[60px] flex flex-nowrap gap-6 overflow-x-auto md:mt-[100px]">
          <CasesCard
            variant="light"
            preTitle="€"
            title="100,000"
            subtitle={
              <>
                Перевод из Германии · T+3 · Цель: инвестиции <br /> в бизнес ·
                Поступление: Deutsche Bank
              </>
            }
          />
          <CasesCard
            gradientTitle
            variant="dark"
            preTitle="€"
            title="450,000"
            subtitle={
              <>
                Перевод из Германии · T+3 · Цель: инвестиции <br /> в бизнес ·
                Поступление: Deutsche Bank
              </>
            }
          />
          <CasesCard
            variant="light"
            preTitle="€"
            title="100,000"
            subtitle={
              <>
                Перевод из Германии · T+3 · Цель: инвестиции <br /> в бизнес ·
                Поступление: Deutsche Bank
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
