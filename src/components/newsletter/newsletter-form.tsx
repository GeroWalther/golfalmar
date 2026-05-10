"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm({ source = "home" }: { source?: string }) {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState<null | { alreadySubscribed: boolean }>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return;
    startTransition(async () => {
      try {
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, locale, source }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error ?? t("error"));
          return;
        }
        setSuccess({ alreadySubscribed: Boolean(data?.alreadySubscribed) });
        setEmail("");
      } catch {
        setError(t("error"));
      }
    });
  }

  if (success) {
    return (
      <div className="flex items-start gap-3 rounded-md border border-fairway/30 bg-fairway/5 px-4 py-4 max-w-md">
        <CheckCircle2 className="size-5 text-fairway shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-fairway">
            {success.alreadySubscribed ? t("resentTitle") : t("successTitle")}
          </p>
          <p className="text-sm text-foreground/80 mt-1">
            {success.alreadySubscribed ? t("resentBody") : t("successBody")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col sm:flex-row gap-3 max-w-md"
    >
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="email"
          required
          placeholder={t("placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={pending}
          className="pl-10 h-12"
          aria-label={t("placeholder")}
        />
      </div>
      <Button type="submit" size="lg" disabled={pending || !email.trim()}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : t("cta")}
      </Button>
      {error && (
        <p className="basis-full text-sm text-destructive sm:order-3">
          {error}
        </p>
      )}
    </form>
  );
}
