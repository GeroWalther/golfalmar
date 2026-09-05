import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/constants";
import { LOCALE_META, SITE_URL } from "@/lib/constants";
import { PrivacyContent } from "@/lib/legal/privacy-content";

// Update when the policy text materially changes.
const LAST_UPDATED = new Date("2026-05-30");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const title = t("privacy");
  return {
    title,
    alternates: { canonical: `${SITE_URL}/${locale}/privacy` },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFooter = await getTranslations({ locale, namespace: "footer" });
  const tLegal = await getTranslations({ locale, namespace: "legal" });

  const dateLocale = LOCALE_META[locale as Locale].date;
  const lastUpdated = new Intl.DateTimeFormat(dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(LAST_UPDATED);

  return (
    <div className="container-page py-16 sm:py-24">
      <header className="max-w-3xl mb-12">
        <p className="eyebrow mb-4">GOLF AL MAR</p>
        <h1 className="display text-4xl sm:text-6xl">{tFooter("privacy")}</h1>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {tLegal("lastUpdated")}: {lastUpdated}
        </p>
      </header>

      <article className="prose-blog max-w-3xl">
        <PrivacyContent locale={locale as Locale} />
      </article>
    </div>
  );
}
