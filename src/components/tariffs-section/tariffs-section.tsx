import React, { ReactNode } from "react";
import { CustomIcon } from "../ui/custom-icon";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TariffsCardProps {
  preTitle?: string;
  title: string;
  gradientTitle?: boolean;
  variant: "dark" | "light";
  subtitle: string | ReactNode;
}

const TariffsCard = ({
  preTitle = "",
  gradientTitle = false,
  title,
  variant = "light",
  subtitle,
}: TariffsCardProps) => {
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
            "font-body text-center leading-5",
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

export default function TariffsSection() {
  return (
    <section className="bg-background relative pb-6" id="pricing">
      <div className="relative container pt-[180px] md:pt-[140px] xl:pt-[160px]">
        <Stepper
          value="O2"
          className="-top-[40px] left-full -translate-x-full text-[180px] md:left-0 md:-translate-x-1/3 md:text-[380px] xl:-top-[60px]"
        />
        <div className="relative z-10">
          <h3 className="text-accent 1315:text-[113px] flex-nowrap text-[30px] leading-none font-semibold tracking-tight sm:text-[50px] md:text-[60px] lg:text-[90px]">
            Тарифи та строки
          </h3>
          <div className="mt-[30px] flex flex-col-reverse items-start justify-between md:mt-[140px] xl:mt-[80px] xl:flex-row">
            <div className="mt-1.5 xl:mt-0 xl:translate-y-1/2">
              <div className="font-body w-full text-left text-sm leading-5 text-[#525252] md:w-[70%] md:text-base md:leading-5 xl:w-[530px]">
                Lorem ipsum dolor sit amet consectetur. Vitae euismod nulla erat
                morbi amet duis mattis. Ut neque facilisis etiam dolor mauris
                leo nisl. Sed dictum a eget vestibulum vel vitae et enim turpis.
                Nunc facilisi sed dignissim purus erat adipiscing adipiscing
                pellentesque.
              </div>
              <Link
                href="/feedback"
                className="text-accent mt-4 flex w-fit items-center gap-3 text-left font-sans text-sm font-medium md:gap-6 md:text-lg xl:flex-row"
              >
                Заполнить анкету
                <span className="scale-70 sm:scale-100">
                  <CustomIcon.ArrowLeft />
                </span>
              </Link>
            </div>
            <h2 className="text-accent flex-nowrap text-[21px] leading-none font-semibold tracking-tight sm:text-[28px] lg:text-[48px] xl:text-right xl:text-[64px]">
              Дізайтесь найголовніше
            </h2>
          </div>
          <div className="mg:mx-5 mx-0.5 mt-[60px] flex flex-nowrap gap-4 overflow-x-auto text-black md:mt-[90px] lg:gap-6">
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
            />
            <TariffsCard
              variant="light"
              preTitle="від"
              title="2%"
              subtitle={"Комісія від суми переказу"}
            />
          </div>
          <p className="font-body text-muted/50 mt-2 text-sm md:mt-4 md:text-center md:text-base">
            Строк та комісія залежать від кейсу. Детальніше — в FAQ.
          </p>
        </div>
      </div>
    </section>
  );
}
