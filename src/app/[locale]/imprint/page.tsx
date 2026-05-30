import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/constants";
import { SITE_URL } from "@/lib/constants";
import { ImprintContent } from "@/lib/legal/imprint-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const title = t("imprint");
  return {
    title,
    alternates: { canonical: `${SITE_URL}/${locale}/imprint` },
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const tLegal = await getTranslations({ locale, namespace: "legal" });

  return (
    <div className="container-page py-16 sm:py-24">
      <header className="max-w-3xl mb-12">
        <p className="eyebrow mb-4">GOLF AL MAR</p>
        <h1 className="display text-4xl sm:text-6xl">{tFooter("imprint")}</h1>
      </header>

      <article className="prose-blog max-w-3xl">
        <ImprintContent
          locale={locale as Locale}
          notice={tLegal("imprintPlaceholderNotice")}
        />
      </article>
    </div>
  );
}
