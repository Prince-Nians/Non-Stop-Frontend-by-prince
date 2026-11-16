import { cacheLife, cacheTag } from "next/cache";
import fallback from "./home.fallback.json";

export type Link = { label: string; url: string };
export type Shop = { name: string; slug: string; url: string; logo: string | null };
export type Section = {
  title: string | null;
  subtitle: string | null;
  description: string | null;
  button: { label: string; url: string | null } | null;
  image: string | null;
  image_secondary: string | null;
  extra: Record<string, string>;
};
export type Product = {
  name: string;
  slug: string;
  description: string | null;
  color: string;
  border_color: string;
  background_image: string | null;
  can_image: string | null;
  button: { label: string; url: string | null };
};
export type Post = {
  title: string;
  slug: string;
  tag?: string;
  excerpt?: string;
  image?: string | null;
  thumbnail?: string | null;
  featured?: boolean;
  published_at?: string;
};
export type HeroSlide = {
  kind: "banner" | "stadium";
  name: string;
  image: string | null;
  mobile_image: string | null;
  alt: string | null;
  url: string | null;
};
export type AboutSlide = {
  name: string;
  can_image: string | null;
  colors: { ribbon_a: string; ribbon_b: string; title: string; number: string; point_title: string; button: string };
};
export type EventItem = { title: string; slug: string; excerpt?: string; image?: string | null; published_at?: string };

export type HomeContent = {
  settings: {
    site_name: string;
    logo: string | null;
    phone: string | null;
    email: string | null;
    copyright: string | null;
    social: { facebook: string | null; youtube: string | null; linkedin: string | null; twitter: string | null };
    seo: { title: string | null; description: string | null };
  };
  nav: { header: Link[]; footer: Link[]; legal: Link[] };
  shops: Shop[];
  sections: Record<string, Section>;
  products: Product[];
  hero_slides: HeroSlide[];
  about_slides: AboutSlide[];
  about_points: { title: string; body: string | null }[];
  social_photos: { image: string | null; alt: string | null; url: string | null }[];
  events: EventItem[];
  blogs: Post[];
};

const FALLBACK = fallback as unknown as HomeContent;

/**
 * Homepage content from the Laravel CMS. Cached and tagged "home" so the CMS can
 * revalidate it on demand. If the API is down, the bundled snapshot keeps the site up.
 */
export async function getHome(): Promise<HomeContent> {
  "use cache";
  cacheTag("home");
  cacheLife("minutes");

  const base = process.env.CMS_API_URL;
  if (!base) return FALLBACK;

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/home`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    const json = (await res.json()) as { data: HomeContent };
    return json.data;
  } catch (err) {
    console.error("[cms] falling back to bundled content:", err);
    return FALLBACK;
  }
}
