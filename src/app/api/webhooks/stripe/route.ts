import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { sendOrderConfirmation } from "@/lib/emails";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (e) {
    console.error("[stripe webhook] bad signature", e);
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  await connectDB();

  const existing = await Order.findOne({ stripeSessionId: session.id }).lean();
  if (existing) return NextResponse.json({ ok: true });

  // Reconstruct line items from cart metadata (line_items aren't included by default).
  let cartItems: { productId: string; quantity: number }[] = [];
  try {
    cartItems = JSON.parse(session.metadata?.cart ?? "[]");
  } catch {
    cartItems = [];
  }

  const items = cartItems
    .map((i) => {
      const product = getProduct(i.productId);
      if (!product) return null;
      return {
        productId: product.id,
        name: product.id,
        quantity: i.quantity,
        unitAmountCents: product.priceCents,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const shipping = session.collected_information?.shipping_details;
  const customerEmail = session.customer_details?.email ?? session.customer_email ?? "";
  const customerName =
    session.customer_details?.name ?? shipping?.name ?? undefined;

  const order = await Order.create({
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? undefined),
    email: customerEmail,
    name: customerName,
    shippingAddress: shipping?.address
      ? {
          line1: shipping.address.line1 ?? undefined,
          line2: shipping.address.line2 ?? undefined,
          city: shipping.address.city ?? undefined,
          postal_code: shipping.address.postal_code ?? undefined,
          state: shipping.address.state ?? undefined,
          country: shipping.address.country ?? undefined,
        }
      : undefined,
    items,
    amountTotalCents: session.amount_total ?? 0,
    shippingCents: session.shipping_cost?.amount_total ?? 0,
    currency: session.currency ?? "eur",
    locale:
      (["en", "de", "es"] as const).find(
        (l) => l === session.metadata?.locale,
      ) ?? "en",
    status: "paid",
  });

  try {
    await sendOrderConfirmation(order);
    order.confirmationSentAt = new Date();
    await order.save();
  } catch (e) {
    console.error("[stripe webhook] email send failed:", e);
  }

  return NextResponse.json({ received: true });
}
