import { cn } from "@/lib/utils";
import React, { forwardRef, ReactNode } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string | ReactNode;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      prefix,
      suffix,
      className,
      inputClassName,
      labelClassName,
      errorClassName,
      wrapperClassName,
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const hasPrefix = Boolean(prefix);
    const hasSuffix = Boolean(suffix);

    return (
      <div className={cn("font-manrope w-full font-semibold", className)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              "font-manrope mb-2 block text-lg font-medium text-[#1A1A1A]",
              disabled && "text-gray-500",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        {/* Input Wrapper */}
        <div
          className={cn(
            "relative flex items-center overflow-hidden rounded-[24px] border bg-[#F1F1F1] transition-colors",
            hasError
              ? "border-red-400 focus-within:border-red-400"
              : "border-[#1A1A1A] focus-within:border-[#1A1A1A]",
            disabled && "cursor-not-allowed opacity-50",
            wrapperClassName,
          )}
        >
          {/* Prefix */}
          {hasPrefix && (
            <div className="flex items-center pl-3 text-gray-600">{prefix}</div>
          )}

          {/* Input */}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              "flex-1 bg-transparent px-3 py-2 text-[#1A1A1A] placeholder-gray-500 outline-none",
              hasPrefix && "pl-1",
              hasSuffix && "pr-1",
              disabled && "cursor-not-allowed",
              inputClassName,
            )}
            {...props}
          />

          {/* Suffix */}
          {hasSuffix && (
            <div className="flex items-center pr-3 text-gray-600">{suffix}</div>
          )}
        </div>

        {/* Error Message */}
        {hasError && (
          <p className={cn("mt-1 text-sm text-red-400", errorClassName)}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
