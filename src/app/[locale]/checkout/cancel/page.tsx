import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "checkout" });

  return (
    <div className="container-page py-24 max-w-2xl">
      <h1 className="display text-4xl sm:text-5xl">{t("cancelTitle")}</h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        {t("cancelBody")}
      </p>
      <Button asChild size="lg" variant="outline" className="mt-10">
        <Link href="/cart">{t("cancelCta")}</Link>
      </Button>
    </div>
  );
}
