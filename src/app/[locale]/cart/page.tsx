"use client";

import * as React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/components/cart/cart-provider";
import { formatPriceEUR } from "@/lib/products";

export default function CartPage() {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const {
    resolved,
    totalCents,
    setQuantity,
    removeItem,
    hydrated,
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

  if (!hydrated) {
    return (
      <div className="container-page py-24">
        <p className="text-muted-foreground">…</p>
      </div>
    );
  }

  return (
    <div className="container-page py-16 sm:py-24">
      <h1 className="display text-4xl sm:text-5xl mb-12">{t("title")}</h1>

      {resolved.length === 0 ? (
        <div className="rounded-md border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">{t("empty")}</p>
          <Button asChild className="mt-6">
            <Link href="/boutique">{t("shop")}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <ul className="lg:col-span-2 divide-y divide-border rounded-md border border-border bg-card">
            {resolved.map((item) => {
              const productName = tProducts(`${item.productId}.name`);
              return (
                <li key={item.productId} className="flex gap-6 p-6">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-md bg-sand">
                    <Image
                      src={item.product.image}
                      alt={productName}
                      fill
                      sizes="128px"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-extrabold uppercase tracking-tight">
                        {productName}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatPriceEUR(item.product.priceCents, locale)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="inline-flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label={t("decrement")}
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={t("increment")}
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          className="h-9 w-9 inline-flex items-center justify-center hover:bg-muted"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1.5 text-xs uppercase tracking-wider"
                      >
                        <Trash2 className="size-3.5" />
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                  <p className="font-heading text-lg font-extrabold whitespace-nowrap">
                    {formatPriceEUR(item.lineTotalCents, locale)}
                  </p>
                </li>
              );
            })}
          </ul>

          <aside className="rounded-md border border-border bg-card p-6 h-fit lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{t("subtotal")}</span>
              <span className="font-heading text-2xl font-extrabold">
                {formatPriceEUR(totalCents, locale)}
              </span>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">{t("shippingNote")}</p>
            <Button
              className="w-full"
              size="lg"
              onClick={checkout}
              disabled={submitting}
            >
              {submitting ? "…" : t("checkout")}
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
