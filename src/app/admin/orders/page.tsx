import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrdersToolbar } from "@/components/admin/orders-toolbar";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { formatCents } from "@/lib/admin/dashboard-data";
import type { OrderDoc } from "@/lib/models/order";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page ?? 1));
  const status = sp.status;
  const q = sp.q?.trim() ?? "";

  let orders: OrderDoc[] = [];
  let total = 0;
  let dbError = false;
  try {
    await connectDB();
    const filter: Record<string, unknown> = {};
    if (status && ["paid", "fulfilled", "cancelled", "refunded"].includes(status)) {
      filter.status = status;
    }
    if (q) {
      const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ email: regex }, { name: regex }];
    }
    [orders, total] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE)
        .lean<OrderDoc[]>(),
      Order.countDocuments(filter),
    ]);
  } catch (e) {
    console.error("[admin/orders]", e);
    dbError = true;
  }

  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const buildPageHref = (p: number) => {
    const next = new URLSearchParams();
    if (status) next.set("status", status);
    if (q) next.set("q", q);
    if (p > 1) next.set("page", String(p));
    const s = next.toString();
    return s ? `/admin/orders?${s}` : "/admin/orders";
  };

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-6">
        <header className="flex flex-col gap-2">
          <p className="eyebrow">All orders</p>
          <h1 className="display text-3xl">Orders</h1>
        </header>

        <OrdersToolbar />

        {dbError ? (
          <p className="text-sm text-destructive">
            Could not connect to the database. Check MONGODB_URI and try again.
          </p>
        ) : orders.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-16 text-center">
            <p className="text-sm text-muted-foreground">No orders match.</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-border overflow-x-auto bg-card">
              <table className="w-full min-w-[820px] text-sm">
                <thead className="bg-muted/40 text-left">
                  <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr
                      key={String(o._id)}
                      className="border-t border-border/60 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">
                        <Link
                          href={`/admin/orders/${o._id}`}
                          className="hover:underline"
                        >
                          {dateFmt.format(o.createdAt)}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/orders/${o._id}`}
                          className="block hover:underline"
                        >
                          <div className="font-semibold">
                            {o.name || o.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {o.email}
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">
                        {(o.items ?? [])
                          .map((i) => `${i.productId} ×${i.quantity}`)
                          .join(" · ")}
                      </td>
                      <td className="px-4 py-3">
                        <OrderStatusBadge status={o.status} />
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-semibold">
                        {formatCents(o.amountTotalCents ?? 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <p>
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href={buildPageHref(Math.max(1, page - 1))}
                  aria-disabled={page <= 1}
                  className={`inline-flex items-center gap-1 rounded-md border border-border px-2 py-1.5 ${
                    page <= 1
                      ? "opacity-40 pointer-events-none"
                      : "hover:bg-muted"
                  }`}
                >
                  <ChevronLeft className="size-3.5" /> Prev
                </Link>
                <span className="font-mono">
                  {page} / {totalPages}
                </span>
                <Link
                  href={buildPageHref(Math.min(totalPages, page + 1))}
                  aria-disabled={page >= totalPages}
                  className={`inline-flex items-center gap-1 rounded-md border border-border px-2 py-1.5 ${
                    page >= totalPages
                      ? "opacity-40 pointer-events-none"
                      : "hover:bg-muted"
                  }`}
                >
                  Next <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
