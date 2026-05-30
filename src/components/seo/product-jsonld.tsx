import { BUSINESS, SITE_URL } from "@/lib/constants";
import type { Product } from "@/lib/products";

function absolute(url: string): string {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function ProductJsonLd({
  product,
  locale,
  name,
  description,
}: {
  product: Product;
  locale: string;
  name: string;
  description: string;
}) {
  const canonical = `${SITE_URL}/${locale}/boutique/${product.slug}`;
  const images = [product.image, ...(product.gallery ?? [])].map(absolute);

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: images,
    sku: product.id,
    brand: { "@type": "Brand", name: BUSINESS.name },
    offers: {
      "@type": "Offer",
      url: canonical,
      priceCurrency: product.currency.toUpperCase(),
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
