import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { PRODUCTS, getProduct } from "@/lib/products";
import { clampQty } from "@/lib/cart";
import { SITE_URL, LOCALES, LOCALE_META, type Locale } from "@/lib/constants";
import { SHIPPING, SHIPPING_REGIONS } from "@/lib/shipping";
import { getSoldOutIds } from "@/lib/stock";

export const runtime = "nodejs";

const Body = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int(),
      }),
    )
    .min(1)
    .max(20),
  locale: z.enum(LOCALES).default("en"),
  shippingRegion: z.enum(SHIPPING_REGIONS).default("eu"),
});

// Stripe accepts its own locale codes; LOCALE_META carries the mapping so a
// new site language only has to be declared in one place.
type StripeCheckoutLocale = NonNullable<
  Parameters<Stripe["checkout"]["sessions"]["create"]>[0]
>["locale"];

const STRIPE_LOCALE_MAP = Object.fromEntries(
  LOCALES.map((l) => [l, LOCALE_META[l].stripe]),
) as Record<Locale, StripeCheckoutLocale>;

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // Validate every item against the hardcoded catalog. Reject unknown ids
  // rather than silently dropping — the client should always send valid SKUs,
  // and surfacing the error here helps debugging if products.ts diverges.
  const lineItems = [];
  for (const raw of parsed.items) {
    const product = getProduct(raw.productId);
    if (!product) {
      return NextResponse.json(
        { error: `unknown product: ${raw.productId}` },
        { status: 400 },
      );
    }
    const quantity = clampQty(raw.quantity);
    lineItems.push({
      quantity,
      price_data: {
        currency: product.currency,
        unit_amount: product.priceCents,
        product_data: {
          name: product.id,
          metadata: { productId: product.id },
        },
      },
    });
  }
  void PRODUCTS;

  const soldOut = await getSoldOutIds();
  const soldOutInCart = parsed.items
    .map((i) => i.productId)
    .filter((id) => soldOut.includes(id));
  if (soldOutInCart.length > 0) {
    return NextResponse.json(
      { error: "sold out", code: "SOLD_OUT", productIds: soldOutInCart },
      { status: 409 },
    );
  }

  const shipping = SHIPPING[parsed.shippingRegion];

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    locale: STRIPE_LOCALE_MAP[parsed.locale],
    line_items: lineItems,
    allow_promotion_codes: true,
    shipping_address_collection: {
      allowed_countries: shipping.countries,
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: shipping.label,
          type: "fixed_amount",
          fixed_amount: { amount: shipping.amountCents, currency: "eur" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: shipping.days[0] },
            maximum: { unit: "business_day", value: shipping.days[1] },
          },
        },
      },
    ],
    metadata: {
      locale: parsed.locale,
      cart: JSON.stringify(
        parsed.items.map((i) => ({
          productId: i.productId,
          quantity: clampQty(i.quantity),
        })),
      ),
    },
    success_url: `${SITE_URL}/${parsed.locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/${parsed.locale}/checkout/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
