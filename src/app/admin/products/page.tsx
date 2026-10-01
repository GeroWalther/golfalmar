import Image from "next/image";
import { AdminNav } from "@/components/admin/admin-nav";
import { ProductStockToggle } from "@/components/admin/product-stock-toggle";
import { PRODUCTS, formatPriceEUR } from "@/lib/products";
import { connectDB } from "@/lib/db";
import { ProductStatus } from "@/lib/models/product-status";
import en from "@/messages/en.json";

export const dynamic = "force-dynamic";

const NAMES = en.products as unknown as Record<string, { name?: string }>;

export default async function AdminProductsPage() {
  let soldOut: string[] = [];
  let dbError = false;
  try {
    await connectDB();
    const docs = await ProductStatus.find({ soldOut: true }).lean();
    soldOut = docs.map((d) => d.productId);
  } catch (e) {
    console.error("[admin/products]", e);
    dbError = true;
  }

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-6">
        <header className="flex flex-col gap-2">
          <p className="eyebrow">Shop</p>
          <h1 className="display text-3xl">Products</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Sold-out products stay visible in the shop with a “Sold out” badge
            but can&apos;t be added to the cart or bought. Changes go live
            within a few seconds.
          </p>
        </header>

        {dbError ? (
          <p className="rounded-md border border-destructive/40 p-6 text-sm text-destructive">
            Could not load stock status from the database.
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-md border border-border bg-card">
            {PRODUCTS.map((p) => {
              const isSoldOut = soldOut.includes(p.id);
              return (
                <li key={p.id} className="flex items-center gap-4 p-4">
                  <div className="relative size-14 shrink-0 rounded-md bg-white border border-border">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {NAMES[p.id]?.name ?? p.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPriceEUR(p.priceCents, "en")}
                      {" · "}
                      <span
                        className={
                          isSoldOut ? "text-destructive font-medium" : "text-fairway"
                        }
                      >
                        {isSoldOut ? "Sold out" : "In stock"}
                      </span>
                    </p>
                  </div>
                  <ProductStockToggle productId={p.id} soldOut={isSoldOut} />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
