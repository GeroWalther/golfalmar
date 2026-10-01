import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { ProductStatus } from "@/lib/models/product-status";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";

const Body = z.object({ soldOut: z.boolean() });

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
  if (!getProduct(id)) {
    return NextResponse.json({ error: "unknown product" }, { status: 404 });
  }

  await connectDB();
  await ProductStatus.updateOne(
    { productId: id },
    { $set: { soldOut: parsed.soldOut } },
    { upsert: true },
  );

  // Storefront pages are statically rendered; regenerate them so the badge
  // and disabled buttons show up right away. Checkout reads the DB directly.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, soldOut: parsed.soldOut });
}
