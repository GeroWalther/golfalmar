import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { fulfillCheckoutSession } from "@/lib/orders";

// Backup for the Stripe webhook: if it hasn't recorded the order yet (or is
// misconfigured), create it here. Idempotent, so the webhook arriving later
// is a no-op. Never let a failure here break the thank-you page.
async function ensureOrder(sessionId: string | undefined) {
  if (!sessionId || !sessionId.startsWith("cs_")) return;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    await fulfillCheckoutSession(session);
  } catch (e) {
    console.error("[checkout success] order backup failed:", e);
  }
}

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id } = await searchParams;
  setRequestLocale(locale);
  await ensureOrder(session_id);
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
