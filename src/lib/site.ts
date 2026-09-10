import type { Metadata } from "next";
export const SITE_URL = "https://junsemi.co.kr";
export const BRAND = "JUNgenius · 제이유엔지니어스";
export const EMAIL = "hello@junsemi.co.kr";
export const isProductionSite =
  (process.env.VERCEL_ENV === "production" && process.env.SITE_INDEXABLE !== "false") ||
  (!process.env.VERCEL_ENV && process.env.SITE_INDEXABLE === "true");
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | ${BRAND}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BRAND,
      locale: "ko_KR",
      type: "website",
      images: ["/images/logo_v2.png"],
    },
  };
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
