import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <section className="relative h-[55vh] min-h-[360px] max-h-[560px] overflow-hidden border-b border-border">
        <Image
          src="/images/golf.jpg"
          alt="Golf course at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent"
        />
        <div className="container-page relative z-10 h-full flex flex-col justify-end pb-4 sm:pb-6">
          <p className="eyebrow mb-3 text-foreground">{t("eyebrow")}</p>
          <h1 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] max-w-3xl whitespace-pre-line tracking-[-0.025em] text-foreground">
            {t("title")}
          </h1>
        </div>
      </section>

      <article className="container-page pt-16 sm:pt-24 pb-8 max-w-3xl">
        <p className="text-xl sm:text-2xl text-foreground/90 leading-relaxed">
          {t("intro")}
        </p>

        <blockquote className="mt-12 sm:mt-16 border-l-4 border-fairway pl-6 sm:pl-8 py-2">
          <p className="font-heading text-2xl sm:text-3xl font-light tracking-[-0.01em] text-fairway leading-snug italic">
            &ldquo;{t("pullQuote")}&rdquo;
          </p>
        </blockquote>

        <section className="mt-16 space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
            {t("originTitle")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {t("originBody")}
          </p>
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-5 items-start">
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
              {t("missionTitle")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {t("missionBody")}
            </p>
          </div>
          <div className="lg:col-span-2 relative aspect-square rounded-md overflow-hidden bg-sand">
            <Image
              src="/images/playerGeroDriver.jpg"
              alt="GOLF AL MAR — Gero with driver"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </section>
      </article>

      {/* Values pillars — full bleed band with sand background */}
      <section className="border-y border-border bg-sand/40 mt-16">
        <div className="container-page py-20 sm:py-24">
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="eyebrow">Our principles</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold uppercase tracking-tight">
              {t("valuesTitle")}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {t("valuesIntro")}
            </p>
          </div>
          <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
            {(t.raw("values") as Array<{ title: string; body: string }>).map(
              (value, i) => (
                <article key={value.title} className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-fairway">
                    0{i + 1}
                  </p>
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold uppercase tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {value.body}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <article className="container-page pt-16 sm:pt-20 pb-8 max-w-3xl">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
            {t("productsTitle")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {t("productsBody")}
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
            {t("craftTitle")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {t("craftBody")}
          </p>
        </section>

        <section className="mt-16 rounded-md border border-border bg-card p-8 sm:p-10 space-y-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight">
            {t("noteTitle")}
          </h2>
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            {t("noteBody")}
          </p>
          <p className="font-serif italic text-sm sm:text-base text-fairway pt-2">
            {t("noteSignoff")}
          </p>
        </section>
      </article>

      {/* Closing crest with green fade rising from below — like grass. Sits flush with the footer (negates SiteFooter's mt-24). */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_at_bottom,_var(--volt)_0%,_transparent_65%)] opacity-70 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom_center,_var(--fairway)_0%,_transparent_75%)] opacity-25 pointer-events-none"
        />
        <div className="relative container-page pt-32 sm:pt-48 pb-32 sm:pb-40 flex flex-col items-center">
          <div className="relative size-42 sm:size-50">
            <Image
              src="/images/golfalmar.png"
              alt="GOLF AL MAR crest"
              fill
              sizes="200px"
              className="object-contain mix-blend-multiply"
            />
          </div>
          <p className="mt-2 italic font-serif text-green-950 text-xl sm:text-2xl text-center">
            ..... made to improve your game.
          </p>
        </div>
      </section>
    </>
  );
}
