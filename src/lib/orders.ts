import type Stripe from "stripe";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { sendOrderConfirmation } from "@/lib/emails";
import { getProduct } from "@/lib/products";
import { LOCALES } from "@/lib/constants";

/**
 * Turn a paid Checkout Session into an Order and send the confirmation emails.
 *
 * Called from both the Stripe webhook and the checkout success page, so a
 * misconfigured webhook can never lose an order. Idempotent: the order is
 * upserted on stripeSessionId and only the caller that actually inserts it
 * sends the emails.
 */
export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return null;

  await connectDB();

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

  const upsert = () => Order.findOneAndUpdate(
    { stripeSessionId: session.id },
    {
      $setOnInsert: {
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
        locale: LOCALES.find((l) => l === session.metadata?.locale) ?? "en",
        status: "paid",
      },
    },
    { upsert: true, returnDocument: "after", includeResultMetadata: true },
  );

  // Webhook and success page can race; the loser of a concurrent upsert hits
  // the unique index and should just see the existing order.
  let result;
  try {
    result = await upsert();
  } catch (e) {
    if ((e as { code?: number }).code !== 11000) throw e;
    return Order.findOne({ stripeSessionId: session.id });
  }

  const order = result.value;
  const inserted = !result.lastErrorObject?.updatedExisting;
  if (!order || !inserted) return order;

  try {
    await sendOrderConfirmation(order);
    await Order.updateOne(
      { _id: order._id },
      { $set: { confirmationSentAt: new Date() } },
    );
  } catch (e) {
    console.error("[orders] confirmation email failed:", e);
  }

  return order;
}
