"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { useCart } from "./cart-provider";
import { formatPriceEUR } from "@/lib/products";

export function CartDrawer() {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const {
    open,
    setOpen,
    resolved,
    totalCents,
    totalItems,
    setQuantity,
    removeItem,
  } = useCart();
  const [submitting, setSubmitting] = React.useState(false);

  async function checkout() {
    if (resolved.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: resolved.map((r) => ({
            productId: r.productId,
            quantity: r.quantity,
          })),
          locale,
        }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("no url");
      }
    } catch {
      const { toast } = await import("sonner");
      toast.error(t("checkoutFailed"));
      setSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-heading text-xl uppercase tracking-tight">
            {t("drawerTitle")}{" "}
            {totalItems > 0 && (
              <span className="text-muted-foreground font-normal">
                ({totalItems})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {resolved.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="text-muted-foreground">{t("empty")}</p>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                asChild
              >
                <Link href="/boutique">{t("shop")}</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {resolved.map((item) => {
                const productName = tProducts(`${item.productId}.name`);
                return (
                  <li key={item.productId} className="flex gap-4 py-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.product.image}
                        alt={productName}
                        fill
                        className="object-contain p-2"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <p className="font-semibold text-sm leading-tight">
                          {productName}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatPriceEUR(item.product.priceCents, locale)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center rounded-md border border-border">
                          <button
                            type="button"
                            aria-label={t("decrement")}
                            onClick={() =>
                              setQuantity(item.productId, item.quantity - 1)
                            }
                            className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={t("increment")}
                            onClick={() =>
                              setQuantity(item.productId, item.quantity + 1)
                            }
                            className="h-8 w-8 inline-flex items-center justify-center hover:bg-muted"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label={t("remove")}
                          onClick={() => removeItem(item.productId)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                    <p className="font-semibold text-sm whitespace-nowrap">
                      {formatPriceEUR(item.lineTotalCents, locale)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {resolved.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3 px-6 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{t("subtotal")}</span>
                <span className="font-bold text-base">
                  {formatPriceEUR(totalCents, locale)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("shippingNote")}
              </p>
              <Button
                className="w-full"
                size="lg"
                onClick={checkout}
                disabled={submitting}
              >
                {submitting ? "…" : t("checkout")}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
