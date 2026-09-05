"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/constants";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelect(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border px-2.5 font-mono text-xs uppercase tracking-wider hover:bg-muted disabled:opacity-50"
        disabled={isPending}
      >
        <span className="text-sm leading-none">{LOCALE_META[locale].flag}</span>
        {LOCALE_META[locale].label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => onSelect(l)}
            className="font-mono text-xs uppercase tracking-wider cursor-pointer gap-1.5"
          >
            <span className="text-sm leading-none">{LOCALE_META[l].flag}</span>
            {LOCALE_META[l].label}
            {l === locale && (
              <span className="ml-auto inline-block size-2 rounded-full bg-foreground" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
