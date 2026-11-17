import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** /robots.txt — everything is open to search engines except the internal API routes. */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }], sitemap: `${siteUrl()}/sitemap.xml` };
}
