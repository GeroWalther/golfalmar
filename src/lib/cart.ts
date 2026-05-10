import { PRODUCTS, type Product } from "./products";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type ResolvedCartItem = CartItem & {
  product: Product;
  lineTotalCents: number;
};

export const CART_STORAGE_KEY = "golfalmar.cart.v1";
export const MAX_QUANTITY = 10;

export function resolveCart(items: CartItem[]): ResolvedCartItem[] {
  const resolved: ResolvedCartItem[] = [];
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) continue;
    const qty = clampQty(item.quantity);
    resolved.push({
      productId: product.id,
      quantity: qty,
      product,
      lineTotalCents: product.priceCents * qty,
    });
  }
  return resolved;
}

export function cartTotalCents(items: CartItem[]): number {
  return resolveCart(items).reduce((sum, i) => sum + i.lineTotalCents, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + clampQty(i.quantity), 0);
}

export function clampQty(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(MAX_QUANTITY, Math.floor(n)));
}
