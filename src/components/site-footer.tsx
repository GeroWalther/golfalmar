import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BUSINESS } from "@/lib/constants";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();
  void locale;

  return (
    <footer className="border-t border-border mt-24 bg-background">
      <div className="container-page py-14 grid gap-10 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="block size-3 rounded-full bg-fairway" />
            <span className="font-heading text-sm font-extrabold uppercase tracking-tight">
              GOLF AL MAR
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">{t("tagline")}</p>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            Since {BUSINESS.founded}
          </p>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">Site</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link href="/boutique" className="hover:underline">
                {tNav("boutique")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                {tNav("about")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-4">
          <div className="space-y-3 flex-1">
            <p className="eyebrow">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="hover:underline">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="relative size-20 shrink-0 rounded-md overflow-hidden border border-border">
            <Image
              src="/images/ball-with-logo-on-grass.png"
              alt="GOLF AL MAR branded golf ball on grass"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {year} {BUSINESS.name}. {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link href="/imprint" className="hover:underline">
              {t("imprint")}
            </Link>
            <Link href="/privacy" className="hover:underline">
              {t("privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
