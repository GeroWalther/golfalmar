import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { NewsletterSubscriber } from "@/lib/models/newsletter-subscriber";
import { createSingleUsePromoCode } from "@/lib/stripe-coupons";
import { sendNewsletterWelcomeEmail } from "@/lib/newsletter-emails";
import { LOCALES } from "@/lib/constants";

export const runtime = "nodejs";

const Body = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  name: z.string().trim().max(120).optional(),
  locale: z.enum(LOCALES).default("en"),
  source: z.string().trim().max(60).optional(),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  await connectDB();

  // If the email is already subscribed, re-send their existing code instead
  // of creating a duplicate. Idempotent re-subscribe is the kindest UX.
  const existing = await NewsletterSubscriber.findOne({ email: parsed.email });
  if (existing && existing.discountCode) {
    if (process.env.RESEND_API_KEY) {
      try {
        await sendNewsletterWelcomeEmail({
          email: existing.email,
          name: existing.name ?? parsed.name,
          code: existing.discountCode,
          locale: existing.locale ?? parsed.locale,
        });
      } catch (e) {
        console.error("[newsletter] re-send failed", e);
      }
    }
    return NextResponse.json({
      ok: true,
      alreadySubscribed: true,
    });
  }

  // First-time subscriber path. We mint the Stripe promo code first; if that
  // fails we still want to capture the email in our DB and let the admin
  // generate a code later (graceful degradation).
  let code: string | undefined;
  let promotionCodeId: string | undefined;
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      const created = await createSingleUsePromoCode({
        customerEmail: parsed.email,
      });
      code = created.code;
      promotionCodeId = created.promotionCodeId;
    } catch (e) {
      console.error("[newsletter] promo code creation failed", e);
    }
  }

  const doc =
    existing ??
    (await NewsletterSubscriber.create({
      email: parsed.email,
      name: parsed.name,
      locale: parsed.locale,
      source: parsed.source ?? "home",
      status: "subscribed",
    }));

  if (code) {
    doc.discountCode = code;
    doc.stripePromotionCodeId = promotionCodeId;
    doc.discountIssuedAt = new Date();
    await doc.save();

    if (process.env.RESEND_API_KEY) {
      try {
        await sendNewsletterWelcomeEmail({
          email: doc.email,
          name: doc.name ?? undefined,
          code,
          locale: doc.locale ?? "en",
        });
        doc.welcomeEmailSentAt = new Date();
        await doc.save();
      } catch (e) {
        console.error("[newsletter] welcome email failed", e);
      }
    }
  }

  return NextResponse.json({ ok: true, codeIssued: Boolean(code) });
}
