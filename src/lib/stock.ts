import { connectDB } from "@/lib/db";
import { ProductStatus } from "@/lib/models/product-status";

/**
 * Product ids the admin has marked sold out. Storefront pages are statically
 * rendered and re-generated when the admin toggles stock (revalidatePath), so
 * this runs at render time, not per visitor. Falls back to "nothing sold out"
 * if the DB is unreachable so the shop never goes down over it. Checkout
 * calls it on every request, so a fresh toggle is enforced there immediately.
 */
export async function getSoldOutIds(): Promise<string[]> {
  try {
    await connectDB();
    const docs = await ProductStatus.find({ soldOut: true })
      .select("productId")
      .lean();
    return docs.map((d) => d.productId);
  } catch (e) {
    console.error("[stock] could not load sold-out products", e);
    return [];
  }
}
