import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface RadioOptionProps {
  value: string;
  label: string | React.ReactNode;
  isSelected: boolean;
  isDisabled: boolean;
  hasError: boolean;
  onClick: (value: string) => void;
  name?: string;
  optionClassName?: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  value,
  label,
  isSelected,
  isDisabled,
  hasError,
  onClick,
  name,
  optionClassName,
}) => (
  <label
    className={cn(
      "relative flex h-[46px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border px-6 py-4 text-center transition-colors",

      hasError ? "border-red-400" : "border-black",

      isSelected ? "bg-white text-black" : "bg-gray-100 text-black",

      isDisabled && "cursor-not-allowed opacity-50",

      optionClassName,
    )}
    onClick={() => !isDisabled && onClick(value)}
  >
    {/* Hidden radio input for form compatibility */}
    <input
      type="radio"
      name={name}
      value={value}
      checked={isSelected}
      onChange={() => onClick(value)}
      disabled={isDisabled}
      className="sr-only"
    />

    {/* Option Label */}
    <span className="text-base font-medium md:text-lg">{label}</span>
  </label>
);

export interface RadioOption {
  value: string;
  label: string | React.ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string | React.ReactNode;
  error?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  wrapperClassName?: string;
  optionClassName?: string;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  wrapperClassName,
  optionClassName,
  disabled,
  direction = "horizontal",
}) => {
  const hasError = Boolean(error);

  const handleChange = (optionValue: string): void => {
    if (disabled) return;
    onChange?.(optionValue);
  };

  return (
    <div className={cn("font-manrope w-full font-medium", className)}>
      {/* Label */}
      {label && (
        <div
          className={cn(
            "mb-2 block text-lg font-medium text-black",
            disabled && "text-gray-500",
            labelClassName,
          )}
        >
          {label}
        </div>
      )}

      {/* Radio Options Wrapper */}
      <div
        className={cn(
          "flex gap-2",
          direction === "vertical" ? "flex-col" : "flex-row flex-wrap",
          wrapperClassName,
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          const isDisabled = disabled || option.disabled;

          return (
            <RadioOption
              key={option.value}
              value={option.value}
              label={option.label}
              isSelected={isSelected}
              isDisabled={isDisabled ?? false}
              hasError={hasError}
              onClick={handleChange}
              name={name}
              optionClassName={optionClassName}
            />
          );
        })}
      </div>

      {/* Error Message */}
      {hasError && (
        <p className={cn("mt-1 text-sm text-red-400", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default RadioGroup;
