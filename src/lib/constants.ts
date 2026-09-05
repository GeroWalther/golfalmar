export const BUSINESS = {
  name: "GOLF AL MAR",
  shortName: "Golf Al Mar",
  tagline: {
    en: "Performance gear for golfers — sun protection & magic grip.",
    de: "Performance-Ausrüstung für Golfer — Sonnenschutz & Magic Grip.",
    es: "Equipamiento de rendimiento para golfistas — protección solar y agarre mágico.",
    zh: "为高尔夫球手打造的高性能装备 — 防晒与魔力握把。",
    ja: "ゴルファーのためのパフォーマンスギア — 日焼け止めとマジックグリップ。",
  },
  founded: 2013,
  email: "hello@golfalmar.com",
  currency: "eur",
} as const;

export const LOCALES = ["en", "de", "es", "zh", "ja"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Per-locale presentation metadata. Keeping the OpenGraph tag, the
 * Intl date locale and the Stripe Checkout locale in one place means adding a
 * language only touches LOCALES + this map instead of a dozen ternaries.
 */
export const LOCALE_META: Record<
  Locale,
  { label: string; flag: string; og: string; date: string; stripe: string }
> = {
  en: { label: "EN", flag: "🇬🇧", og: "en_US", date: "en-GB", stripe: "en" },
  de: { label: "DE", flag: "🇩🇪", og: "de_DE", date: "de-DE", stripe: "de" },
  es: { label: "ES", flag: "🇪🇸", og: "es_ES", date: "es-ES", stripe: "es" },
  zh: { label: "中文", flag: "🇨🇳", og: "zh_CN", date: "zh-CN", stripe: "zh" },
  ja: { label: "日本語", flag: "🇯🇵", og: "ja_JP", date: "ja-JP", stripe: "ja" },
};

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:1515";

export const SEO_KEYWORDS = [
  "Golf Al Mar",
  "golf sunscreen",
  "sport sunscreen",
  "magic golf grip",
  "golf grip enhancer",
  "golfer sun protection",
  "DOLO golf",
  "golf joint relief",
  "golf muscle relief",
  "golf accessories",
];
