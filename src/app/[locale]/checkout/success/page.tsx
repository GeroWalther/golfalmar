import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "checkout" });

  return (
    <div className="container-page py-24 max-w-2xl">
      <div className="flex size-14 items-center justify-center rounded-full bg-fairway text-fairway-foreground">
        <CheckCircle2 className="size-7" />
      </div>
      <h1 className="display text-4xl sm:text-5xl mt-6">{t("successTitle")}</h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        {t("successBody")}
      </p>
      <Button asChild size="lg" className="mt-10">
        <Link href="/boutique">{t("successCta")}</Link>
      </Button>
    </div>
  );
}
