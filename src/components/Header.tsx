"use client";

import { useState } from "react";
import { shopLinkProps } from "@/lib/shops";
import type { HomeContent, Link, Shop } from "@/lib/content";

// Desktop x-positions (Figma design pixels) for the header menu items, in order.
const NAV_X = [382, 452.5, 549.14, 665.83, 748.84, 823.88, 946.68];
// Desktop logo slots for the header shop links, keyed by shop slug.
const SHOP_CLASS: Record<string, string> = { jiomart: "hdr-shop-jio", zepto: "hdr-shop-zepto", blinkit: "hdr-shop-blink" };

export default function Header({
  settings,
  nav,
  shops,
}: {
  settings: HomeContent["settings"];
  nav: Link[];
  shops: Shop[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="hdr">
      <div className="hdr-canvas">
        <a href="#top" className="hdr-logo" aria-label="NON STOP home">
          <img src={settings.logo ?? "/figma/logo.png"} alt={settings.site_name} />
        </a>

        <button
          type="button"
          className="hdr-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`hdr-nav${open ? " is-open" : ""}`} aria-label="Main">
          <ul>
            {nav.slice(0, NAV_X.length).map((item, i) => (
              <li key={item.label} style={{ "--x": NAV_X[i] } as React.CSSProperties}>
                <a href={item.url} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
                {item.url === "#products" && <img className="hdr-chev" src="/figma/chevron-down.svg" alt="" />}
              </li>
            ))}
            <li className="hdr-nav-shops" aria-label="Buy online">
              {shops.map((shop) => (
                <a key={shop.slug} href={shop.url} {...shopLinkProps} aria-label={`Buy on ${shop.name}`}>
                  {shop.logo && <img src={shop.logo} alt="" />}
                </a>
              ))}
            </li>
          </ul>
        </nav>

        <div className="hdr-shops" aria-label="Buy online">
          {shops
            .filter((shop) => SHOP_CLASS[shop.slug])
            .map((shop) => (
              <a
                key={shop.slug}
                className={`hdr-shop ${SHOP_CLASS[shop.slug]}`}
                href={shop.url}
                {...shopLinkProps}
                aria-label={`Buy on ${shop.name}`}
              >
                {shop.logo && <img src={shop.logo} alt="" />}
              </a>
            ))}
        </div>
      </div>
    </header>
  );
}
