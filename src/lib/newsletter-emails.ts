import { getResend, FROM_EMAIL } from "./resend";
import { BUSINESS, SITE_URL } from "./constants";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SUBJECT_BY_LOCALE: Record<string, string> = {
  en: "Welcome to GOLF AL MAR — here's your 15% discount code",
  de: "Willkommen bei GOLF AL MAR — hier ist Ihr 15 % Rabattcode",
  es: "Bienvenido a GOLF AL MAR — aquí tienes tu código 15 % de descuento",
  zh: "欢迎来到 GOLF AL MAR — 这是您的 15% 折扣码",
  ja: "GOLF AL MAR へようこそ — 15% オフのコードをお届けします",
};

const COPY_BY_LOCALE: Record<
  string,
  {
    headline: string;
    intro: string;
    codeLabel: string;
    instructions: string;
    cta: string;
    footer: string;
    legal: string;
  }
> = {
  en: {
    headline: "Welcome aboard.",
    intro:
      "Thanks for joining the GOLF AL MAR journal. As a thank-you, here's 15% off your first order — applies to anything in the boutique.",
    codeLabel: "Your code",
    instructions:
      "Paste this code in the promo-code field at checkout. Valid for one use.",
    cta: "Shop the boutique",
    footer: "We send a few notes a season — never spam, easy to unsubscribe.",
    legal:
      "Single-use code. Cannot be combined with other promotions. Valid on www.golfalmar.com.",
  },
  de: {
    headline: "Willkommen an Bord.",
    intro:
      "Danke, dass Sie dem GOLF AL MAR Journal folgen. Als Dankeschön erhalten Sie 15 % auf Ihre erste Bestellung — gültig für alles in der Boutique.",
    codeLabel: "Ihr Code",
    instructions:
      "Fügen Sie diesen Code im Rabattfeld an der Kasse ein. Einmalig einlösbar.",
    cta: "Zur Boutique",
    footer:
      "Wir verschicken pro Saison nur wenige Notizen — kein Spam, jederzeit abbestellbar.",
    legal:
      "Einmalig einlösbar. Nicht mit anderen Aktionen kombinierbar. Gültig auf www.golfalmar.com.",
  },
  es: {
    headline: "Bienvenido a bordo.",
    intro:
      "Gracias por unirte al journal de GOLF AL MAR. Como agradecimiento, aquí tienes un 15 % de descuento en tu primer pedido — válido para todo lo de la boutique.",
    codeLabel: "Tu código",
    instructions:
      "Pega este código en el campo de promoción al pagar. Válido para un solo uso.",
    cta: "Ir a la boutique",
    footer:
      "Enviamos pocas notas por temporada — nunca spam, fácil darse de baja.",
    legal:
      "Código de un solo uso. No combinable con otras promociones. Válido en www.golfalmar.com.",
  },
  zh: {
    headline: "欢迎加入。",
    intro:
      "感谢您关注 GOLF AL MAR Journal。作为答谢，您的首单可享 15% 折扣 — 适用于精品店内的全部商品。",
    codeLabel: "您的折扣码",
    instructions: "结账时将此折扣码填入优惠码栏位。仅限使用一次。",
    cta: "前往精品店",
    footer:
      "我们每季只发送少量内容 — 绝无垃圾邮件，随时可退订。",
    legal:
      "折扣码仅限使用一次。不可与其他优惠同时使用。适用于 www.golfalmar.com。",
  },
  ja: {
    headline: "ようこそ。",
    intro:
      "GOLF AL MAR Journal にご登録いただきありがとうございます。感謝のしるしとして、初回のご注文が 15% オフになります — ブティックの全商品が対象です。",
    codeLabel: "あなたのコード",
    instructions:
      "ご購入手続きのプロモーションコード欄にこのコードを入力してください。1 回限り有効です。",
    cta: "ブティックを見る",
    footer:
      "配信はシーズンごとに数通のみ — 迷惑メールは送りません。配信停止も簡単です。",
    legal:
      "1 回限り有効なコードです。他のプロモーションとの併用はできません。www.golfalmar.com でご利用いただけます。",
  },
};

export async function sendNewsletterWelcomeEmail(opts: {
  email: string;
  name?: string;
  code: string;
  locale?: string;
}): Promise<void> {
  const locale = opts.locale && COPY_BY_LOCALE[opts.locale] ? opts.locale : "en";
  const copy = COPY_BY_LOCALE[locale];
  const subject = SUBJECT_BY_LOCALE[locale];
  const greeting = opts.name ? `${escapeHtml(opts.name)},` : copy.headline;
  const shopUrl = `${SITE_URL}/${locale}/boutique`;

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; background:#ffffff; color:#0a0a0a; padding:40px 24px; max-width:560px; margin:0 auto;">
      <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:0 0 8px;">${escapeHtml(BUSINESS.name)}</p>
      <h1 style="font-size:32px; margin:0 0 16px; line-height:1.05;">${greeting}</h1>
      <p style="font-size:16px; line-height:1.6; color:#374151; margin:0 0 24px;">
        ${copy.intro}
      </p>
      <div style="border:2px solid #0f3d2a; border-radius:8px; padding:24px; margin:0 0 16px; text-align:center; background:#f0fdf4;">
        <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#0f3d2a; margin:0 0 8px; font-weight:600;">${copy.codeLabel}</p>
        <p style="font-size:28px; font-weight:700; color:#0f3d2a; margin:0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:0.06em;">${escapeHtml(opts.code)}</p>
      </div>
      <p style="font-size:14px; line-height:1.6; color:#374151; margin:0 0 24px;">
        ${copy.instructions}
      </p>
      <a href="${shopUrl}" style="display:inline-block; padding:14px 24px; background:#0f3d2a; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600; font-size:14px; text-transform:uppercase; letter-spacing:0.04em;">
        ${copy.cta}
      </a>
      <p style="font-size:12px; color:#6b7280; margin-top:32px; line-height:1.5;">
        ${copy.footer}
      </p>
      <p style="font-size:11px; color:#9ca3af; margin-top:16px; line-height:1.5;">
        ${copy.legal}
      </p>
    </div>
  `;

  const text = `${greeting.replace(/&[^;]+;/g, "")}

${copy.intro}

${copy.codeLabel}: ${opts.code}
${copy.instructions}

${shopUrl}

— ${BUSINESS.name}`;

  const resend = getResend();
  await resend.emails.send({
    from: FROM_EMAIL,
    to: opts.email,
    subject,
    html,
    text,
  });
}
