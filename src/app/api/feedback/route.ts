import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const feedbackSchema = z.object({
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
  message: z
    .string()
    .min(1, "Повідомлення обов'язкове для заповнення")
    .min(5, "Повідомлення повинно містити мінімум 5 символів")
    .max(500, "Повідомлення не повинно перевищувати 500 символів"),
  timestamp: z.string().optional(),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function sendToTelegram(data: FeedbackData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram bot token or chat ID not configured");
    throw new Error("Telegram configuration missing");
  }

  const communicationMethodLabels = {
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    signal: "Signal",
  };

  const messageText = `
🔔 *Нова заявка зворотного зв'язку*

👤 *Ім'я:* ${data.name}
📱 *Спосіб зв'язку:* ${communicationMethodLabels[data.communicationMethod]}
📞 *Контакт:* ${data.contact}

💬 *Повідомлення:*
${data.message}

🕐 *Час:* ${data.timestamp ? new Date(data.timestamp).toLocaleString("uk-UA") : new Date().toLocaleString("uk-UA")}
  `.trim();

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      throw new Error(`Telegram API error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = feedbackSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.format(),
        },
        { status: 400 },
      );
    }

    const feedbackData = validationResult.data;

    await sendToTelegram(feedbackData);

    return NextResponse.json(
      {
        success: true,
        message: "Заявка успішно відправлена",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Сервер недоступний, спробуйте пізніше",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
