"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const STORAGE_KEY = "golfalmar.newsletterPopupSeen.v1";
const SHOW_DELAY_MS = 2500;

export function NewsletterPopup() {
  const t = useTranslations("newsletter");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    const id = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-popup-title"
    >
      <button
        type="button"
        aria-label={t("close")}
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
        tabIndex={-1}
      />
      <div className="relative w-full sm:max-w-lg mx-3 sm:mx-4 mb-3 sm:mb-0 bg-background rounded-xl border border-border shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button
          type="button"
          aria-label={t("close")}
          onClick={close}
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition"
        >
          <X className="size-4" />
        </button>
        <div className="p-6 sm:p-8">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2
            id="newsletter-popup-title"
            className="display text-2xl sm:text-3xl mt-2"
          >
            {t("title")}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="mt-5">
            <NewsletterForm source="popup" />
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            {t("legal")}
          </p>
        </div>
      </div>
    </div>
  );
}
