"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { useCart } from "./cart-provider";

/** Shared by the cart page and the cart drawer. */
export function useCheckout() {
  const t = useTranslations("cart");
  const tProducts = useTranslations("products");
  const locale = useLocale();
  const { resolved, shippingRegion, removeItem } = useCart();
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
          shippingRegion,
        }),
      });
      const data = await res.json().catch(() => ({}));

      // A product went out of stock while it sat in the cart: drop it and
      // let the customer decide whether to continue with the rest.
      if (res.status === 409 && data?.code === "SOLD_OUT") {
        const ids: string[] = data.productIds ?? [];
        ids.forEach(removeItem);
        toast.error(t("soldOutRemoved"), {
          description: ids.map((id) => tProducts(`${id}.name`)).join(", "),
        });
        setSubmitting(false);
        return;
      }

      if (!res.ok || !data?.url) throw new Error("checkout failed");
      window.location.href = data.url;
    } catch {
      toast.error(t("checkoutFailed"));
      setSubmitting(false);
    }
  }

  return { checkout, submitting };
}
