import type { Metadata } from "next";
import {
  Unbounded,
  Archivo,
  Inter,
  Bricolage_Grotesque,
} from "next/font/google";
import "../styles/globals.css";
import { PropsWithChildren } from "react";
import { MainLayout } from "@/components/layout";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DS PARTNERS | Международные переводы",
  description:
    "Крупные международные переводы от €100K. Инвестиции в недвижимость и бизнес. Проверенные кейсы, прозрачные условия.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${unbounded.variable} ${archivo.variable} ${bricolage.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
