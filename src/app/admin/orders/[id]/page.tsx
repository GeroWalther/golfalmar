import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusActions } from "@/components/admin/order-status-actions";
import { OrderTrackingForm } from "@/components/admin/order-tracking-form";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { formatCents } from "@/lib/admin/dashboard-data";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!Types.ObjectId.isValid(id)) notFound();

  await connectDB();
  const order = await Order.findById(id).lean();
  if (!order) notFound();

  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const subtotalCents =
    (order.items ?? []).reduce(
      (s, i) => s + i.unitAmountCents * i.quantity,
      0,
    ) ?? 0;

  const a = order.shippingAddress;

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All orders
        </Link>

        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Order</p>
            <h1 className="display text-3xl mt-1">
              {order.name || order.email}
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              {dateFmt.format(order.createdAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <OrderStatusBadge status={order.status} />
            <p className="font-heading text-3xl font-extrabold">
              {formatCents(order.amountTotalCents ?? 0)}
            </p>
          </div>
        </header>

        <section className="rounded-md border border-border bg-card">
          <div className="border-b border-border px-5 py-3">
            <p className="eyebrow">Items</p>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {(order.items ?? []).map((i) => (
                <tr key={i.productId} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium">{i.productId}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCents(i.unitAmountCents)} each
                    </p>
                  </td>
                  <td className="px-5 py-3 text-right font-mono text-sm">
                    × {i.quantity}
                  </td>
                  <td className="px-5 py-3 text-right font-mono font-semibold">
                    {formatCents(i.unitAmountCents * i.quantity)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="px-5 py-2 text-right text-xs text-muted-foreground">
                  Subtotal
                </td>
                <td className="px-5 py-2 text-right font-mono">
                  {formatCents(subtotalCents)}
                </td>
              </tr>
              {order.shippingCents ? (
                <tr>
                  <td colSpan={2} className="px-5 py-2 text-right text-xs text-muted-foreground">
                    Shipping
                  </td>
                  <td className="px-5 py-2 text-right font-mono">
                    {formatCents(order.shippingCents)}
                  </td>
                </tr>
              ) : null}
              <tr className="border-t border-border">
                <td colSpan={2} className="px-5 py-3 text-right font-semibold">
                  Total
                </td>
                <td className="px-5 py-3 text-right font-mono font-bold text-lg">
                  {formatCents(order.amountTotalCents ?? 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-md border border-border bg-card p-5 space-y-2">
            <p className="eyebrow">Customer</p>
            <p className="font-semibold">{order.name ?? "—"}</p>
            <p className="text-sm">
              <a
                href={`mailto:${order.email}`}
                className="text-fairway hover:underline"
              >
                {order.email}
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Locale: <span className="font-mono uppercase">{order.locale ?? "en"}</span>
            </p>
          </section>

          <section className="rounded-md border border-border bg-card p-5 space-y-2">
            <p className="eyebrow">Shipping address</p>
            {a ? (
              <p className="text-sm leading-relaxed">
                {a.line1}
                {a.line2 ? <><br />{a.line2}</> : null}
                <br />
                {[a.postal_code, a.city].filter(Boolean).join(" ")}
                <br />
                {[a.state, a.country].filter(Boolean).join(", ")}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">No address on file.</p>
            )}
          </section>
        </div>

        <section className="rounded-md border border-border bg-card p-5 space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow">Shipping & tracking</p>
            {order.shippedAt && (
              <p className="text-xs font-mono text-muted-foreground">
                Shipped {dateFmt.format(order.shippedAt)}
              </p>
            )}
          </div>
          <OrderTrackingForm
            orderId={String(order._id)}
            initialNumber={order.trackingNumber ?? null}
            initialUrl={order.trackingUrl ?? null}
          />
        </section>

        <section className="rounded-md border border-border bg-card p-5 space-y-3">
          <p className="eyebrow">Update status</p>
          <OrderStatusActions
            orderId={String(order._id)}
            currentStatus={order.status as "paid" | "fulfilled" | "cancelled" | "refunded"}
            hasTracking={Boolean(order.trackingNumber)}
          />
          {order.shippedNotificationSentAt && (
            <p className="text-xs text-muted-foreground">
              Shipped email sent {dateFmt.format(order.shippedNotificationSentAt)}
            </p>
          )}
        </section>

        <section className="rounded-md border border-border bg-card p-5 space-y-2">
          <p className="eyebrow">Stripe</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <dt className="text-muted-foreground">Session</dt>
              <dd className="break-all">{order.stripeSessionId}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Payment intent</dt>
              <dd className="break-all">{order.stripePaymentIntentId ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Confirmation email</dt>
              <dd>{order.confirmationSentAt ? dateFmt.format(order.confirmationSentAt) : "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Currency</dt>
              <dd className="uppercase">{order.currency}</dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  );
}
