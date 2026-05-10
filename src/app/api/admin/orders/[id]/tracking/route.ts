import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Order } from "@/lib/models/order";

export const runtime = "nodejs";

const Body = z.object({
  trackingNumber: z.string().trim().max(100).nullable().optional(),
  trackingUrl: z
    .string()
    .trim()
    .url()
    .max(2000)
    .nullable()
    .optional()
    .or(z.literal("")),
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

  if (parsed.trackingNumber !== undefined) {
    order.trackingNumber = parsed.trackingNumber || undefined;
  }
  if (parsed.trackingUrl !== undefined) {
    order.trackingUrl = parsed.trackingUrl || undefined;
  }
  await order.save();

  return NextResponse.json({
    ok: true,
    trackingNumber: order.trackingNumber ?? null,
    trackingUrl: order.trackingUrl ?? null,
  });
}
