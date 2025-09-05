"use client";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/ui/custom-icon";
import { Input } from "@/components/ui/input";
import RadioGroup, { RadioOption } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import Stepper from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

const communicationOptions: RadioOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "signal", label: "Signal" },
];

const step1Schema = z.object({
  name: z
    .string()
    .min(1, "Ім'я обов'язкове для заповнення")
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я не повинно перевищувати 50 символів"),
  communicationMethod: z.enum(["whatsapp", "telegram", "signal"]),
  contact: z
    .string()
    .min(1, "Контактні дані обов'язкові для заповнення")
    .refine((value) => {
      const phoneRegex = /^\+?[\d\s\-\(\)]{7,}$/;
      const usernameRegex = /^@?[a-zA-Z0-9_]{3,}$/;
      return phoneRegex.test(value) || usernameRegex.test(value);
    }, "Введіть коректний номер телефону або username"),
});

const step2Schema = z.object({
  message: z.string().optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

type FormStep = "contact" | "message" | "success" | "error";

export default function SendFeedback() {
  const [currentStep, setCurrentStep] = useState<FormStep>("contact");
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      communicationMethod: "whatsapp",
      contact: "",
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      message: "",
    },
  });

  const selectedMethod = step1Form.watch("communicationMethod");

  const onStep1Submit = async (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep("message");
  };

  const onStep2Submit = async (data: Step2Data) => {
    try {
      step2Form.setValue("message", "");

      const formData = {
        ...step1Data,
        ...data,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Помилка при відправці");
      }

      setCurrentStep("success");
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Произошла неизвестная ошибка",
      );
      setCurrentStep("error");
    }
  };

  const goBack = () => {
    setCurrentStep("contact");
    setErrorMessage("");
  };

  const getContactPlaceholder = () => {
    switch (selectedMethod) {
      case "whatsapp":
        return "+380 XX XXX XX XX";
      case "telegram":
        return "@username або +380 XX XXX XX XX";
      case "signal":
        return "+380 XX XXX XX XX";
      default:
        return "Введіть контактні дані";
    }
  };

  const getContactLabel = () => {
    switch (selectedMethod) {
      case "whatsapp":
        return "Номер телефону для WhatsApp";
      case "telegram":
        return "Username або номер телефону";
      case "signal":
        return "Номер телефону для Signal";
      default:
        return "Контактні дані";
    }
  };

  return (
    <section className="relative">
      <div className="text-accent relative container grid min-h-screen w-full place-items-stretch pt-[120px] md:pt-[200px] xl:place-items-center xl:pt-0">
        <div
          className={cn(
            "flex flex-col items-center gap-[40px] md:gap-[10%] xl:flex-row",
            currentStep === "success" && "w-full items-start",
          )}
        >
          {currentStep === "message" && (
            <Button
              variant={"outline"}
              onClick={goBack}
              className="text-accent border-accent absolute top-[80px] left-4 z-10 flex items-center gap-2 px-3 py-2 text-sm uppercase transition-opacity hover:opacity-70 md:top-[150px] md:px-4 md:py-3 md:text-lg xl:top-[170px]"
            >
              <CustomIcon.Arrow2 />
              <span> назад</span>
            </Button>
          )}

          <div className="relative mt-5 h-fit xl:h-[256px] xl:flex-1">
            {currentStep === "contact" && (
              <>
                <Stepper value="01" className="top-0 z-0 -translate-y-1/3" />

                <p className="450:text-[48px] relative z-10 font-sans text-[38px] leading-none font-semibold sm:text-[64px]">
                  Як до Вас звертатись?
                </p>
              </>
            )}

            {currentStep === "message" && (
              <>
                <Stepper value="02" className="top-0 z-0 -translate-y-1/3" />

                <p className="450:text-[48px] relative z-10 font-sans text-[38px] leading-none font-semibold sm:text-[64px]">
                  Залишити ваше повідомлен <br />
                  ня?
                </p>
              </>
            )}

            {currentStep === "success" && (
              <>
                <Stepper value="03" className="top-0 z-0 -translate-y-1/3" />

                <p className="450:text-[48px] relative z-10 font-sans text-[38px] leading-none font-semibold sm:text-[64px]">
                  Вашу заявку було <br /> надіслано!
                </p>
              </>
            )}

            {currentStep === "error" && (
              <>
                <Stepper value="03" className="top-0 z-0 -translate-y-1/3" />

                <div className="relative z-10">
                  <p className="450:text-[48px] relative z-10 font-sans text-[38px] leading-none font-semibold sm:text-[64px]">
                    Помилка!
                  </p>
                  <p className="mt-4 text-lg">{errorMessage}</p>
                  <Button
                    onClick={goBack}
                    className="text-accent border-accent mt-4 md:mt-6"
                  >
                    Спробувати знову
                  </Button>
                </div>
              </>
            )}
          </div>

          {(currentStep === "contact" || currentStep === "message") && (
            <div className="relative z-10 h-[316px] w-full shrink-0 md:w-[70%] xl:w-[60%] xl:max-w-[640px] xl:min-w-[450px]">
              {currentStep === "contact" && (
                <form
                  onSubmit={step1Form.handleSubmit(onStep1Submit)}
                  className=""
                >
                  <Input
                    label="Введіть Ваше ім'я"
                    placeholder="Введіть ваше ім'я"
                    error={step1Form.formState.errors.name?.message}
                    {...step1Form.register("name")}
                  />

                  <RadioGroup
                    label="Оберіть зручний спосіб"
                    options={communicationOptions}
                    value={selectedMethod}
                    onChange={(value) =>
                      step1Form.setValue(
                        "communicationMethod",
                        value as "whatsapp" | "telegram" | "signal",
                      )
                    }
                    name="communication-method"
                    className="mt-4 w-full"
                  />

                  <Input
                    label={getContactLabel()}
                    placeholder={getContactPlaceholder()}
                    className="mt-4"
                    error={step1Form.formState.errors.contact?.message}
                    {...step1Form.register("contact")}
                  />

                  <Button
                    type="submit"
                    disabled={step1Form.formState.isSubmitting}
                    className="text-accent group border-accent mt-4 w-full py-3 text-base uppercase disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
                  >
                    Перейти далі
                    <span className="transition-transform duration-150 group-hover:translate-x-1/5">
                      <CustomIcon.ArrowLeft />
                    </span>
                  </Button>
                </form>
              )}

              {currentStep === "message" && (
                <form
                  onSubmit={step2Form.handleSubmit(onStep2Submit)}
                  className=""
                >
                  <Input
                    label="Введіть ваше повідомлення (необовʼязково)"
                    placeholder="Напишіть ваше повідомлення..."
                    error={step2Form.formState.errors.message?.message}
                    disabled={step2Form.formState.isSubmitting}
                    {...step2Form.register("message")}
                  />

                  <Button
                    type="submit"
                    disabled={step2Form.formState.isSubmitting}
                    className="text-accent group border-accent mt-4 w-full py-3 text-base uppercase disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
                  >
                    {step2Form.formState.isSubmitting
                      ? "Відправляємо"
                      : "Підтвердити заявку"}
                    {step2Form.formState.isSubmitting ? (
                      <Loader2
                        className="text-accent ml-2 animate-spin"
                        size={18}
                        strokeWidth={2}
                      />
                    ) : (
                      <span className="ml-2 transition-transform duration-150 group-hover:translate-x-1/5">
                        <CustomIcon.ArrowLeft />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
