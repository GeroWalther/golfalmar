"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { CartIconButton } from "./cart/cart-icon-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/boutique", key: "boutique" as const },
  { href: "/blog", key: "journal" as const },
  { href: "/about", key: "about" as const },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="block size-3 rounded-full bg-fairway transition group-hover:scale-110" />
          <span className="font-heading text-sm font-extrabold uppercase tracking-tight">
            GOLF AL MAR
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <CartIconButton />
          <button
            type="button"
            aria-label={t("menu")}
            className="lg:hidden inline-flex size-9 items-center justify-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="container-page flex flex-col py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium uppercase tracking-wide hover:underline"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
