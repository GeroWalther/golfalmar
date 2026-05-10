import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";
import { sendShippedNotification } from "@/lib/emails";

export const runtime = "nodejs";

const Body = z.object({
  status: z.enum(["paid", "fulfilled", "cancelled", "refunded"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "bad body" }, { status: 400 });
  }
  const { id } = await params;
  await connectDB();
  const order = await Order.findById(id);
  if (!order) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // Mark-fulfilled gate: customer can't be told their package is "on its way"
  // unless we actually have a tracking number to give them.
  if (parsed.status === "fulfilled" && !order.trackingNumber) {
    return NextResponse.json(
      {
        error: "Tracking number required before marking fulfilled.",
        code: "TRACKING_REQUIRED",
      },
      { status: 400 },
    );
  }

  const wasFulfilled = order.status === "fulfilled";
  order.status = parsed.status;
  if (parsed.status === "fulfilled" && !order.shippedAt) {
    order.shippedAt = new Date();
  }
  await order.save();

  // Only fire the shipped email on the paid→fulfilled transition, not on
  // every save (e.g. if admin re-saves a fulfilled order).
  if (parsed.status === "fulfilled" && !wasFulfilled) {
    try {
      await sendShippedNotification(order);
      order.shippedNotificationSentAt = new Date();
      await order.save();
    } catch (e) {
      console.error("[admin/orders/status] shipped email failed", e);
      return NextResponse.json(
        {
          ok: true,
          status: order.status,
          warning: "Status updated but shipped email failed to send.",
        },
        { status: 200 },
      );
    }
  }

  return NextResponse.json({ ok: true, status: order.status });
}
