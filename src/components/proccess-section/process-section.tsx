import React from "react";
import Stepper from "../ui/stepper";
import { CustomIcon } from "../ui/custom-icon";
import Image from "next/image";
import CarouselSlider from "./carousel";

const slides = [
  {
    id: 1,
    cardImage: "/Card.svg",
    cardImage2: "/Card-1.svg",
    title: "KYC та AML перевірка",
    description:
      "KYC/AML зазвичай 1–2 дні: паспорт/ID, адреса та документи про походження коштів на суму обміну. Персональний менеджер допоможе з документами",
  },
  {
    id: 2,
    cardImage: "/slide2-back.svg",
    cardImage2: "/slide2-front.svg",
    title: "Підписання договору",
    description:
      "Підписуємо договір на надання послуг з переказу коштів: фіксуємо суму, маршрут, комісію та строки. Підпис — дистанційно (e-signature).",
  },
  {
    id: 3,
    cardImage: "/slide3-back.svg",
    cardImage2: "/slide3-front.svg",
    title: "Відкриття рахунку",
    description:
      "Відкриваємо рахунок в обраній фінансовій установі та підтверджуємо реквізити для майбутнього зарахування EUR.",
  },
  {
    id: 4,
    cardImage: "/slide4-back.svg",
    cardImage2: "/slide4-front.svg",
    title: "Реєстрація кабінету",
    description:
      "Особистий кабінет готовий; ви поповнюєте його за допомогою USDT і конвертуєте баланс в EUR.",
  },
  {
    id: 5,
    cardImage: "/slide5-back.svg",

    cardImage2: "/slide5-front.svg",
    title: "Отримання коштів",
    description:
      "Ви виводите EUR з особистого кабінету на ваш IBAN у банку-отримувачі — проводимо settlement. Супроводжуємо на кожному кроці.",
  },
];

export default function ProcessSection() {
  return (
    <section
      className="text-accent relative overflow-hidden bg-white"
      id="process"
    >
      <div className="relative container pt-[160px]">
        <Stepper
          value="O3"
          className="text-secondary font-display pointer-events-none absolute top-[0px] left-full z-0 -translate-x-full text-[180px] leading-none font-bold md:top-[50px] md:left-0 md:-translate-x-1/3 md:text-[380px]"
        />
        <div className="relative z-10">
          <div className="flex flex-col items-start justify-between lg:flex-row">
            <h2 className="text-accent flex-nowrap text-[38px] leading-none font-semibold tracking-tight sm:text-[48px] md:text-[64px]">
              Процесс <br className="hidden md:block" /> переказу
            </h2>
            <div className="">
              <div className="font-body mt-4 w-[70%] leading-5 text-[#525252] md:mt-[21px] md:w-[530px] xl:mt-[41px] xl:text-right">
                Комісія від 2%. Фінальні умови — після KYC/AML та вибору
                маршруту.
              </div>
            </div>
          </div>
          <CarouselSlider
            slides={slides}
            autoPlay={true}
            autoPlayDelay={5000}
          />
          {/* <div
            className="bg-accent relative mx-[52px] mt-15 flex h-[748px] place-items-center items-center justify-between rounded-[64px] bg-cover bg-center"
            style={{ backgroundImage: "url(/carousel-backdrop.svg" }}
          >
            <div className="absolute top-[37px] left-[143px]">
              <CustomIcon.Star2 />
            </div>
            <div className="absolute top-[77px] left-[236px]">
              <CustomIcon.Star3 />
            </div>
            <>
              <div className="absolute top-0 -translate-x-1/4 translate-y-1/6">
                <div className="pointer-events-none relative w-fit">
                  <div className="relative aspect-[3/4] w-[334px]">
                    <Image src={"/Card.svg"} alt="" fill />
                  </div>
                  <div className="absolute top-0 aspect-[3/4] w-[334px] translate-x-1/2 translate-y-1/4">
                    <Image src={"/Card-1.svg"} alt="" fill />
                  </div>
                </div>
              </div>
              <div className="relative w-full text-white">
                <div className="relative z-10 ml-auto h-full w-[60%]">
                  <p className="text-foreground text-[64px] leading-none font-semibold">
                    KYC та AML перевірка
                  </p>
                  <p className="font-body text-secondary mt-6 max-w-[580px] text-base">
                    KYC/AML зазвичай 1–2 дні: паспорт/ID, адреса та документи
                    про походження коштів на суму обміну. Персональний менеджер
                    допоможе з документами
                  </p>
                  <div className="mt-[107px] flex h-4 w-full items-center gap-1.5">
                    <span className="h-1.5 w-[75px] rounded-sm bg-white" />
                    <span className="bg-muted h-1.5 w-[50px] rounded-sm" />
                    <span className="bg-muted h-1.5 w-[50px] rounded-sm" />
                    <span className="bg-muted h-1.5 w-[50px] rounded-sm" />
                    <span className="bg-muted h-1.5 w-[50px] rounded-sm" />
                  </div>
                </div>
              </div>
            </>
          </div> */}
        </div>
      </div>
    </section>
  );
}
