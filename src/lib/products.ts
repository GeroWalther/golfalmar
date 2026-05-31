export type Product = {
  id: string;
  slug: string;
  priceCents: number;
  currency: "eur";
  /** Net content shown on the product detail page (e.g. "100 ml", "60 g"). */
  size?: string;
  image: string;
  /** Optional additional images shown alongside `image` in the product detail gallery (thumbnail row + main view). */
  gallery?: string[];
  /** Optional supporting images displayed inside the product description section. */
  descriptionImages?: { src: string; alt: string }[];
  /** Optional badge/seal image rendered above the product description as a credibility mark. */
  descriptionBadge?: { src: string; alt: string };
};

export const PRODUCTS: Product[] = [
  {
    id: "sport-sunscreen",
    slug: "sport-sunscreen",
    priceCents: 3200,
    currency: "eur",
    size: "100 ml",
    image: "/images/sunscreenprod.jpg",
    gallery: ["/images/sunscreentexture.jpg"],
  },
  {
    id: "dolo-golf",
    slug: "dolo-golf",
    priceCents: 4900,
    currency: "eur",
    size: "100 ml",
    image: "/images/dologolf.jpg",
    gallery: ["/images/dologolf-cream.jpg"],
    descriptionBadge: {
      src: "/images/dolobadge.png",
      alt: "DOLO Golf — quality seal",
    },
    descriptionImages: [
      {
        src: "/images/dustinJohnson.jpg",
        alt: "On the course — the body absorbs every swing",
      },
      {
        src: "/images/dolopain.jpg",
        alt: "DOLO Golf — targeted relief where golfers need it most",
      },
    ],
  },
  {
    id: "magic-golf-grip",
    slug: "magic-golf-grip",
    // TEMPORARY: dropped from 1990 to 100 for live end-to-end checkout test.
    // Revert to 1990 once the order/email/webhook flow is verified.
    priceCents: 1900,
    currency: "eur",
    size: "30 ml",
    image: "/images/magicgrip-1.jpg",
    gallery: ["/images/magicgrip-2.jpg"],
  },
  {
    id: "longevity-support",
    slug: "longevity-support",
    priceCents: 11900,
    currency: "eur",
    size: "60 g",
    image: "/images/longevity.jpg",
    gallery: ["/images/longevity2.jpg"],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPriceEUR(priceCents: number, locale = "en"): string {
  // Format the number using locale separators (1,234.56 in EN; 1.234,56 in DE)
  // but always place the euro symbol AFTER the amount with a thin space.
  const amount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceCents / 100);
  return `${amount} €`;
}
