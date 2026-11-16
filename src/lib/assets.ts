import type { HomeContent } from "./content";

/** Built-in artwork, used when the CMS has not provided (or cannot provide) a replacement. */
export const ASSET_DEFAULTS: Record<string, string> = {
  hero_can_classic: "/figma/hero-can-classic-fit.png",
  hero_can_jungle: "/figma/hero-can-jungle.png",
  hero_can_zero: "/figma/hero-can-zero-fit.png",
  hero_can_boost: "/figma/hero-can-boost-fit.png",
  hero_ellipse_left: "/figma/hero-ellipse-l.svg",
  hero_ellipse_right: "/figma/hero-ellipse-r.svg",
  strip_hero: "/figma/checker-products.svg",
  strip_band: "/figma/checker-products.svg",
  strip_about: "/figma/checker-social.svg",
  strip_blogs: "/figma/checker-blogs.svg",
};

export type Assets = HomeContent["assets"] | undefined;

export function assetSrc(assets: Assets, key: string): string {
  return assets?.[key]?.image ?? ASSET_DEFAULTS[key];
}

export function assetAlt(assets: Assets, key: string, fallback = ""): string {
  return assets?.[key]?.alt ?? fallback;
}
