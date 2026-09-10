import type { MetadataRoute } from "next";
import { SITE_URL, isProductionSite } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: isProductionSite
      ? { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
