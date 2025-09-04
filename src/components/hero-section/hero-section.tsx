"use client";

import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/components/ui/custom-icon";
import MobileDecoration from "./mobile-decoration";
import DesktopDecoration from "./desktop-decoration";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CONSTS } from "@/lib/consts";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="b relative grid h-[100svh] place-items-center bg-[#034ab9]"
    >
      <Image
        src="/hero-background.png"
        alt=""
        fill
        className="object-cover object-center"
        priority
        quality={85}
        sizes="100vw"
      />
      <MobileDecoration />

      <div className="section h-full backdrop-blur-xs md:backdrop-blur-none">
        <DesktopDecoration />
        <div className="relative z-10 container grid h-full place-items-center pb-[150px] md:block md:pt-[190px]">
          <div className="">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="text-3xl font-semibold uppercase sm:text-6xl md:text-6xl md:leading-none lg:text-7xl xl:text-[84px]"
            >
              Легальний шлях Переказу коштів закордон
            </motion.h1>

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
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 0,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="font-manrope absolute right-4 bottom-8 w-[calc(100%_-_32px)] border-b border-white pb-1.5 text-right text-xs font-semibold sm:w-[425px] sm:text-sm md:bottom-16 md:text-base"
          >
            Швидко, легально і під ключ: KYC/AML, договір, конвертація та
            зарахування. Комісія від 2%. <br />
            Допоможемо вирішити будь-яке фін. питання
          </motion.div>
        </div>
      </div>
    </section>
  );
}
