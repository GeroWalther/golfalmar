import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await connectDB();
  const orders = await Order.find({}).sort({ createdAt: -1 }).lean();

  const headers = [
    "id",
    "createdAt",
    "status",
    "email",
    "name",
    "amountTotalCents",
    "shippingCents",
    "currency",
    "locale",
    "items",
    "ship_line1",
    "ship_line2",
    "ship_city",
    "ship_postal",
    "ship_state",
    "ship_country",
    "stripeSessionId",
    "stripePaymentIntentId",
  ];
  const rows = orders.map((o) =>
    [
      String(o._id),
      o.createdAt.toISOString(),
      o.status,
      o.email,
      o.name ?? "",
      o.amountTotalCents,
      o.shippingCents ?? 0,
      o.currency,
      o.locale ?? "",
      (o.items ?? [])
        .map((i) => `${i.productId}×${i.quantity}@${i.unitAmountCents}`)
        .join(" | "),
      o.shippingAddress?.line1 ?? "",
      o.shippingAddress?.line2 ?? "",
      o.shippingAddress?.city ?? "",
      o.shippingAddress?.postal_code ?? "",
      o.shippingAddress?.state ?? "",
      o.shippingAddress?.country ?? "",
      o.stripeSessionId,
      o.stripePaymentIntentId ?? "",
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
      "Content-Disposition": `attachment; filename="golfalmar-orders-${stamp}.csv"`,
    },
  });
}
