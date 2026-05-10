import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { BrandStorySection } from "@/components/sections/brand-story-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProductsHighlightSection } from "@/components/sections/products-highlight-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { NewsletterPopup } from "@/components/newsletter/newsletter-popup";
import { LatestPostsSection } from "@/components/sections/latest-posts-section";
import { CtaSection } from "@/components/sections/cta-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <MarqueeBand />
      <BrandStorySection />
      <ProblemSection />
      <ProductsHighlightSection />
      <NewsletterSection />
      <LatestPostsSection locale={locale} />
      <CtaSection />
      <NewsletterPopup />
    </>
  );
}
