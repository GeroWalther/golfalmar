"use client";

import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCart } from "./cart-provider";
import { cn } from "@/lib/utils";

export function CartIconButton() {
  const { totalItems, hydrated, setOpen } = useCart();
  const t = useTranslations("cart");

  return (
    <button
      type="button"
      aria-label={t("openCart")}
      onClick={() => setOpen(true)}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted transition"
    >
      <ShoppingBag className="size-4" />
      {hydrated && totalItems > 0 && (
        <span
          className={cn(
            "absolute -right-1.5 -top-1.5 inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-fairway px-1 text-[10px] font-bold text-fairway-foreground",
          )}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
