import type { MetadataRoute } from "next";
import { getHome } from "@/lib/content";
import { SEO_PAGES, siteUrl } from "@/lib/seo";

/** /sitemap.xml — lists every page that is not hidden from search engines in the CMS. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home = await getHome();
  return SEO_PAGES.filter((p) => !home.seo?.[p.key]?.no_index).map((p) => ({
    url: `${siteUrl()}${p.path}`,
    changeFrequency: p.key === "home" ? "weekly" : "monthly",
    priority: p.key === "home" ? 1 : 0.7,
  }));
}
