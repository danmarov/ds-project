import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DS PARTNERS | Связаться с нами",
  description:
    "Оставьте заявку на международный перевод. Связь через WhatsApp, Telegram, Signal. Профессиональная консультация по переводам от €100K.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
