import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductGrid } from "@/components/product/product-grid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "boutique" });
  return { title: t("title") };
}

export default async function BoutiquePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "boutique" });

  return (
    <div className="container-page py-16 sm:py-24">
      <header className="max-w-3xl mb-12 sm:mb-16">
        <p className="eyebrow mb-4">GOLF AL MAR</p>
        <h1 className="display text-4xl sm:text-6xl">{t("title")}</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </header>
      <ProductGrid />
      <p className="mt-16 text-sm text-muted-foreground text-center">
        {t("empty")}
      </p>
    </div>
  );
}
