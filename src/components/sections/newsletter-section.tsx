import { useTranslations } from "next-intl";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";

export function NewsletterSection() {
  const t = useTranslations("newsletter");
  return (
    <section className="border-y border-border bg-sand/40">
      <div className="container-page py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="display text-3xl sm:text-5xl">{t("title")}</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {t("subtitle")}
            </p>
            <ul className="space-y-2 text-sm text-foreground/80 max-w-md">
              <li className="flex items-start gap-2">
                <span className="text-fairway font-semibold">•</span>
                {t("perk1")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fairway font-semibold">•</span>
                {t("perk2")}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-fairway font-semibold">•</span>
                {t("perk3")}
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <NewsletterForm source="home" />
            <p className="mt-3 text-xs text-muted-foreground">
              {t("legal")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
