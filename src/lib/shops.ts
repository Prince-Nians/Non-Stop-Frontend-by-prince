// Online shops where NON STOP is sold. Links point to each platform's home page for now;
// replace with product-specific URLs when available.
export const SHOPS = {
  jiomart: { name: "JioMart", href: "https://www.jiomart.com" },
  zepto: { name: "Zepto", href: "https://www.zeptonow.com" },
  blinkit: { name: "Blinkit", href: "https://blinkit.com" },
} as const;

export const shopLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
