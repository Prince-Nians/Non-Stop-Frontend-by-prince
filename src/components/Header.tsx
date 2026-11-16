"use client";

import { useState } from "react";
import { shopLinkProps } from "@/lib/shops";
import type { HomeContent, Link, Shop } from "@/lib/content";
import { fmt, type Labels } from "@/lib/labels";
import { navHref } from "@/lib/links";

// Desktop x-positions (Figma design pixels) for the header menu items, in order.
const NAV_X = [382, 452.5, 549.14, 665.83, 748.84, 823.88, 946.68];
// Desktop logo slots for the header shop links, keyed by shop slug.
const SHOP_CLASS: Record<string, string> = { jiomart: "hdr-shop-jio", zepto: "hdr-shop-zepto", blinkit: "hdr-shop-blink" };

export default function Header({
  settings,
  nav,
  shops,
  labels,
}: {
  settings: HomeContent["settings"];
  nav: Link[];
  shops: Shop[];
  labels: Labels;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="hdr">
      <div className="hdr-canvas">
        <a href="/" className="hdr-logo" aria-label={labels.site_home}>
          <img src={settings.logo ?? "/figma/logo.png"} alt={settings.site_name} />
        </a>

        <button
          type="button"
          className="hdr-burger"
          aria-label={open ? labels.close_menu : labels.open_menu}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav id="main-nav" className={`hdr-nav${open ? " is-open" : ""}`} aria-label={labels.main_menu}>
          <ul>
            {nav.slice(0, NAV_X.length).map((item, i) => (
              <li key={item.label} style={{ "--x": NAV_X[i] } as React.CSSProperties}>
                <a href={navHref(item.url)} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
                {item.url === "#products" && <img className="hdr-chev" src="/figma/chevron-down.svg" alt="" />}
              </li>
            ))}
            <li className="hdr-nav-shops" aria-label={labels.buy_online}>
              {shops.map((shop) => (
                <a key={shop.slug} href={shop.url} {...shopLinkProps} aria-label={fmt(labels.buy_on, { name: shop.name })}>
                  {shop.logo && <img src={shop.logo} alt="" />}
                </a>
              ))}
            </li>
          </ul>
        </nav>

        <div className="hdr-shops" aria-label={labels.buy_online}>
          {shops
            .filter((shop) => SHOP_CLASS[shop.slug])
            .map((shop) => (
              <a
                key={shop.slug}
                className={`hdr-shop ${SHOP_CLASS[shop.slug]}`}
                href={shop.url}
                {...shopLinkProps}
                aria-label={fmt(labels.buy_on, { name: shop.name })}
              >
                {shop.logo && <img src={shop.logo} alt="" />}
              </a>
            ))}
        </div>
      </div>
    </header>
  );
}
