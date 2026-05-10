import Link from "next/link";
import { ArrowUpRight, CoinsIcon, ListOrderedIcon, Package, PaperclipIcon, User2 } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { DashboardCard } from "@/components/admin/dashboard-card";
import { SalesSparkline } from "@/components/admin/sales-sparkline";
import { StatusBreakdown } from "@/components/admin/status-breakdown";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { getDashboardData, formatCents } from "@/lib/admin/dashboard-data";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    return (
      <>
        <AdminNav />
        <main className="container-page py-10">
          <p className="text-sm text-destructive">
            Could not connect to the database. Check MONGODB_URI and try again.
          </p>
        </main>
      </>
    );
  }

  const openOrders = data.paidCount;
  const completedOrders = data.fulfilledCount;
  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-10">
        <header className="flex flex-col gap-2">
          <p className="eyebrow">Overview</p>
          <h1 className="display text-3xl">Dashboard</h1>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <DashboardCard
            label="Revenue (paid + fulfilled)"
            value={formatCents(data.revenueCents)}
            hint={`${data.paidCount + data.fulfilledCount} revenue orders`}
            icon={<CoinsIcon className="size-4" />}
            accent="fairway"
          />
          <DashboardCard
            label="Orders"
            value={String(data.orderCount)}
            hint="all time"
            icon={<ListOrderedIcon className="size-4" />}
          />
          <DashboardCard
            label="Open"
            value={String(openOrders)}
            hint="paid, awaiting fulfilment"
            icon={<PaperclipIcon className="size-4" />}
            accent="volt"
          />
          <DashboardCard
            label="Fulfilled"
            value={String(completedOrders)}
            hint="shipped"
            icon={<Package className="size-4" />}
            accent="fairway"
          />
          <DashboardCard
            label="Customers"
            value={String(data.customerCount)}
            hint="unique emails"
            icon={<User2 className="size-4" />}
          />
          <DashboardCard
            label="Avg order"
            value={formatCents(data.averageOrderCents)}
            hint={`Avg/customer ${formatCents(data.averageCustomerCents)}`}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesSparkline data={data.ordersLast30} />
          </div>
          <StatusBreakdown
            paid={data.paidCount}
            fulfilled={data.fulfilledCount}
            cancelled={data.cancelledCount}
            refunded={data.refundedCount}
          />
        </section>

        <section className="rounded-md border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <p className="eyebrow">Recent</p>
              <h2 className="font-heading text-lg font-extrabold mt-1">
                Latest orders
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              See all <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          {data.recentOrders.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No orders yet.
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {data.recentOrders.map((o) => (
                <li key={o._id}>
                  <Link
                    href={`/admin/orders/${o._id}`}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="font-mono text-[10px] text-muted-foreground w-24 shrink-0">
                      {dateFmt.format(o.createdAt)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {o.name ?? o.email}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {o.items
                          .map((i) => `${getProduct(i.productId)?.id ?? i.productId} ×${i.quantity}`)
                          .join(" · ")}
                      </p>
                    </div>
                    <OrderStatusBadge status={o.status} />
                    <div className="font-mono text-sm font-semibold w-20 text-right">
                      {formatCents(o.amountTotalCents)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
