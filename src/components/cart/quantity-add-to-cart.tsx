"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./cart-provider";
import { clampQty, MAX_QUANTITY } from "@/lib/cart";

export function QuantityAddToCart({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const { addItem, setOpen } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="inline-flex items-center rounded-md border border-border h-12">
        <button
          type="button"
          aria-label={t("decrement")}
          onClick={() => setQty((q) => clampQty(q - 1))}
          disabled={qty <= 1}
          className="h-12 w-12 inline-flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-12 text-center text-base font-semibold">{qty}</span>
        <button
          type="button"
          aria-label={t("increment")}
          onClick={() => setQty((q) => clampQty(q + 1))}
          disabled={qty >= MAX_QUANTITY}
          className="h-12 w-12 inline-flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <Button
        type="button"
        size="lg"
        className="flex-1 sm:flex-none sm:min-w-56"
        onClick={() => {
          addItem(productId, qty);
          toast.success(t("added"), { description: productName });
          setOpen(true);
        }}
      >
        <ShoppingBag className="size-4" />
        {tProducts("addToCart")}
      </Button>
    </div>
  );
}
