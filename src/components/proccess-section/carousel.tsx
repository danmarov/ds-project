"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CustomIcon } from "../ui/custom-icon";

interface Slide {
  id: string | number;
  cardImage: string;
  cardImage2: string;
  title: string;
  description: string;
}

interface CarouselSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const CarouselSlider: React.FC<CarouselSliderProps> = ({
  slides,
  autoPlay = true,
  autoPlayDelay = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    if (!autoPlay || slides.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayDelay);
  };

  useEffect(() => {
    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayDelay, slides.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);

    startAutoPlay();
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div className="bg-accent 350:aspect-[16/12] relative mt-[30px] flex aspect-[16/13] place-items-center items-center justify-between rounded-[30px] md:mx-[52px] md:mt-15 md:aspect-[16/11] md:rounded-[48px] xl:aspect-[1179/748] xl:rounded-[64px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/carousel-backdrop.svg)",
          opacity: 0.1,
        }}
      ></div>
      {/* Декоративные звёзды */}
      <div className="absolute top-[37px] left-[143px]">
        <CustomIcon.Star2 />
      </div>
      <div className="absolute top-[77px] left-[236px]">
        <CustomIcon.Star3 />
      </div>

      {/* Слайды */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center xl:flex-row xl:justify-between"
            style={{ pointerEvents: index === currentSlide ? "auto" : "none" }}
          >
            {/* Карточки слайда */}
            <div className="absolute top-0 left-full -translate-x-[130%] -translate-y-[35%] md:-translate-y-1/3 xl:left-0 xl:-translate-x-1/6 xl:translate-y-1/6">
              <div className="pointer-events-none relative w-fit">
                <div className="350:w-[100px] relative aspect-[3/4] w-[60px] sm:w-[150px] lg:w-[200px] xl:w-[334px]">
                  <Image
                    src={slide.cardImage}
                    fill
                    alt={`Ілюстрація етапу: ${slide.title}`}
                  />
                </div>
                <div className="350:w-[100px] absolute top-0 aspect-[3/4] w-[60px] translate-x-1/2 translate-y-1/4 sm:w-[150px] lg:w-[200px] xl:w-[334px]">
                  <Image src={slide.cardImage2} alt="" fill />
                </div>
              </div>
            </div>

            {/* Контент слайда */}
            <div className="relative w-full text-white sm:ml-6 md:ml-[60px] xl:ml-0">
              <div className="relative z-10 h-full w-fit px-3 sm:w-[80%] md:w-[60%] md:px-0 xl:ml-auto">
                <h3 className="text-foreground 350:text-[28px] text-[21px] leading-none font-medium md:text-[48px] lg:text-[64px]">
                  {slide.title}
                </h3>
                <p className="font-manrope text-secondary mt-3 w-fit text-xs font-medium sm:text-sm md:mt-6 md:max-w-[580px] md:text-base">
                  {slide.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Индикаторы */}
      <nav
        aria-label="Навігація по слайдам"
        className="absolute right-[6%] bottom-[6%] flex h-2 items-center gap-1.5 sm:right-[52px] sm:bottom-[50px] md:h-4"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Перейти до слайду ${index + 1}: ${slides[index].title}`}
            className={`rounded-sm transition-all duration-300 ${
              index === currentSlide
                ? "h-1.5 w-[55px] bg-white sm:w-[75px]"
                : "bg-muted h-1.5 w-[30px] sm:w-[50px]"
            }`}
          />
        ))}
      </nav>
    </div>
  );
};

export default CarouselSlider;
