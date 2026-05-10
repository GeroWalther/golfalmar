import Link from "next/link";
import { Download } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { formatCents } from "@/lib/admin/dashboard-data";

export const dynamic = "force-dynamic";

type CustomerRow = {
  email: string;
  name: string | null;
  orderCount: number;
  totalSpentCents: number;
  lastOrderAt: Date;
  fulfilledCount: number;
};

const REVENUE_STATUSES = ["paid", "fulfilled"];

export default async function AdminCustomersPage() {
  let customers: CustomerRow[] = [];
  let dbError = false;
  try {
    await connectDB();
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5000)
      .lean();

    const byEmail = new Map<string, CustomerRow>();
    for (const o of orders) {
      if (!o.email) continue;
      const existing = byEmail.get(o.email);
      const isRevenue = REVENUE_STATUSES.includes(o.status);
      if (existing) {
        existing.orderCount += 1;
        if (isRevenue) existing.totalSpentCents += o.amountTotalCents ?? 0;
        if (o.status === "fulfilled") existing.fulfilledCount += 1;
        if (o.createdAt.getTime() > existing.lastOrderAt.getTime()) {
          existing.lastOrderAt = o.createdAt;
          if (o.name) existing.name = o.name;
        }
      } else {
        byEmail.set(o.email, {
          email: o.email,
          name: o.name ?? null,
          orderCount: 1,
          totalSpentCents: isRevenue ? (o.amountTotalCents ?? 0) : 0,
          lastOrderAt: o.createdAt,
          fulfilledCount: o.status === "fulfilled" ? 1 : 0,
        });
      }
    }
    customers = Array.from(byEmail.values()).sort(
      (a, b) => b.totalSpentCents - a.totalSpentCents,
    );
  } catch (e) {
    console.error("[admin/customers]", e);
    dbError = true;
  }

  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const totalRev = customers.reduce((s, c) => s + c.totalSpentCents, 0);

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">All customers</p>
            <h1 className="display text-3xl">Customers</h1>
          </div>
          <a
            href="/api/admin/customers/export"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-border px-2.5 py-2 hover:bg-muted"
          >
            <Download className="size-3.5" />
            CSV
          </a>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Customers" value={String(customers.length)} />
          <Stat
            label="Total revenue"
            value={formatCents(totalRev)}
            hint="paid + fulfilled"
          />
          <Stat
            label="Avg per customer"
            value={
              customers.length === 0
                ? formatCents(0)
                : formatCents(Math.round(totalRev / customers.length))
            }
          />
        </div>

        {dbError ? (
          <p className="text-sm text-destructive">
            Could not connect to the database. Check MONGODB_URI and try again.
          </p>
        ) : customers.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-16 text-center">
            <p className="text-sm text-muted-foreground">No customers yet.</p>
          </div>
        ) : (
          <div className="rounded-md border border-border overflow-x-auto bg-card">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/40 text-left">
                <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3 text-right">Orders</th>
                  <th className="px-4 py-3 text-right">Fulfilled</th>
                  <th className="px-4 py-3">Last order</th>
                  <th className="px-4 py-3 text-right">Total spent</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.email}
                    className="border-t border-border/60 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders?q=${encodeURIComponent(c.email)}`}
                        className="block hover:underline"
                      >
                        <div className="font-semibold">{c.name || c.email}</div>
                        <div className="text-xs text-muted-foreground">
                          {c.email}
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {c.orderCount}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      {c.fulfilledCount}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {dateFmt.format(c.lastOrderAt)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">
                      {formatCents(c.totalSpentCents)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-heading text-2xl font-extrabold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
    </div>
  );
}
