/** Default screen-reader / tooltip text. Every key can be overridden in the CMS (Homepage → Sections → Accessibility labels). */
export const DEFAULT_LABELS = {
  site_home: "NON STOP home",
  main_menu: "Main",
  buy_online: "Buy online",
  buy_on: "Buy on {name}",
  buy_and_partner: "Buy now and partner program",
  open_menu: "Open menu",
  close_menu: "Close menu",
  quick_links_nav: "Quick links",
  previous_slide: "Previous slide",
  next_slide: "Next slide",
  choose_slide: "Choose slide",
  show_slide: "Show {name}",
  slide_of: "{n} of {count}: {name}",
  showing_slide: "Showing slide {n} of {count}: {name}",
  flavours: "NON STOP flavours",
  previous_flavour: "Previous flavour",
  next_flavour: "Next flavour",
  choose_flavour: "Choose flavour",
  show_flavour: "Show {name}",
  showing_flavour: "Showing {name}",
  close: "Close",
  previous: "Previous",
  next: "Next",
  open_larger: "Open larger: {alt}",
  view_on_instagram: "View on Instagram",
  view_original: "View original",
  sound_on: "Turn sound on",
  sound_off: "Turn sound off",
};

export type Labels = Record<keyof typeof DEFAULT_LABELS, string>;

export function makeLabels(extra?: Record<string, string> | null): Labels {
  const out: Record<string, string> = { ...DEFAULT_LABELS };
  for (const [k, v] of Object.entries(extra ?? {})) if (typeof v === "string" && v.trim()) out[k] = v;
  return out as Labels;
}

/** Fills {placeholders} in a label. */
export function fmt(text: string, vars: Record<string, string | number | null | undefined> = {}): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
