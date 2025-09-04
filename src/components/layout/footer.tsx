"use client";
import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { CustomIcon } from "../ui/custom-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CONSTS } from "@/lib/consts";

const SocialBackdrop = ({ children }: PropsWithChildren) => {
  return (
    <span className="relative grid place-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={54}
        height={54}
        viewBox="0 0 54 54"
        fill="none"
      >
        <path
          d="M0 27C0 12.0883 12.0883 0 27 0H38.5714C47.0924 0 54 6.90761 54 15.4286V38.5714C54 47.0924 47.0924 54 38.5714 54H27C12.0883 54 0 41.9117 0 27Z"
          fill="white"
        />
      </svg>
      <span className="absolute">{children}</span>
    </span>
  );
};

const blackHeaderPaths = ["/feedback"];

export default function Footer() {
  const pathname = usePathname();

  const shouldBeShort = blackHeaderPaths.includes(pathname);

  return (
    <footer
      id="footer"
      className={cn(
        "bg-accent relative bg-cover bg-center bg-no-repeat text-white",
        shouldBeShort ? "" : "xl:aspect-[120/73]",
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/footer-backdrop.svg)",
          opacity: 0.1,
        }}
      ></div>
      <div
        className={cn(
          "relative z-10 container flex h-full flex-col justify-between",
          shouldBeShort
            ? "py-[40px] md:py-[60px]"
            : "py-[60px] md:pt-[136px] md:pb-[100px]",
        )}
      >
        {!shouldBeShort && (
          <div className="">
            <h1 className="text-2xl font-medium uppercase sm:text-2xl md:text-2xl md:leading-none lg:text-7xl xl:text-[84px]">
              Легальний шлях Переказу{" "}
              <br className="hidden sm:block md:hidden" />
              коштів закордон
            </h1>

            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row">
              <Link href={"/feedback"} className="w-full md:w-fit">
                <Button
                  className="group w-full gap-6 px-6 leading-relaxed md:w-fit"
                  variant={"accent"}
                >
                  Залишити заявку
                  <span className="transition-transform duration-150 group-hover:translate-x-1/5">
                    <CustomIcon.ArrowLeft />
                  </span>
                </Button>
              </Link>

              <Link href={CONSTS.direct_contact} className="w-full md:w-fit">
                <Button
                  className="w-full px-6 leading-relaxed md:w-fit"
                  variant={"outline"}
                >
                  Звʼязатись напряму
                </Button>
              </Link>
            </div>
          </div>
        )}
        <div className={cn("", shouldBeShort ? "" : "mt-[60px] xl:mt-0")}>
          {/* Верхняя секция с логотипом и контактами */}
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:gap-0">
            {/* Логотип */}
            <Link href={"/"} className="flex justify-center xl:justify-start">
              <CustomIcon.Logo />
            </Link>

            {/* Контакты */}
            <ul className="font-manrope flex flex-col items-center justify-center gap-4 font-medium text-white sm:flex-row xl:ml-auto xl:flex-row xl:gap-5">
              <li className="flex w-full items-center justify-center gap-[14px] sm:w-auto xl:justify-start">
                <SocialBackdrop>
                  <CustomIcon.Whatsapp />
                </SocialBackdrop>
                <span className="text-sm sm:text-base">{CONSTS.whatsapp}</span>
              </li>
              <li className="flex w-full items-center justify-center gap-[14px] sm:w-auto xl:justify-start">
                <SocialBackdrop>
                  <CustomIcon.Telegram />
                </SocialBackdrop>
                <span className="text-sm sm:text-base">{CONSTS.telegram}</span>
              </li>
              <li className="flex w-full items-center justify-center gap-[14px] sm:w-auto xl:justify-start">
                <SocialBackdrop>
                  <CustomIcon.SocialMessage />
                </SocialBackdrop>
                <span className="text-sm sm:text-base">{CONSTS.signal}</span>
              </li>
            </ul>
          </div>

          {/* Нижняя секция с юридической информацией */}
          <div className="font-manrope mt-8 font-medium xl:mt-15">
            {/* Мобильная версия - стек */}
            <div className="flex flex-col gap-4 text-center text-[#F8F8F8] xl:hidden">
              <div className="text-base">
                @{new Date().getFullYear()} D&S Partners All Rights Reserved
              </div>
              <div className="flex flex-col justify-center gap-3 text-sm sm:flex-row sm:gap-6">
                <span className="cursor-pointer transition-colors hover:text-white">
                  Terms & Agreements
                </span>
                <span className="cursor-pointer transition-colors hover:text-white">
                  Privacy Policy
                </span>
              </div>
            </div>

            {/* Десктопная версия - оригинальная разметка */}
            <ul className="hidden items-center text-lg text-[#F8F8F8] xl:flex">
              <li className="flex-1 cursor-pointer transition-colors hover:text-white">
                Terms & Agreements
              </li>
              <li className="flex-1 text-center">
                @{new Date().getFullYear()} D&S Partners All Rights Reserved
              </li>
              <li className="flex-1 cursor-pointer text-right transition-colors hover:text-white">
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
