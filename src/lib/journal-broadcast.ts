import { getResend, FROM_EMAIL } from "./resend";
import { connectDB } from "./db";
import { NewsletterSubscriber } from "./models/newsletter-subscriber";
import { BUSINESS, SITE_URL, type Locale } from "./constants";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SUBJECT_BY_LOCALE: Record<string, (title: string) => string> = {
  en: (t) => `New from the GOLF AL MAR journal — ${t}`,
  de: (t) => `Neu im GOLF AL MAR Journal — ${t}`,
  es: (t) => `Nuevo en el journal de GOLF AL MAR — ${t}`,
  zh: (t) => `GOLF AL MAR Journal 新文章 — ${t}`,
  ja: (t) => `GOLF AL MAR ジャーナルの新着 — ${t}`,
};

const COPY_BY_LOCALE: Record<
  string,
  { eyebrow: string; cta: string; footer: string }
> = {
  en: {
    eyebrow: "New journal entry",
    cta: "Read the post",
    footer:
      "You're receiving this because you joined the GOLF AL MAR journal. Reply to unsubscribe.",
  },
  de: {
    eyebrow: "Neuer Journal-Beitrag",
    cta: "Beitrag lesen",
    footer:
      "Sie erhalten diese Nachricht, weil Sie das GOLF AL MAR Journal abonniert haben. Antworten Sie zum Abbestellen.",
  },
  es: {
    eyebrow: "Nueva entrada del journal",
    cta: "Leer el post",
    footer:
      "Recibes esto porque te uniste al journal de GOLF AL MAR. Responde para darte de baja.",
  },
  zh: {
    eyebrow: "新的 Journal 文章",
    cta: "阅读全文",
    footer:
      "您收到这封邮件是因为您订阅了 GOLF AL MAR Journal。回复此邮件即可退订。",
  },
  ja: {
    eyebrow: "新しいジャーナル記事",
    cta: "記事を読む",
    footer:
      "GOLF AL MAR ジャーナルにご登録いただいたため、このメールをお送りしています。配信停止はご返信ください。",
  },
};

type Post = {
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  locale: string;
};

function buildEmail(opts: {
  to: string;
  post: Post;
  postUrl: string;
}): { from: string; to: string; subject: string; html: string; text: string } {
  const locale = COPY_BY_LOCALE[opts.post.locale] ? opts.post.locale : "en";
  const copy = COPY_BY_LOCALE[locale];
  const subject = SUBJECT_BY_LOCALE[locale](opts.post.title);
  const cover = opts.post.coverImage
    ? opts.post.coverImage.startsWith("http")
      ? opts.post.coverImage
      : `${SITE_URL}${opts.post.coverImage}`
    : null;

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; background:#ffffff; color:#0a0a0a; padding:40px 24px; max-width:560px; margin:0 auto;">
      <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:0 0 8px;">${escapeHtml(BUSINESS.name)} · ${copy.eyebrow}</p>
      <h1 style="font-size:28px; line-height:1.15; margin:0 0 16px;">${escapeHtml(opts.post.title)}</h1>
      ${
        cover
          ? `<a href="${opts.postUrl}" style="display:block; margin:0 0 20px;"><img src="${cover}" alt="${escapeHtml(opts.post.title)}" style="width:100%; height:auto; border-radius:8px; display:block;" /></a>`
          : ""
      }
      ${
        opts.post.excerpt
          ? `<p style="font-size:16px; line-height:1.6; color:#374151; margin:0 0 24px;">${escapeHtml(opts.post.excerpt)}</p>`
          : ""
      }
      <a href="${opts.postUrl}" style="display:inline-block; padding:14px 24px; background:#0f3d2a; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600; font-size:14px; text-transform:uppercase; letter-spacing:0.04em;">
        ${copy.cta}
      </a>
      <p style="font-size:12px; color:#6b7280; margin-top:32px; line-height:1.5;">
        ${copy.footer}
      </p>
    </div>
  `;

  const text = `${opts.post.title}

${opts.post.excerpt ?? ""}

${copy.cta}: ${opts.postUrl}

— ${BUSINESS.name}`;

  return {
    from: FROM_EMAIL,
    to: opts.to,
    subject,
    html,
    text,
  };
}

/**
 * Send a journal-post notification to every subscribed newsletter subscriber
 * whose locale matches the post's locale. Uses Resend batch API
 * (max 100 per call) so a few hundred recipients cost only a few HTTP calls.
 *
 * Returns the number of recipients we successfully queued. Exceptions inside
 * a batch are caught and logged so one failed chunk doesn't block the rest.
 */
export async function broadcastJournalPost(post: Post): Promise<{
  sent: number;
  recipients: number;
}> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[journal-broadcast] RESEND_API_KEY missing — skipping send");
    return { sent: 0, recipients: 0 };
  }

  await connectDB();
  const subs = await NewsletterSubscriber.find({
    status: "subscribed",
    locale: post.locale as Locale,
  })
    .select("email")
    .lean<{ email: string }[]>();

  if (subs.length === 0) return { sent: 0, recipients: 0 };

  const postUrl = `${SITE_URL}/${post.locale}/blog/${post.slug}`;
  const emails = subs.map((s) => buildEmail({ to: s.email, post, postUrl }));

  const resend = getResend();
  let sent = 0;
  for (let i = 0; i < emails.length; i += 100) {
    const chunk = emails.slice(i, i + 100);
    try {
      await resend.batch.send(chunk);
      sent += chunk.length;
    } catch (e) {
      console.error("[journal-broadcast] batch failed", { offset: i }, e);
    }
  }
  return { sent, recipients: subs.length };
}
