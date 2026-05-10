import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";

export type DashboardData = {
  revenueCents: number;
  orderCount: number;
  paidCount: number;
  fulfilledCount: number;
  cancelledCount: number;
  refundedCount: number;
  customerCount: number;
  averageOrderCents: number;
  averageCustomerCents: number;
  ordersLast30: { date: string; count: number; revenueCents: number }[];
  recentOrders: Array<{
    _id: string;
    email: string;
    name?: string;
    amountTotalCents: number;
    status: string;
    createdAt: Date;
    items: { productId: string; quantity: number }[];
  }>;
};

const REVENUE_STATUSES = ["paid", "fulfilled"];

function dayKey(d: Date): string {
  return d.toISOString().split("T")[0];
}

export async function getDashboardData(): Promise<DashboardData | null> {
  try {
    await connectDB();
  } catch (e) {
    console.error("[admin/dashboard] DB connect failed", e);
    return null;
  }

  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .limit(2000)
    .lean();

  const revenueOrders = orders.filter((o) => REVENUE_STATUSES.includes(o.status));
  const revenueCents = revenueOrders.reduce(
    (sum, o) => sum + (o.amountTotalCents ?? 0),
    0,
  );

  const counts = {
    paid: 0,
    fulfilled: 0,
    cancelled: 0,
    refunded: 0,
  };
  for (const o of orders) {
    if (o.status in counts) counts[o.status as keyof typeof counts]++;
  }

  const uniqueEmails = new Set(orders.map((o) => o.email).filter(Boolean));
  const customerCount = uniqueEmails.size;

  const averageOrderCents =
    revenueOrders.length === 0 ? 0 : Math.round(revenueCents / revenueOrders.length);
  const averageCustomerCents =
    customerCount === 0 ? 0 : Math.round(revenueCents / customerCount);

  // Build a 30-day series ending today, even if some days have zero orders.
  const ordersLast30: { date: string; count: number; revenueCents: number }[] = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const buckets = new Map<string, { count: number; revenueCents: number }>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    buckets.set(dayKey(d), { count: 0, revenueCents: 0 });
  }
  for (const o of revenueOrders) {
    const k = dayKey(o.createdAt);
    const b = buckets.get(k);
    if (b) {
      b.count += 1;
      b.revenueCents += o.amountTotalCents ?? 0;
    }
  }
  for (const [date, b] of buckets) {
    ordersLast30.push({ date, count: b.count, revenueCents: b.revenueCents });
  }

  const recentOrders = orders.slice(0, 5).map((o) => ({
    _id: String(o._id),
    email: o.email,
    name: o.name,
    amountTotalCents: o.amountTotalCents ?? 0,
    status: o.status,
    createdAt: o.createdAt,
    items: (o.items ?? []).map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    })),
  }));

  return {
    revenueCents,
    orderCount: orders.length,
    paidCount: counts.paid,
    fulfilledCount: counts.fulfilled,
    cancelledCount: counts.cancelled,
    refundedCount: counts.refunded,
    customerCount,
    averageOrderCents,
    averageCustomerCents,
    ordersLast30,
    recentOrders,
  };
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
