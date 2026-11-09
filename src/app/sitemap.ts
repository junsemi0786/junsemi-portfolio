import type { MetadataRoute } from "next";
import { getCases } from "@/lib/cases-db";
import { getExpertiseList } from "@/lib/expertise-db";
import { SITE_URL } from "@/lib/site";
import services from "@/lib/service-content.json";
import guides from "@/lib/guide-content.json";

export const dynamic = "force-dynamic";

const CONTENT_UPDATED = "2026-11-09T00:00:00.000Z";
const UPDATED_STATIC_PAGES = new Set([
  "",
  "/services/semiconductor",
  "/services/plc",
  "/support/legacy-plc-replacement",
]);

function localizedEntry(
  path: string,
  locale: "ko" | "en",
  lastModified?: string,
  images?: string[],
) {
  const koPath = path || "";
  const enPath = path ? `/en${path}` : "/en";
  return {
    url: `${SITE_URL}${locale === "en" ? enPath : koPath}`,
    lastModified,
    images,
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
  const localized = sharedPages.flatMap((path) => {
    const lastModified = UPDATED_STATIC_PAGES.has(path) ? CONTENT_UPDATED : undefined;
    return [localizedEntry(path, "ko", lastModified), localizedEntry(path, "en", lastModified)];
  });
  const casePages = cases
    .filter((item) => item.status === "published")
    .flatMap((item) => {
      const images = [item.thumbnailUrl, ...(item.gallery || [])]
        .filter((image): image is string => Boolean(image))
        .map((image) => `${SITE_URL}${image}`);
      return [
        localizedEntry(`/cases/${item.id}`, "ko", item.updatedAt, images),
        localizedEntry(`/cases/${item.id}`, "en", item.updatedAt, images),
      ];
    });
  const expertisePages = expertise.map((item) => ({
    url: `${SITE_URL}/expertise/${item.id}`,
    lastModified: item.updatedAt,
  }));
  return [...localized, ...casePages, ...expertisePages];
}
