import type { Metadata } from "next";
export const SITE_URL = "https://junsemi.co.kr";
export const BRAND = "JUNgenius · 제이유엔지니어스";
export const EMAIL = "hello@junsemi.co.kr";
export type SiteLocale = "ko" | "en";
export const isProductionSite =
  (process.env.VERCEL_ENV === "production" && process.env.SITE_INDEXABLE !== "false") ||
  (!process.env.VERCEL_ENV && process.env.SITE_INDEXABLE === "true");
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  locale: SiteLocale = "ko",
): Metadata {
  const koPath = locale === "en" ? path.replace(/^\/en(?=\/|$)/, "") || "/" : path;
  const enPath = locale === "en" ? path : path === "/" ? "/en" : `/en${path}`;
  return {
    title: { absolute: `${title} | ${BRAND}` },
    description,
    alternates: {
      canonical: path,
      languages: { "ko-KR": koPath, en: enPath, "x-default": koPath },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BRAND,
      locale: locale === "en" ? "en_US" : "ko_KR",
      alternateLocale: locale === "en" ? ["ko_KR"] : ["en_US"],
      type: "website",
      images: ["/images/logo_v2.png"],
    },
  };
}
export function englishPageMetadata(title: string, description: string, path: string) {
  return pageMetadata(title, description, path, "en");
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
