import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { CustomIcon } from "../ui/custom-icon";

interface AdvantageCardProps {
  variant?: "dark" | "light";
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const AdvantageCard = ({
  variant = "light",
  icon,
  subtitle,
  title,
}: AdvantageCardProps) => {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "w-full flex-1 rounded-2xl p-6 pb-[16px] sm:rounded-4xl xl:h-[220px] xl:pb-0",
        isDark ? "bg-black" : "bg-[#F8F8F8]",
      )}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="grid h-[55px] w-[65px] place-items-center rounded-2xl bg-[#F1F1F1] md:h-[75px] md:w-[85px]">
          {icon}
        </span>
        <span
          className={cn(
            "text-[32px] sm:text-[40px]",
            isDark ? "text-white" : "text-accent",
          )}
        >
          {title}
        </span>
      </div>
      <p
        className={cn(
          "font-body mt-4 sm:max-w-[70%] md:mt-7",
          isDark ? "text-white" : "text-[#525252]",
        )}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default function AdvantageSection() {
  return (
    <section className="text-muted relative h-full bg-white pb-[60px] sm:pb-[90px]">
      <div className="relative container pt-[160px] md:pt-[182px]">
        <span className="text-secondary font-display pointer-events-none absolute top-[0px] left-full z-0 -translate-x-full text-[180px] leading-none font-bold md:top-[70px] md:left-0 md:-translate-x-1/3 md:text-[380px]">
          O1
        </span>
        <div className="relative z-10">
          <div className="flex flex-col items-start justify-between xl:flex-row">
            <h2 className="text-accent flex-nowrap text-[32px] font-semibold tracking-tight sm:text-[48px] md:text-[64px]">
              Наші переваги
            </h2>
            <div className="xl:translate-y-1/2">
              <div className="font-body mt-4 leading-5 text-[#525252] sm:my-0 md:w-[70%] xl:w-[530px] xl:text-right">
                Швидко, легально таі під ключ. Проводимо перекази будь-яких сум
                з повним супроводом на кожному етапі — від KYC/AML і договору до
                конвертації та зарахування коштів.
              </div>
              <p className="xl:text-righ text-accent mt-2 flex w-fit items-center gap-2 font-sans text-sm font-medium sm:gap-6 sm:text-lg xl:mt-0 xl:ml-auto">
                Детальніше про строки та комісії
                <span className="scale-70 sm:scale-100">
                  <CustomIcon.ArrowLeft />
                </span>
              </p>
            </div>
          </div>
          <div className="mt-[40px] flex flex-col items-center gap-4 md:mt-[140px] xl:flex-row">
            <AdvantageCard
              variant="dark"
              icon={<CustomIcon.Mark />}
              title="Швидко"
              subtitle="Процес переказу займає до 2-х тижнів."
            />

            <AdvantageCard
              variant="light"
              icon={<CustomIcon.Star />}
              title="Прозоро"
              subtitle="Фіксуємо усі комісії до переказу в договорі."
            />
            <AdvantageCard
              variant="light"
              icon={<CustomIcon.Key />}
              title="Під ключ"
              subtitle="Персональний менеджер cупроводжує процес на всіх етапах."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
