import { ProductCard } from "./product-card";
import { PRODUCTS } from "@/lib/products";
import { getSoldOutIds } from "@/lib/stock";

export async function ProductGrid() {
  const soldOut = await getSoldOutIds();
  return (
    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:gap-10">
      {PRODUCTS.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          soldOut={soldOut.includes(product.id)}
        />
      ))}
    </div>
  );
}
