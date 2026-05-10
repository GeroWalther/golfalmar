import { getStripe } from "./stripe";
import { randomBytes } from "node:crypto";

const NEWSLETTER_COUPON_ID = "GOLFALMAR_NEWSLETTER15";

let cachedCouponId: string | null = null;

/**
 * Lazily ensure the 15%-off newsletter coupon exists in Stripe. Idempotent —
 * Stripe returns the existing coupon if the ID is already in use, otherwise
 * we create it once. Cached in-process so we only hit Stripe on cold start.
 */
async function ensureNewsletterCoupon(): Promise<string> {
  if (cachedCouponId) return cachedCouponId;
  const stripe = getStripe();
  try {
    const existing = await stripe.coupons.retrieve(NEWSLETTER_COUPON_ID);
    cachedCouponId = existing.id;
    return cachedCouponId;
  } catch (e: unknown) {
    const err = e as { code?: string; statusCode?: number };
    if (err?.code !== "resource_missing" && err?.statusCode !== 404) {
      throw e;
    }
  }
  const created = await stripe.coupons.create({
    id: NEWSLETTER_COUPON_ID,
    name: "Newsletter welcome 15% off",
    percent_off: 15,
    duration: "once",
  });
  cachedCouponId = created.id;
  return cachedCouponId;
}

function generateHumanCode(prefix = "GAM"): string {
  // Avoids ambiguous characters (0/O, 1/I/L) so customers can copy-type
  // the code without confusion.
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(8);
  let s = "";
  for (let i = 0; i < bytes.length; i++) {
    s += alphabet[bytes[i] % alphabet.length];
  }
  return `${prefix}-${s.slice(0, 4)}-${s.slice(4)}`;
}

export type CreatedPromoCode = {
  code: string;
  promotionCodeId: string;
};

/**
 * Create a unique, single-use 15%-off promotion code for one subscriber.
 * Tries up to 3 times if a code collides (extremely unlikely, but handled).
 */
export async function createSingleUsePromoCode(opts: {
  customerEmail?: string;
}): Promise<CreatedPromoCode> {
  const stripe = getStripe();
  const couponId = await ensureNewsletterCoupon();

  for (let attempt = 0; attempt < 3; attempt++) {
    const code = generateHumanCode();
    try {
      const promo = await stripe.promotionCodes.create({
        promotion: { type: "coupon", coupon: couponId },
        code,
        max_redemptions: 1,
        metadata: opts.customerEmail
          ? { source: "newsletter", email: opts.customerEmail }
          : { source: "newsletter" },
      });
      return { code: promo.code, promotionCodeId: promo.id };
    } catch (e: unknown) {
      const err = e as { code?: string; message?: string };
      // The `code` field must be unique; on collision try a different one.
      if (err?.message?.includes("already been used")) continue;
      throw e;
    }
  }
  throw new Error("Could not generate unique promo code after 3 attempts");
}
