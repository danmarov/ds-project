"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "h-[295px] max-w-[400px] min-w-[385px] flex-shrink-0 rounded-4xl px-6 py-[48px]",
        isDark ? "bg-accent" : "bg-secondary/20",
      )}
    >
      <p
        className={cn(
          "line-clamp-2 h-[72px] text-3xl leading-tight font-bold",
          gradientTitle && "gradient-text",
          textCenter && "text-center",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "font-body mt-1.5 line-clamp-3 text-lg text-[#868686]",
          textCenter && "text-center",
        )}
      >
        {subtitle}
      </p>
      <p
        className={cn(
          "font-body mx-auto mt-4 flex items-center justify-between gap-[44px] text-lg",
          textCenter ? "w-fit" : "w-full",
          isDark ? "text-white" : "text-black",
        )}
      >
        <span>{location}</span>
        <span>{from}</span>
      </p>
    </div>
  );
};

// Автоскролл контейнер для отзывов
const AutoScrollReviews = ({
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
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      }, 16);
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

  // Функция для временной паузы
  const pauseTemporarily = (duration = 1000) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  };

  // Обработчики событий
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Универсальные обработчики для мобилок
  const handleTouchStart = () => pauseTemporarily(1000);
  const handleTouchMove = () => pauseTemporarily(1000);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {children}
        {children}
      </div>
    </div>
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
          <p className="gradient-text 490:text-[40px] 350:text-3xl w-fit text-center text-2xl leading-none font-semibold uppercase sm:text-[60px] md:text-[80px] lg:text-[128px]">
            НАМ Довіряють
          </p>
        </Marquee>
        <div className="bg-accent relative z-10 mt-4 -ml-2 w-[105vw] origin-center -rotate-6">
          <Marquee
            direction="right"
            speed={150}
            className="text-accent bg-background overflow-y-hidden pt-1 pb-2"
          >
            <p className="490:text-[40px] 350:text-3x w-fit text-center text-2xl leading-none font-semibold uppercase sm:text-[60px] md:text-[80px] lg:text-[128px]">
              ВІдгуки про НАс
            </p>
          </Marquee>
        </div>
      </div>

      <div className="relative">
        <Stepper
          value="O4"
          className="top-0 right-0 -translate-x-1/12 -translate-y-1/2 text-[180px] md:text-[380px]"
        />
        <div className="text-accent relative z-10 pt-[120px] md:pt-[140px]">
          <div className="container">
            <AutoScrollReviews speed={1.5}>
              <ReviewCard
                title="Купили квартиру"
                from="И.О."
                location="Мадрид"
                subtitle="«Перевели €250k для покупки квартиры. Четкие условия, без скрытых комиссий. Деньги дошли за 2 дня.»"
                variant="light"
              />
              <ReviewCard
                title="Interactive Brokers"
                from="И.О."
                location="Мадрид"
                subtitle="Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium."
                gradientTitle
                textCenter
                variant="dark"
              />
              <ReviewCard
                title="Уставний капітал"
                from="И.О."
                location="Мадрид"
                subtitle="Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam."
                variant="light"
              />
              <ReviewCard
                title="Уставний капітал"
                from="И.О."
                location="Мадрид"
                subtitle="Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam."
                variant="light"
              />
            </AutoScrollReviews>
          </div>
        </div>
      </div>
    </section>
  );
}
