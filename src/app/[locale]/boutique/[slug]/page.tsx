import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui/link-button";
import { QuantityAddToCart } from "@/components/cart/quantity-add-to-cart";
import { PRODUCTS, formatPriceEUR } from "@/lib/products";
import { routing } from "@/i18n/routing";

// Helpers — let new fields like "tagline", "features" be optional per product
// without next-intl rendering the literal key string when a product doesn't
// define it. (In v4, missing translations return the key path rather than
// throwing, so a try/catch alone isn't enough — use `.has()` to check first.)
type Translator = Awaited<ReturnType<typeof getTranslations>> & {
  has?: (key: string) => boolean;
};
function safeTranslate(t: Translator, key: string): string {
  if (typeof t.has === "function" && !t.has(key)) return "";
  try {
    const value = t(key);
    return value === `products.${key}` || value === key ? "" : value;
  } catch {
    return "";
  }
}
function safeRaw(t: Translator, key: string): string[] {
  if (typeof t.has === "function" && !t.has(key)) return [];
  try {
    const v = t.raw(key);
    return Array.isArray(v) ? (v as string[]) : [];
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t(`${product.id}.name`),
    description: t(`${product.id}.shortDescription`),
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const t = await getTranslations({ locale, namespace: "products" });
  const tCommon = await getTranslations({ locale });
  const name = t(`${product.id}.name`);
  const shortDesc = t(`${product.id}.shortDescription`);
  const longDesc = t(`${product.id}.longDescription`);
  const tagline = safeTranslate(t, `${product.id}.tagline`);
  const sensitiveTitle = safeTranslate(t, `${product.id}.sensitiveTitle`);
  const sensitiveBody = safeTranslate(t, `${product.id}.sensitiveBody`);
  const useTitle = safeTranslate(t, `${product.id}.useTitle`);
  const useBody = safeTranslate(t, `${product.id}.useBody`);
  const blockedClaim = safeTranslate(t, `${product.id}.blockedClaim`);
  const featuresTitle = safeTranslate(t, `${product.id}.featuresTitle`);
  const testedTitle = safeTranslate(t, `${product.id}.testedTitle`);
  const areasTitle = safeTranslate(t, `${product.id}.areasTitle`);
  const features = safeRaw(t, `${product.id}.features`);
  const tested = safeRaw(t, `${product.id}.tested`);
  const areas = safeRaw(t, `${product.id}.areas`);
  // Right-rail secondary list — different products use different keys
  // (sunscreen → tested, dolo-golf → areas), but we render one or the other.
  const secondaryListTitle = testedTitle || areasTitle;
  const secondaryList = tested.length > 0 ? tested : areas;
  const others = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="container-page py-12 sm:py-16">
      <Link
        href="/boutique"
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {t("back")}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        <div className="relative aspect-square rounded-md border border-border bg-sand overflow-hidden">
          <Image
            src={product.image}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10 sm:p-16"
          />
        </div>

        <div className="lg:sticky lg:top-24 space-y-6">
          <div>
            <p className="eyebrow">GOLF AL MAR</p>
            <h1 className="display text-4xl sm:text-5xl mt-3">{name}</h1>
            {tagline && (
              <p className="mt-4 font-heading text-base sm:text-lg font-semibold uppercase tracking-[0.12em] leading-snug">
                <span
                  className="text-volt-foreground px-1.5 py-0.5 box-decoration-clone"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, transparent 18%, var(--volt) 18%, var(--volt) 92%, transparent 92%)",
                  }}
                >
                  {tagline}
                </span>
              </p>
            )}
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {shortDesc}
            </p>
          </div>

          <div className="font-heading text-2xl sm:text-3xl font-medium tracking-tight">
            {formatPriceEUR(product.priceCents, locale)}
          </div>

          <QuantityAddToCart productId={product.id} productName={name} />

          {blockedClaim && (
            <div className="flex items-center gap-3 rounded-md border border-fairway/30 bg-fairway/5 px-4 py-3">
              <ShieldCheck className="size-5 text-fairway shrink-0" />
              <p className="text-sm font-semibold text-fairway">
                {blockedClaim}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            {product.descriptionBadge && (
              <div className="relative size-24 sm:size-28">
                <Image
                  src={product.descriptionBadge.src}
                  alt={product.descriptionBadge.alt}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
            )}
            <div className="space-y-4">
              <p className="eyebrow">Details</p>
              <div className="space-y-4 text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                {longDesc}
              </div>
            </div>
          </section>

          {product.descriptionImages && product.descriptionImages.length > 0 && (
            <section className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              {product.descriptionImages.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-md bg-sand border border-border"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </section>
          )}

          {sensitiveTitle && sensitiveBody && (
            <section className="space-y-3 rounded-md border border-border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl sm:text-2xl font-semibold uppercase tracking-tight">
                {sensitiveTitle}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {sensitiveBody}
              </p>
            </section>
          )}

          {useTitle && useBody && (
            <section className="space-y-3 rounded-md border border-border bg-card p-6 sm:p-8">
              <h2 className="font-heading text-xl sm:text-2xl font-semibold uppercase tracking-tight">
                {useTitle}
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                {useBody}
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 self-start">
          {features.length > 0 && (
            <section className="space-y-4">
              <p className="eyebrow">{featuresTitle || "Features"}</p>
              <ul className="space-y-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="size-4 text-fairway shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {secondaryList.length > 0 && (
            <section className="space-y-4 border-t border-border pt-6">
              <p className="eyebrow">{secondaryListTitle}</p>
              <ul className="space-y-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">
                {secondaryList.map((t) => (
                  <li key={t}>· {t}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-24 sm:mt-32 border-t border-border pt-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
              {t("youMayAlsoLike")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => {
              const otherName = t(`${p.id}.name`);
              const otherDesc = t(`${p.id}.shortDescription`);
              return (
                <Link
                  key={p.id}
                  href={`/boutique/${p.slug}`}
                  className="group flex flex-col rounded-md border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/5] bg-sand">
                    <Image
                      src={p.image}
                      alt={otherName}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-2">
                    <h3 className="font-heading text-xl font-semibold uppercase tracking-tight">
                      {otherName}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {otherDesc}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-heading text-xl font-semibold">
                        {formatPriceEUR(p.priceCents, locale)}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                        {t("viewProduct")}
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10">
            <LinkButton href="/boutique" variant="outline" size="lg">
              {tCommon("nav.boutique")}
              <ArrowUpRight className="size-4" />
            </LinkButton>
          </div>
        </section>
      )}
    </div>
  );
}
