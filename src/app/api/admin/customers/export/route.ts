import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";

export const runtime = "nodejs";

const REVENUE_STATUSES = ["paid", "fulfilled"];

type Row = {
  email: string;
  name: string;
  orderCount: number;
  fulfilledCount: number;
  totalSpentCents: number;
  firstOrderAt: Date;
  lastOrderAt: Date;
  locale: string;
};

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

  const byEmail = new Map<string, Row>();
  for (const o of orders) {
    if (!o.email) continue;
    const isRevenue = REVENUE_STATUSES.includes(o.status);
    const existing = byEmail.get(o.email);
    if (existing) {
      existing.orderCount += 1;
      if (isRevenue) existing.totalSpentCents += o.amountTotalCents ?? 0;
      if (o.status === "fulfilled") existing.fulfilledCount += 1;
      if (o.createdAt.getTime() > existing.lastOrderAt.getTime()) {
        existing.lastOrderAt = o.createdAt;
        if (o.name) existing.name = o.name;
        if (o.locale) existing.locale = o.locale;
      }
      if (o.createdAt.getTime() < existing.firstOrderAt.getTime()) {
        existing.firstOrderAt = o.createdAt;
      }
    } else {
      byEmail.set(o.email, {
        email: o.email,
        name: o.name ?? "",
        orderCount: 1,
        totalSpentCents: isRevenue ? (o.amountTotalCents ?? 0) : 0,
        fulfilledCount: o.status === "fulfilled" ? 1 : 0,
        firstOrderAt: o.createdAt,
        lastOrderAt: o.createdAt,
        locale: o.locale ?? "",
      });
    }
  }

  const customers = Array.from(byEmail.values()).sort(
    (a, b) => b.totalSpentCents - a.totalSpentCents,
  );

  const headers = [
    "email",
    "name",
    "orderCount",
    "fulfilledCount",
    "totalSpentCents",
    "totalSpentEUR",
    "firstOrderAt",
    "lastOrderAt",
    "locale",
  ];
  const rows = customers.map((c) =>
    [
      c.email,
      c.name,
      c.orderCount,
      c.fulfilledCount,
      c.totalSpentCents,
      (c.totalSpentCents / 100).toFixed(2),
      c.firstOrderAt.toISOString(),
      c.lastOrderAt.toISOString(),
      c.locale,
    ]
      .map(csvEscape)
      .join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const stamp = new Date().toISOString().split("T")[0];
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="golfalmar-customers-${stamp}.csv"`,
    },
  });
}
