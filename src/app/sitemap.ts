import type { MetadataRoute } from "next";
import { getCases } from "@/lib/cases-db";
import { getExpertiseList } from "@/lib/expertise-db";
import { SITE_URL } from "@/lib/site";
import services from "@/lib/service-content.json";
import guides from "@/lib/guide-content.json";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cases, expertise] = await Promise.all([
    getCases(),
    getExpertiseList(),
  ]);
  const pages = [
    "",
    "/expertise",
    "/cases",
    "/support",
    "/partner",
    "/contact",
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.slug}`),
    ...guides.map((g) => `/support/${g.slug}`),
  ];
  return [
    ...pages.map((p) => ({ url: SITE_URL + p })),
    ...cases
      .filter((c) => c.status === "published")
      .map((c) => ({
        url: `${SITE_URL}/cases/${c.id}`,
        lastModified: c.updatedAt,
      })),
    ...expertise.map((e) => ({
      url: `${SITE_URL}/expertise/${e.id}`,
      lastModified: e.updatedAt,
    })),
  ];
}
