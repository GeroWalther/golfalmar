import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--volt)_0%,_transparent_55%)] opacity-60"
      />

      <div className="container-page relative pt-20 pb-20 lg:pt-28 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">{t("eyebrow")}</p>
            <h1 className="display text-[clamp(2.75rem,7.5vw,6.5rem)] max-w-3xl whitespace-pre-line tracking-[-0.025em]">
              {"Play longer.\nProtect more.\nGrip stronger."}
            </h1>
        
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <LinkButton href="/boutique" size="lg">
                {t("primaryCta")}
                <ArrowUpRight className="ml-1 size-4" />
              </LinkButton>
              <LinkButton href="/about" size="lg" variant="outline">
                {t("secondaryCta")}
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-5 lg:self-start flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[520px]">
              <Image
                src="/images/golfalmar.png"
                alt="GOLF AL MAR — finest sunscreen crest"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-contain mix-blend-multiply"
              />
            </div>
            <p className="italic font-serif text-green-950 text-xl sm:text-2xl text-center">
              ..... made to improve your game.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
