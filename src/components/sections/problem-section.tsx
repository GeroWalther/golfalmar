import { useTranslations } from "next-intl";
import { Sun, Hand } from "lucide-react";

export function ProblemSection() {
  const t = useTranslations("problem");
  return (
    <section className="border-y border-border bg-sand/40">
      <div className="container-page py-24">
        <p className="eyebrow text-center">{t("eyebrow")}</p>

        <div className="mt-10 mx-auto max-w-4xl aspect-video rounded-md overflow-hidden border border-border bg-card shadow-sm">
          <iframe
            src="https://www.youtube.com/embed/RYtlvLXVEzU?rel=0"
            title="GOLF AL MAR"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <article className="rounded-md border border-border bg-background p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-fairway text-fairway-foreground shrink-0">
                <Sun className="size-6" />
              </div>
              <div className="flex-1">
                <p className="font-heading text-4xl font-extrabold leading-none">
                  {t("sun.stat")}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("sun.statLabel")}
                </p>
              </div>
            </div>
            <h3 className="mt-8 font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              {t("sun.title")}
            </h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {t("sun.body")}
            </p>
          </article>

          <article className="rounded-md border border-border bg-background p-8 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-volt text-volt-foreground shrink-0">
                <Hand className="size-6" />
              </div>
              <div className="flex-1">
                <p className="font-heading text-4xl font-extrabold leading-none">
                  {t("grip.stat")}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {t("grip.statLabel")}
                </p>
              </div>
            </div>
            <h3 className="mt-8 font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              {t("grip.title")}
            </h3>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              {t("grip.body")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
