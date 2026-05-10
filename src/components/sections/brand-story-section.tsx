import Image from "next/image";
import { useTranslations } from "next-intl";

export function BrandStorySection() {
  const t = useTranslations("brand");
  return (
    <section className="container-page py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1 space-y-6">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="display text-4xl sm:text-6xl">Part of the golfer&apos;s world.</h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {t("body")}
          </p>
        </div>
        <div className="lg:col-span-5 order-1 lg:order-2 relative aspect-square rounded-md overflow-hidden bg-sand">
          <Image
            src="/images/geroAI.jpg"
            alt="Gero — GOLF AL MAR founder"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
