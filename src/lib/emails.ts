import { getResend, FROM_EMAIL, OWNER_EMAIL } from "./resend";
import { BUSINESS } from "./constants";
import type { OrderDoc } from "./models/order";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatEUR(cents: number, locale = "en"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function buildItemsRows(order: OrderDoc, locale: string): string {
  return order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px; color:#0a0a0a;">
          ${escapeHtml(i.name)}
          <span style="color:#6b7280; font-size:13px;"> × ${i.quantity}</span>
        </td>
        <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; font-size:14px; color:#0a0a0a; text-align:right; white-space:nowrap;">
          ${formatEUR(i.unitAmountCents * i.quantity, locale)}
        </td>
      </tr>`,
    )
    .join("");
}

function buildAddressBlock(order: OrderDoc): string {
  const a = order.shippingAddress;
  if (!a) return "";
  const lines = [
    a.line1,
    a.line2,
    [a.postal_code, a.city].filter(Boolean).join(" "),
    [a.state, a.country].filter(Boolean).join(", "),
  ].filter(Boolean);
  return lines.map((l) => escapeHtml(l!)).join("<br/>");
}

export async function sendOrderConfirmation(order: OrderDoc) {
  const locale = order.locale ?? "en";
  const resend = getResend();
  const itemsRows = buildItemsRows(order, locale);
  const total = formatEUR(order.amountTotalCents, locale);
  const shipping = order.shippingCents
    ? formatEUR(order.shippingCents, locale)
    : null;
  const addressBlock = buildAddressBlock(order);
  const customerName = order.name ?? order.email;

  const customerHtml = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; background:#ffffff; color:#0a0a0a; padding:40px 24px; max-width:560px; margin:0 auto;">
      <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:0 0 8px;">${escapeHtml(BUSINESS.name)}</p>
      <h1 style="font-size:32px; margin:0 0 16px; line-height:1.05;">Thank you, ${escapeHtml(customerName)}.</h1>
      <p style="font-size:16px; line-height:1.6; color:#374151; margin:0 0 24px;">
        Your order is confirmed. We'll send tracking as soon as it ships.
      </p>
      <table style="width:100%; border-collapse:collapse; margin:0 0 16px;">
        ${itemsRows}
        ${
          shipping
            ? `<tr>
              <td style="padding:12px 0; font-size:13px; color:#6b7280;">Shipping</td>
              <td style="padding:12px 0; font-size:13px; color:#0a0a0a; text-align:right;">${shipping}</td>
            </tr>`
            : ""
        }
        <tr>
          <td style="padding:16px 0 0; font-size:14px; font-weight:700; color:#0a0a0a;">Total</td>
          <td style="padding:16px 0 0; font-size:18px; font-weight:700; color:#0a0a0a; text-align:right;">${total}</td>
        </tr>
      </table>
      ${
        addressBlock
          ? `<div style="border:1px solid #e5e7eb; border-radius:6px; padding:16px; margin-top:16px;">
              <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:0 0 8px;">Shipping to</p>
              <p style="font-size:14px; color:#0a0a0a; margin:0; line-height:1.5;">${addressBlock}</p>
            </div>`
          : ""
      }
      <p style="font-size:13px; color:#6b7280; margin-top:32px;">— ${escapeHtml(BUSINESS.name)}</p>
    </div>
  `;

  const customerText = `Thank you for your order.

${order.items
  .map((i) => `${i.name} × ${i.quantity} — ${formatEUR(i.unitAmountCents * i.quantity, locale)}`)
  .join("\n")}
${shipping ? `Shipping: ${shipping}\n` : ""}
Total: ${total}

— ${BUSINESS.name}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `${BUSINESS.name} — order confirmed`,
    html: customerHtml,
    text: customerText,
  });

  // Owner notification
  const ownerHtml = `
    <div style="font-family: ui-sans-serif, system-ui, sans-serif; padding:24px; max-width:600px; color:#0a0a0a;">
      <h2 style="margin:0 0 12px; font-size:20px;">New order — ${total}</h2>
      <p style="margin:0 0 16px; color:#374151;">From: <b>${escapeHtml(customerName)}</b> &lt;${escapeHtml(order.email)}&gt;</p>
      <table style="width:100%; border-collapse:collapse;">${itemsRows}
        <tr>
          <td style="padding:12px 0; font-weight:700;">Total</td>
          <td style="padding:12px 0; font-weight:700; text-align:right;">${total}</td>
        </tr>
      </table>
      ${addressBlock ? `<p style="margin-top:16px;"><b>Ship to:</b><br/>${addressBlock}</p>` : ""}
      <p style="margin-top:16px; font-size:12px; color:#6b7280;">Stripe session: ${escapeHtml(order.stripeSessionId)}</p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: OWNER_EMAIL,
    subject: `New ${BUSINESS.name} order — ${total} — ${order.email}`,
    html: ownerHtml,
    text: `New order ${total} from ${order.email}\n${order.items.map((i) => `${i.name} × ${i.quantity}`).join("\n")}`,
  });
}

export async function sendShippedNotification(order: OrderDoc) {
  if (!order.trackingNumber) {
    throw new Error("trackingNumber required to send shipped notification");
  }
  const locale = order.locale ?? "en";
  const resend = getResend();
  const customerName = order.name ?? order.email;
  const itemsRows = buildItemsRows(order, locale);
  const trackBlock = order.trackingUrl
    ? `<a href="${escapeHtml(order.trackingUrl)}" style="display:inline-block; margin-top:8px; padding:12px 20px; background:#0f3d2a; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:600;">Track your order</a>`
    : "";

  const customerHtml = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif; background:#ffffff; color:#0a0a0a; padding:40px 24px; max-width:560px; margin:0 auto;">
      <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:0 0 8px;">${escapeHtml(BUSINESS.name)}</p>
      <h1 style="font-size:32px; margin:0 0 16px; line-height:1.05;">Hey ${escapeHtml(customerName)},</h1>
      <p style="font-size:18px; line-height:1.5; color:#0a0a0a; margin:0 0 8px; font-weight:600;">your order is on its way.</p>
      <p style="font-size:15px; line-height:1.6; color:#374151; margin:8px 0 24px;">
        We just handed it off to the courier. Use the tracking number below to follow it to your door.
      </p>
      <div style="border:1px solid #e5e7eb; border-radius:6px; padding:16px 18px; margin:0 0 16px;">
        <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:0 0 6px;">Tracking number</p>
        <p style="font-size:20px; font-weight:700; color:#0a0a0a; margin:0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:0.02em;">${escapeHtml(order.trackingNumber)}</p>
        ${trackBlock}
      </div>
      <p style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6b7280; margin:24px 0 8px;">In your order</p>
      <table style="width:100%; border-collapse:collapse; margin:0 0 16px;">${itemsRows}</table>
      <p style="font-size:13px; color:#6b7280; margin-top:32px;">Thanks for choosing ${escapeHtml(BUSINESS.name)}.</p>
    </div>
  `;

  const trackText = order.trackingUrl ? `\nTrack your order: ${order.trackingUrl}` : "";
  const customerText = `Your ${BUSINESS.name} order is on its way.

Tracking number: ${order.trackingNumber}${trackText}

${order.items.map((i) => `${i.name} × ${i.quantity}`).join("\n")}

— ${BUSINESS.name}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `${BUSINESS.name} — your order has shipped`,
    html: customerHtml,
    text: customerText,
  });
}
