import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

/**
 * Split a translated body into its paragraphs. Blank lines separate paragraphs,
 * single newlines stay as line breaks inside one. Every language file keeps the
 * same paragraph structure for a given key, so the sections below can address a
 * paragraph by index (e.g. the two questions inside `craftBody`).
 */
function paragraphs(text: string): string[] {
  return text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Eyebrow plus the short rule used as the page-wide section marker. */
function SectionLabel({ children, tone }: { children: string; tone?: "dark" }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className={`block h-px w-8 ${tone === "dark" ? "bg-volt" : "bg-fairway"}`}
      />
      <p
        className={`font-mono text-xs uppercase tracking-[0.18em] ${
          tone === "dark"
            ? "text-fairway-foreground/70"
            : "text-muted-foreground"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Prose({ text, className }: { text: string; className?: string }) {
  return (
    <div className={className}>
      {paragraphs(text).map((p, i) => (
        <p key={i} className="whitespace-pre-line [&:not(:first-child)]:mt-5">
          {p}
        </p>
      ))}
    </div>
  );
}

// Positional — the three values are Performance / Protection / Recovery in
// every language file, in that order.
const VALUE_ICONS = [Gauge, ShieldCheck, Sparkles];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  // Synthesised oblique looks wrong for Chinese and Japanese, so the serif
  // accents stay upright there. The English brand line keeps its italic.
  const quoteFont =
    locale === "zh" || locale === "ja" ? "font-serif" : "font-serif italic";

  const values = t.raw("values") as Array<{ title: string; body: string }>;
  const welcome = paragraphs(t("welcomeBody"));
  const longGame = paragraphs(t("productsBody"));
  const craft = paragraphs(t("craftBody"));
  const note = paragraphs(t("noteBody"));

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[68vh] min-h-[440px] max-h-[680px] overflow-hidden border-b border-border">
        <Image
          src="/images/golf.jpg"
          alt="GOLF AL MAR on the course"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent"
        />
        <div className="container-page relative z-10 h-full flex flex-col justify-end pb-12 sm:pb-16">
          <SectionLabel>{t("eyebrow")}</SectionLabel>
          <h1 className="mt-5 display text-[clamp(2.5rem,6.5vw,5.5rem)] max-w-4xl tracking-[-0.025em] text-foreground">
            {t("title")}
          </h1>
          <p className="mt-4 font-serif italic text-xl sm:text-2xl text-fairway">
            {t("welcomeEyebrow")}
          </p>
        </div>
      </section>

      {/* ── Lead: why we exist ───────────────────────────────── */}
      <section className="container-page py-20 sm:py-28">
        <div className="max-w-[46rem]">
          <SectionLabel>{t("leadEyebrow")}</SectionLabel>
          <p className="mt-8 text-2xl sm:text-[1.75rem] leading-snug text-foreground whitespace-pre-line">
            {welcome[0]}
          </p>
          <div className="mt-8 space-y-5 text-lg text-muted-foreground leading-relaxed">
            {welcome.slice(1).map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-volt pl-6 text-lg sm:text-xl text-fairway leading-relaxed">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* ── Pull quote ───────────────────────────────────────── */}
      <section className="border-y border-border bg-sand/50">
        <div className="container-page py-20 sm:py-28 flex flex-col items-center text-center">
          <div className="relative size-24 sm:size-28">
            <Image
              src="/images/golfalmar.png"
              alt=""
              aria-hidden
              fill
              sizes="112px"
              className="object-contain mix-blend-multiply"
            />
          </div>
          <blockquote className="mt-8 max-w-3xl">
            <p
              className={`${quoteFont} text-[clamp(1.5rem,3.4vw,2.5rem)] leading-[1.25] text-fairway`}
            >
              &ldquo;{t("pullQuote")}&rdquo;
            </p>
          </blockquote>
          <span aria-hidden className="mt-8 block h-px w-16 bg-fairway/40" />
        </div>
      </section>

      {/* ── Origin ───────────────────────────────────────────── */}
      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <SectionLabel>{t("originEyebrow")}</SectionLabel>
            <h2 className="mt-5 display text-3xl sm:text-5xl max-w-xl">
              {t("originTitle")}
            </h2>
            <Prose
              text={t("originBody")}
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-md overflow-hidden bg-sand border border-border">
              <Image
                src="/images/geroholeinone.jpg"
                alt="GOLF AL MAR — a moment on the course"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="container-page pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-md overflow-hidden bg-sand border border-border">
              <Image
                src="/images/playerGeroDriver.jpg"
                alt="GOLF AL MAR — Gero with driver"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionLabel>{t("missionEyebrow")}</SectionLabel>
            <h2 className="mt-5 display text-3xl sm:text-5xl max-w-xl">
              {t("missionTitle")}
            </h2>
            <Prose
              text={t("missionBody")}
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            />
          </div>
        </div>
      </section>

      {/* ── Values — dark band, the spine of the page ─────────── */}
      <section className="border-y border-border bg-fairway text-fairway-foreground">
        <div className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <SectionLabel tone="dark">{t("valuesEyebrow")}</SectionLabel>
            <h2 className="mt-5 display text-3xl sm:text-5xl">
              {t("valuesTitle")}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-fairway-foreground/75 leading-relaxed">
              {t("valuesIntro")}
            </p>
          </div>

          <div className="mt-14 grid gap-px sm:grid-cols-3 bg-fairway-foreground/15 rounded-md overflow-hidden">
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[i] ?? Gauge;
              return (
                <article key={value.title} className="bg-fairway p-8 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-full bg-volt text-volt-foreground">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs tracking-[0.18em] text-volt">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-7 font-heading text-xl sm:text-2xl font-semibold uppercase tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-fairway-foreground/75 leading-relaxed">
                    {value.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── The long game ────────────────────────────────────── */}
      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>{t("longGameEyebrow")}</SectionLabel>
            <h2 className="mt-5 display text-3xl sm:text-5xl">
              {t("productsTitle")}
            </h2>
          </div>
          <div className="lg:col-span-7 max-w-[42rem]">
            <p className="text-xl sm:text-2xl leading-snug text-foreground">
              {longGame[0]}
            </p>
            <div className="mt-6 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {longGame.slice(1, -1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-heading text-lg sm:text-xl font-semibold uppercase tracking-tight text-fairway">
              {longGame[longGame.length - 1]}
            </p>
          </div>
        </div>

        <div className="mt-14 relative aspect-[21/9] sm:aspect-[3/1] rounded-md overflow-hidden bg-sand border border-border">
          <Image
            src="/images/ball-with-logo-on-grass.png"
            alt="GOLF AL MAR — built for the long game"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ── Our standard — the two questions ─────────────────── */}
      <section className="border-y border-border bg-sand/50">
        <div className="container-page py-20 sm:py-28">
          <div className="max-w-2xl">
            <SectionLabel>{t("craftEyebrow")}</SectionLabel>
            <h2 className="mt-5 display text-3xl sm:text-5xl">
              {t("craftTitle")}
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {craft[0]}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
            {craft.slice(1, -1).map((question, i) => (
              <article
                key={i}
                className="rounded-md border border-border bg-background p-8 sm:p-10"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-fairway">
                  0{i + 1}
                </span>
                <p
                  className={`mt-5 ${quoteFont} text-xl sm:text-2xl leading-snug text-foreground`}
                >
                  {question}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 font-heading text-lg sm:text-xl font-semibold uppercase tracking-tight text-fairway max-w-2xl">
            {craft[craft.length - 1]}
          </p>
        </div>
      </section>

      {/* ── More than equipment ──────────────────────────────── */}
      <section className="container-page py-20 sm:py-28">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <SectionLabel>{t("closingEyebrow")}</SectionLabel>
          <h2 className="mt-5 display text-3xl sm:text-5xl">{t("noteTitle")}</h2>
          <p className="mt-8 text-xl sm:text-2xl leading-snug text-foreground">
            {note[0]}
          </p>

          <ul
            className={`mt-12 space-y-3 ${quoteFont} text-lg sm:text-xl text-muted-foreground`}
          >
            {note[1].split("\n").map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>

          <p className="mt-14 display text-[clamp(1.75rem,4vw,3rem)] whitespace-pre-line text-fairway">
            {note[2]}
          </p>
          <p className="mt-8 font-heading text-lg sm:text-xl font-semibold uppercase tracking-tight">
            {note[3]}
          </p>
        </div>
      </section>

      {/* ── Crest + close ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_at_bottom,_var(--volt)_0%,_transparent_65%)] opacity-70 pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom_center,_var(--fairway)_0%,_transparent_75%)] opacity-25 pointer-events-none"
        />
        <div className="relative container-page pt-24 sm:pt-32 pb-24 sm:pb-32 flex flex-col items-center text-center">
          <div className="relative size-36 sm:size-44">
            <Image
              src="/images/golfalmar.png"
              alt="GOLF AL MAR crest"
              fill
              sizes="200px"
              className="object-contain mix-blend-multiply"
            />
          </div>
          <p className="mt-3 font-serif italic text-green-950 text-xl sm:text-2xl">
            {t("noteSignoff")}
          </p>
          <LinkButton href="/boutique" size="lg" className="mt-10">
            {tHero("primaryCta")}
            <ArrowUpRight className="ml-1 size-4" />
          </LinkButton>
        </div>
      </section>
    </>
  );
}
