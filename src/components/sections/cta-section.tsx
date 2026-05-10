import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function CtaSection() {
  const t = useTranslations("hero");
  return (
    <section className="container-page py-24">
      <div className="relative overflow-hidden rounded-md border border-border min-h-[420px] lg:min-h-[480px]">
        <Image
          src="/images/golf.jpg"
          alt="Golf course"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-fairway/85 via-fairway/55 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--volt)_0%,_transparent_55%)] opacity-25"
        />
        <div className="relative p-10 sm:p-16 lg:p-24 text-fairway-foreground max-w-3xl">
          <h2 className="display text-4xl sm:text-6xl whitespace-pre-line">
            {"Play longer.\nProtect more.\nGrip stronger."}
          </h2>
          <p className="mt-6 text-lg opacity-90 max-w-xl">{t("subtitle")}</p>
          <LinkButton
            href="/boutique"
            size="lg"
            variant="volt"
            className="mt-8"
          >
            {t("primaryCta")}
            <ArrowUpRight className="ml-1 size-4" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
