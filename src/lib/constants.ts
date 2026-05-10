export const BUSINESS = {
  name: "GOLF AL MAR",
  shortName: "Golf Al Mar",
  tagline: {
    en: "Performance gear for golfers — sun protection & magic grip.",
    de: "Performance-Ausrüstung für Golfer — Sonnenschutz & Magic Grip.",
    es: "Equipamiento de rendimiento para golfistas — protección solar y agarre mágico.",
  },
  founded: 2013,
  email: "hello@golfalmar.com",
  currency: "eur",
} as const;

export const LOCALES = ["en", "de", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

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
