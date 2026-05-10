export type Product = {
  id: string;
  slug: string;
  priceCents: number;
  currency: "eur";
  image: string;
  /** Optional supporting images displayed inside the product description section. */
  descriptionImages?: { src: string; alt: string }[];
  /** Optional badge/seal image rendered above the product description as a credibility mark. */
  descriptionBadge?: { src: string; alt: string };
};

export const PRODUCTS: Product[] = [
  {
    id: "sport-sunscreen",
    slug: "sport-sunscreen",
    priceCents: 2490,
    currency: "eur",
    image: "/images/sunscreen.svg",
  },
  {
    id: "magic-golf-grip",
    slug: "magic-golf-grip",
    priceCents: 1990,
    currency: "eur",
    image: "/images/magic-grip.svg",
  },
  {
    id: "dolo-golf",
    slug: "dolo-golf",
    priceCents: 2290,
    currency: "eur",
    image: "/images/dolo-golf.svg",
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
