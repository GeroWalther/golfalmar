"use client";

import * as React from "react";
import {
  CART_STORAGE_KEY,
  cartItemCount,
  cartTotalCents,
  clampQty,
  resolveCart,
  type CartItem,
  type ResolvedCartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  resolved: ResolvedCartItem[];
  totalCents: number;
  totalItems: number;
  hydrated: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .filter(
                (i): i is CartItem =>
                  typeof i?.productId === "string" &&
                  typeof i?.quantity === "number",
              )
              .map((i) => ({ ...i, quantity: clampQty(i.quantity) })),
          );
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota errors */
    }
  }, [items, hydrated]);

  const addItem = React.useCallback(
    (productId: string, quantity: number = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === productId
              ? { ...i, quantity: clampQty(i.quantity + quantity) }
              : i,
          );
        }
        return [...prev, { productId, quantity: clampQty(quantity) }];
      });
    },
    [],
  );

  const removeItem = React.useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: clampQty(quantity) }
            : i,
        ),
      );
    },
    [],
  );

  const clear = React.useCallback(() => setItems([]), []);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      resolved: resolveCart(items),
      totalCents: cartTotalCents(items),
      totalItems: cartItemCount(items),
      hydrated,
      open,
      setOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
    }),
    [items, hydrated, open, addItem, removeItem, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
