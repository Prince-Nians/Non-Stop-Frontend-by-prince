import type { Metadata } from "next";
import type { HomeContent } from "./content";

/** The pages that exist on the website: their CMS key (matches page_seos.page) and public path. Add a line when a page is built. */
export const SEO_PAGES = [
  { key: "home", path: "/" },
  { key: "contact", path: "/contact" },
] as const;

export type PageKey = (typeof SEO_PAGES)[number]["key"];

/** Public address of the site (for canonical links, share previews and the sitemap). */
export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (env) return env.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3100";
}

/**
 * Builds the <head> tags of one page from its CMS "SEO" tab: title, description, keywords,
 * canonical link, robots, Open Graph (Facebook / WhatsApp / LinkedIn) and Twitter cards.
 * Anything left empty in the CMS falls back to sensible defaults, so a page always has valid tags.
 */
export function pageMetadata(home: HomeContent, key: PageKey, fallbackTitle: string): Metadata {
  const page = SEO_PAGES.find((p) => p.key === key)!;
  const seo = home.seo?.[key];
  const site = home.settings;

  const title = seo?.title || (key === "home" ? site.seo.title : null) || fallbackTitle;
  const description =
    seo?.description || (key === "home" ? site.seo.description : null) || site.seo.description || "NON STOP energy drink — products, partnerships, events and blogs.";
  const url = seo?.canonical_url || `${siteUrl()}${page.path}`;
  const image = seo?.og_image || site.logo || undefined;
  const ogTitle = seo?.og_title || title;
  const ogDescription = seo?.og_description || description;

  return {
    title,
    description,
    keywords: seo?.keywords || undefined,
    alternates: { canonical: url },
    robots: seo?.no_index ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.site_name,
      url,
      title: ogTitle,
      description: ogDescription,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: ogTitle, description: ogDescription, images: image ? [image] : undefined },
  };
}
