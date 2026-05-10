import { BUSINESS, SITE_URL } from "@/lib/constants";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    foundingDate: String(BUSINESS.founded),
    email: BUSINESS.email,
    description:
      "GOLF AL MAR designs essential gear for golfers — sport sunscreen and the Magic Golf Grip — for amateurs and professionals worldwide.",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
