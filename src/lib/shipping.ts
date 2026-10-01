import type Stripe from "stripe";

// Same derivation trick as the Stripe locale type in api/checkout: the SDK's
// namespaced param types aren't reachable through the default export.
type AllowedCountry = NonNullable<
  NonNullable<
    Parameters<Stripe["checkout"]["sessions"]["create"]>[0]
  >["shipping_address_collection"]
>["allowed_countries"][number];

export type ShippingRegion = "eu" | "intl";

export const SHIPPING_REGIONS = ["eu", "intl"] as const;

// Stripe Checkout can't price shipping by the address typed in, so the
// customer picks a region in the cart and Checkout only accepts addresses
// (and offers the one rate) for that region.
export const SHIPPING: Record<
  ShippingRegion,
  {
    label: string;
    amountCents: number;
    countries: AllowedCountry[];
    days: [number, number];
  }
> = {
  eu: {
    label: "Standard EU shipping",
    amountCents: 590,
    countries: [
      "DE", "AT", "ES", "FR", "IT", "NL", "BE",
      "LU", "PT", "DK", "SE", "FI", "IE",
    ],
    days: [3, 7],
  },
  intl: {
    label: "International shipping",
    amountCents: 1490,
    countries: ["CH", "NO", "GB", "US", "CA"],
    days: [7, 14],
  },
};
