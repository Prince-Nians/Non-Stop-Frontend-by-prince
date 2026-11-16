/**
 * Menu/footer links come from the CMS as "#about"-style anchors. They must work from every page, so anchors
 * become "/#about" (same-page scroll on the homepage, jump home from other pages). "#contact" opens the Contact page.
 */
export function navHref(url: string): string {
  if (url === "#contact") return "/contact";
  if (url === "#top") return "/#top";
  return url.startsWith("#") ? `/${url}` : url;
}
