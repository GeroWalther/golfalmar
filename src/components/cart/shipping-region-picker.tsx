"use client";

import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { formatPriceEUR } from "@/lib/products";
import { SHIPPING, SHIPPING_REGIONS } from "@/lib/shipping";
import { useCart } from "./cart-provider";

export function ShippingRegionPicker() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const { shippingRegion, setShippingRegion } = useCart();

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium mb-2">{t("shipTo")}</legend>
      <div className="grid grid-cols-2 gap-2">
        {SHIPPING_REGIONS.map((region) => (
          <button
            key={region}
            type="button"
            aria-pressed={shippingRegion === region}
            onClick={() => setShippingRegion(region)}
            className={cn(
              "rounded-md border px-3 py-2 text-left text-sm transition",
              shippingRegion === region
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted",
            )}
          >
            <span className="block font-medium">
              {t(region === "eu" ? "shipEu" : "shipIntl")}
            </span>
            <span className="block text-xs opacity-75">
              {formatPriceEUR(SHIPPING[region].amountCents, locale)}
            </span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {t(shippingRegion === "eu" ? "shipEuHint" : "shipIntlHint")}
      </p>
    </fieldset>
  );
}
