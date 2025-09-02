import { cn } from "@/lib/utils";
import React from "react";

interface StepperProps {
  value: string;
  className?: string;
}

export default function Stepper({ value, className = "" }: StepperProps) {
  return (
    <span
      className={cn(
        "text-secondary font-display pointer-events-none absolute top-[70px] z-0 -translate-x-1/3 text-[380px] leading-none font-bold",
        className,
      )}
    >
      {value}
    </span>
  );
}
