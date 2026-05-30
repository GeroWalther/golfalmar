import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/constants";
import { listAllSlugsForSitemap } from "@/lib/blog/queries";
import { PRODUCTS } from "@/lib/products";

const STATIC_ROUTES = ["", "/boutique", "/about", "/blog"] as const;
const LEGAL_ROUTES = ["/imprint", "/privacy"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
    })),
  );

  const legalEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    LEGAL_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );

  const productEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    PRODUCTS.map((p) => ({
      url: `${SITE_URL}/${locale}/boutique/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  const posts = await listAllSlugsForSitemap();
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/${p.locale}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...legalEntries, ...productEntries, ...blogEntries];
}
