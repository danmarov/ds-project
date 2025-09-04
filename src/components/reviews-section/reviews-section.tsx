"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";
import AutoScrollContainer from "../ui/auto-scroll-container";

interface ReviewCardProps {
  gradientTitle?: boolean;
  variant?: "dark" | "light";
  title: string | ReactNode;
  subtitle: string;
  location: string;
  from: string;
  textCenter?: boolean;
}

const ReviewCard = ({
  gradientTitle = false,
  textCenter = false,
  variant = "light",
  title,
  subtitle,
  location,
  from,
}: ReviewCardProps) => {
  const isDark = variant === "dark";
  return (
    <article
      className={cn(
        "h-[295px] max-w-[400px] min-w-[385px] flex-shrink-0 rounded-4xl px-6 py-[48px]",
        isDark ? "bg-accent" : "bg-secondary/20",
      )}
    >
      <h3
        className={cn(
          "line-clamp-2 h-[72px] text-3xl leading-tight font-bold",
          gradientTitle && "gradient-text",
          textCenter && "text-center",
        )}
      >
        {title}
      </h3>
      <blockquote
        className={cn(
          "font-manrope mt-1.5 line-clamp-3 text-base font-medium text-[#868686]",
          textCenter && "text-center",
        )}
      >
        {subtitle}
      </blockquote>
      <p
        className={cn(
          "font-manrope mx-auto mt-4 flex items-center justify-between gap-[44px] text-lg font-medium",
          textCenter ? "w-fit" : "w-full",
          isDark ? "text-white" : "text-black",
        )}
      >
        <span>{location}</span>
        <span>{from}</span>
      </p>
    </article>
  );
};

export default function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-[60px] md:pt-[100px] md:pb-[120px]">
      <div className="lg:h-[290px]">
        <Marquee
          direction="right"
          speed={100}
          className="bg-accent relative z-10 overflow-y-hidden pt-1 pb-2"
        >
          <p className="gradient-text 490:text-[40px] 350:text-3xl w-fit text-center text-2xl leading-none font-medium uppercase sm:text-[60px] md:text-[80px] lg:text-[128px]">
            НАМ Довіряють
          </p>
        </Marquee>
        <div className="bg-accent relative z-10 mt-4 -ml-2 w-[105vw] origin-center -rotate-6">
          <Marquee
            direction="right"
            speed={150}
            className="text-accent bg-background overflow-y-hidden pt-1 pb-2"
          >
            <p className="490:text-[40px] 350:text-3xl w-fit text-center text-2xl leading-none font-medium uppercase sm:text-[60px] md:text-[80px] lg:text-[128px]">
              ВІдгуки про НАс
            </p>
          </Marquee>
        </div>
      </div>

      <div className="relative">
        <h2 className="sr-only">Відгуки клієнтів</h2>
        <Stepper
          value="O4"
          className="top-0 right-0 -translate-x-1/12 -translate-y-1/2 text-[180px] md:text-[380px]"
        />
        <div className="text-accent relative z-10 pt-[120px] md:pt-[140px]">
          <div className="container">
            <AutoScrollContainer speed={1.5}>
              <ReviewCard
                title="Купівля нерухомості"
                from="І.О."
                location="Валенсія"
                subtitle="Вдалося спокійно придбати нерухомість у Валенсії. D&S допомогли переказати кошти з України на мій іспанський рахунок."
                variant="light"
              />
              <ReviewCard
                title="Interactive Brokers"
                from="Д.А."
                location="Дніпро"
                subtitle="«Дуже швидко та без проблем завів кошти з України на свій брокерський рахунок.»"
                gradientTitle
                textCenter
                variant="dark"
              />
              <ReviewCard
                title="Уставний капітал"
                from="В.М."
                location="Київ"
                subtitle="Допомогли відкрити фірму в Чехії та внести уставний капітал. Звернусь ще."
                variant="light"
              />
            </AutoScrollContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
