import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DS PARTNERS | Зв'язатися з нами",
  description:
    "Залишіть заявку на міжнародний переклад. Зв'язок через WhatsApp, Telegram, Signal. Професійна консультація щодо перекладів від €100K.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
