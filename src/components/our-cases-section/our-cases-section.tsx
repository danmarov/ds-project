"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
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
        "w-full min-w-[280px] px-4 py-8",
        "sm:min-w-[320px] sm:px-6 sm:py-10",
        "md:w-fit md:min-w-[350px] md:px-8 md:py-12",
        "lg:min-w-[400px] lg:px-[59px] lg:py-[56px]",
        isDark ? "bg-black" : "bg-white",
      )}
    >
      <div className="space-y-3 md:space-y-4">
        <p
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
        </p>
        <p
          className={cn(
            "font-body leading-5 md:text-center",
            "text-sm",
            "sm:text-base",
            "lg:text-lg",
            isDark ? "text-white/80" : "text-accent/50",
          )}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// Простой автоскролл контейнер
const AutoScrollContainer = ({
  children,
  className = "",
  speed = 1,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (!scrollRef.current || isPaused) return;

        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }, 16); // ~60fps
    };

    if (!isPaused) {
      startAutoScroll();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, speed]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={scrollRef}
        className={cn(
          "scrollbar-hide flex items-center gap-6 overflow-x-auto overflow-y-hidden pb-3",
          className,
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
        {children}
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
        <div className="mt-[60px] md:mt-[100px]">
          <div className="container">
            <AutoScrollContainer speed={2}>
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
              />
            </AutoScrollContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
