"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const accumulatedScrollRef = useRef<number>(0);

  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (!scrollRef.current || isPaused) return;

        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
          accumulatedScrollRef.current = 0;
        } else {
          accumulatedScrollRef.current += speed;

          if (accumulatedScrollRef.current >= 1) {
            const pixelsToScroll = Math.floor(accumulatedScrollRef.current);
            container.scrollLeft += pixelsToScroll;
            accumulatedScrollRef.current -= pixelsToScroll;
          }
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

  const pauseTemporarily = (duration = 1000) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
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

export default AutoScrollContainer;
