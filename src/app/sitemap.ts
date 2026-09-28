import type { MetadataRoute } from "next";
import { getCases } from "@/lib/cases-db";
import { getExpertiseList } from "@/lib/expertise-db";
import { SITE_URL } from "@/lib/site";
import services from "@/lib/service-content.json";
import guides from "@/lib/guide-content.json";

export const dynamic = "force-dynamic";

function localizedEntry(path: string, locale: "ko" | "en", lastModified?: string) {
  const koPath = path || "";
  const enPath = path ? `/en${path}` : "/en";
  return {
    url: `${SITE_URL}${locale === "en" ? enPath : koPath}`,
    lastModified,
    alternates: {
      languages: {
        "ko-KR": `${SITE_URL}${koPath}`,
        en: `${SITE_URL}${enPath}`,
        "x-default": `${SITE_URL}${koPath}`,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cases, expertise] = await Promise.all([getCases(), getExpertiseList()]);
  const sharedPages = [
    "",
    "/expertise",
    "/cases",
    "/support",
    "/partner",
    "/contact",
    "/privacy",
    "/terms",
    ...services.map((service) => `/services/${service.slug}`),
    ...guides.map((guide) => `/support/${guide.slug}`),
  ];
  const localized = sharedPages.flatMap((path) => [localizedEntry(path, "ko"), localizedEntry(path, "en")]);
  const casePages = cases
    .filter((item) => item.status === "published")
    .flatMap((item) => [
      localizedEntry(`/cases/${item.id}`, "ko", item.updatedAt),
      localizedEntry(`/cases/${item.id}`, "en", item.updatedAt),
    ]);
  const expertisePages = expertise.map((item) => ({
    url: `${SITE_URL}/expertise/${item.id}`,
    lastModified: item.updatedAt,
  }));
  return [...localized, ...casePages, ...expertisePages];
}
