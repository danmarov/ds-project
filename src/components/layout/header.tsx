"use client";
import React, { useState, useEffect } from "react";
import { CustomIcon } from "../ui/custom-icon";
import Link from "next/link";
import { Button } from "../ui/button";
import { AlignJustify, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface NavigationItem {
  title: string;
  href: string;
  isAnchor?: boolean;
}

interface NavLinkProps {
  item: NavigationItem;
  onClick?: () => void;
  className?: string;
}

const navigationMenu: NavigationItem[] = [
  {
    title: "Процес",
    href: "#process",
    isAnchor: true,
  },
  {
    title: "Тарифи",
    href: "#pricing",
    isAnchor: true,
  },
  {
    title: "Кейси",
    href: "#cases",
    isAnchor: true,
  },
  {
    title: "Faq",
    href: "#faq",
    isAnchor: true,
  },
];

// Массив путей, где шапка должна быть черной изначально
const blackHeaderPaths: string[] = ["/feedback"];

// Функция для плавной прокрутки к элементу
const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId.replace("#", ""));
  if (element) {
    const headerHeight = 80; // Высота хедера
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Хук для отслеживания активной секции (определяем, находимся ли мы в hero или footer)
const useHeaderTextColor = (): boolean => {
  const [shouldTextBeWhite, setShouldTextBeWhite] = useState<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.target.id === "hero" && entry.isIntersecting) {
            setShouldTextBeWhite(true);
          } else if (entry.target.id === "footer" && entry.isIntersecting) {
            setShouldTextBeWhite(true);
          } else if (entry.isIntersecting) {
            // Если любая другая секция активна
            setShouldTextBeWhite(false);
          }
        });
      },
      {
        threshold: 0.3, // Секция считается активной когда видна на 30%
        // rootMargin: "-80px 0px 0px 0px", // Учитываем высоту хедера
      },
    );

    // Наблюдаем за hero, footer и всеми остальными секциями
    const heroElement = document.getElementById("hero");
    const footerElement = document.getElementById("footer");

    if (heroElement) {
      observer.observe(heroElement);
    }
    if (footerElement) {
      observer.observe(footerElement);
    }

    // Наблюдаем за остальными секциями из навигации
    navigationMenu.forEach(({ href }) => {
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return shouldTextBeWhite;
};

// Компонент для обработки ссылок
const NavLink: React.FC<NavLinkProps> = ({ item, onClick, className }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (item.isAnchor) {
      e.preventDefault();
      scrollToElement(item.href);
    }
    onClick?.();
  };

  if (item.isAnchor) {
    return (
      <a href={item.href} onClick={handleClick} className={className}>
        {item.title}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.title}
    </Link>
  );
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const shouldTextBeWhite = useHeaderTextColor();

  // Проверяем, должна ли шапка быть черной на текущей странице
  const shouldBeBlack: boolean = blackHeaderPaths.includes(pathname);

  // Определяем, должен ли текст быть черным (акцентным)
  const shouldTextBeBlack: boolean = shouldBeBlack || !shouldTextBeWhite;

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-30 mx-auto flex max-w-[1344px] items-center justify-between bg-white/80 px-4 pt-6 pb-6 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none",
          // Мобильное меню всегда черное
          isMobileMenuOpen && "text-black lg:bg-transparent",
          // Динамический цвет текста на десктопе - УБРАЛ transition-all отсюда
          shouldTextBeBlack && !isMobileMenuOpen && "lg:text-black",
          !shouldTextBeBlack && !isMobileMenuOpen && "lg:text-white",
        )}
      >
        <Link href={"/"}>
          <CustomIcon.Logo
            className={cn(
              "w-[220px] xl:h-[29px] xl:w-[244px]",
              // Логотип - синхронизируем transition с остальными элементами
              "transition-colors duration-300 ease-in-out",
              // Логотип всегда черный на мобильном меню или когда нужен черный текст
              isMobileMenuOpen || shouldTextBeBlack
                ? "text-black"
                : "lg:text-white",
            )}
          />
        </Link>
        <button
          className="relative right-0 z-40 block rounded-sm p-1.5 lg:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <AlignJustify
            className={cn(
              "h-6 w-6 transition-colors duration-300 ease-in-out",
              isMobileMenuOpen
                ? "scale-0 rotate-90 text-black"
                : "scale-100 rotate-0",
              !isMobileMenuOpen && shouldTextBeBlack && "text-black",
              !isMobileMenuOpen && !shouldTextBeBlack && "lg:text-white",
            )}
          />
          <X
            className={cn(
              "absolute top-1.5 left-1.5 h-6 w-6 transition-colors duration-300 ease-in-out",
              isMobileMenuOpen
                ? "scale-100 rotate-0 text-black"
                : "scale-0 -rotate-90",
            )}
          />
        </button>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-10 text-sm font-medium uppercase xl:gap-14 xl:text-base">
            {navigationMenu.map((item) => (
              <li key={item.title}>
                <NavLink
                  item={item}
                  className="transition-colors duration-300 ease-in-out hover:opacity-70"
                />
              </li>
            ))}
            <li>
              <Link href={"/feedback"}>
                <Button
                  variant={"outline"}
                  className={cn(
                    "gap-3 uppercase transition-colors duration-300 ease-in-out",
                    shouldTextBeBlack
                      ? "border-black text-black hover:bg-black hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-black",
                  )}
                >
                  <CustomIcon.Menu />
                  залишити заявку
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 right-0 left-0 z-20 origin-top bg-white pt-[84px] text-black lg:hidden"
          >
            <nav className="px-4 py-6 pt-1">
              <ul className="flex flex-col gap-6">
                {navigationMenu.map((item) => (
                  <li key={item.title}>
                    <NavLink
                      item={item}
                      onClick={closeMobileMenu}
                      className="block text-sm font-medium uppercase transition-colors hover:text-gray-600 sm:text-lg"
                    />
                  </li>
                ))}
                <li className="pt-2">
                  <Link href={"/feedback"}>
                    <Button
                      variant={"outline"}
                      className="w-full justify-center gap-2 border-black text-sm text-black uppercase hover:bg-black hover:text-white sm:gap-3 sm:text-base"
                      onClick={closeMobileMenu}
                    >
                      <CustomIcon.Menu className="size-4 sm:size-5" />
                      залишити заявку
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
