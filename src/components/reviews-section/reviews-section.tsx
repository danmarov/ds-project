"use client";

import React, { ReactNode } from "react";
import Marquee from "react-fast-marquee";
import Stepper from "../ui/stepper";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ReviewCardProps {
  gradientTitle?: boolean;
  variant?: "dark" | "light";
  title: string | ReactNode;
  subtitle: string;
  location: string;
  from: string;
  textCenter?: boolean;
  delay?: number;
}

const ReviewCard = ({
  gradientTitle = false,
  textCenter = false,
  variant = "light",
  title,
  subtitle,
  location,
  from,
  delay = 0,
}: ReviewCardProps) => {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1],
        type: "spring",
        damping: 15,
      }}
      className={cn(
        "h-[295px] max-w-[400px] min-w-[385px] flex-shrink-0 cursor-pointer rounded-4xl px-6 py-[48px]",
        isDark ? "bg-accent" : "bg-secondary/20",
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.1 }}
        className={cn(
          "line-clamp-2 h-[72px] text-3xl leading-tight font-bold",
          gradientTitle && "gradient-text",
          textCenter && "text-center",
        )}
      >
        {title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.15 }}
        className={cn(
          "font-body mt-1.5 line-clamp-3 text-lg text-[#868686]",
          textCenter && "text-center",
        )}
      >
        {subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className={cn(
          "font-body mx-auto mt-4 flex items-center justify-between gap-[44px] text-lg",
          textCenter ? "w-fit" : "w-full",
          isDark ? "text-white" : "text-black",
        )}
      >
        <span>{location}</span>
        <span>{from}</span>
      </motion.p>
    </motion.div>
  );
};

export default function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-[60px] md:pt-[100px] md:pb-[120px]">
      <motion.div className="lg:h-[290px]">
        <Marquee
          direction="right"
          speed={100}
          className="bg-accent relative z-10 overflow-y-hidden pt-1 pb-2"
        >
          <p className="gradient-text 490:text-[40px] 350:text-3xl w-fit text-center text-2xl leading-none font-semibold uppercase sm:text-[60px] md:text-[80px] lg:text-[128px]">
            НАМ Довіряють
          </p>
        </Marquee>

        <motion.div className="bg-accent relative z-10 mt-4 -ml-2 w-[105vw] origin-center -rotate-6">
          <Marquee
            direction="right"
            speed={150}
            className="text-accent bg-background overflow-y-hidden pt-1 pb-2"
          >
            <p className="490:text-[40px] 350:text-3x w-fit text-center text-2xl leading-none font-semibold uppercase sm:text-[60px] md:text-[80px] lg:text-[128px]">
              ВІдгуки про НАс
            </p>
          </Marquee>
        </motion.div>
      </motion.div>

      <div className="relative">
        <Stepper
          value="O4"
          className="top-0 right-0 -translate-x-1/12 -translate-y-1/2 text-[180px] md:text-[380px]"
        />
        <div className="text-accent relative z-10 pt-[120px] md:pt-[140px]">
          <div className="container">
            {/* Контейнер со стилизованным скроллбаром */}
            <div
              className="scrollbar-custom flex items-center gap-6 overflow-x-auto pb-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#000000 #e5e5e5",
              }}
            >
              <ReviewCard
                title="Купили квартиру"
                from="И.О."
                location="Мадрид"
                subtitle="«Перевели €250k для покупки квартиры. Четкие условия, без скрытых комиссий. Деньги дошли за 2 дня.»"
                variant="light"
                delay={0}
              />
              <ReviewCard
                title="Interactive Brokers"
                from="И.О."
                location="Мадрид"
                subtitle="Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium."
                gradientTitle
                textCenter
                variant="dark"
                delay={0.1}
              />
              <ReviewCard
                title="Уставний капітал"
                from="И.О."
                location="Мадрид"
                subtitle="Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam."
                variant="light"
                delay={0.2}
              />
              <ReviewCard
                title="Уставний капітал"
                from="И.О."
                location="Мадрид"
                subtitle="Laborum quasi distinctio est et. Sequi omnis molestiae. Officia occaecati voluptatem accusantium. Et corrupti saepe quam."
                variant="light"
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
