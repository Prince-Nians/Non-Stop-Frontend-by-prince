"use client";

import { useState } from "react";
import { SHOPS, shopLinkProps } from "@/lib/shops";

const NAV: { label: string; href: string; x: number; chevron?: boolean }[] = [
  { label: "HOME", href: "#top", x: 382 },
  { label: "ABOUT US", href: "#about", x: 452.5 },
  { label: "PRODUCTS", href: "#products", x: 549.14, chevron: true },
  { label: "EVENTS", href: "#events", x: 665.83 },
  { label: "BLOGS", href: "#blogs", x: 748.84 },
  { label: "PARTNERSHIP", href: "#partner", x: 823.88 },
  { label: "CONTACT US", href: "#contact", x: 946.68 },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="hdr">
      <div className="hdr-canvas">
        <a href="#top" className="hdr-logo" aria-label="NON STOP home">
          <img src="/figma/logo.png" alt="NON STOP" />
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
            {NAV.map((item) => (
              <li key={item.label} style={{ "--x": item.x } as React.CSSProperties}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
                {item.chevron && <img className="hdr-chev" src="/figma/chevron-down.svg" alt="" />}
              </li>
            ))}
            <li className="hdr-nav-shops" aria-label="Buy online">
              <a href={SHOPS.jiomart.href} {...shopLinkProps} aria-label="Buy on JioMart">
                <img src="/figma/jiomart.png" alt="" />
              </a>
              <a href={SHOPS.zepto.href} {...shopLinkProps} aria-label="Buy on Zepto">
                <img src="/figma/zepto.png" alt="" />
              </a>
              <a href={SHOPS.blinkit.href} {...shopLinkProps} aria-label="Buy on Blinkit">
                <img src="/figma/blinkit.png" alt="" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="hdr-shops" aria-label="Buy online">
          <a className="hdr-shop hdr-shop-jio" href={SHOPS.jiomart.href} {...shopLinkProps} aria-label="Buy on JioMart">
            <img src="/figma/jiomart.png" alt="" />
          </a>
          <a className="hdr-shop hdr-shop-zepto" href={SHOPS.zepto.href} {...shopLinkProps} aria-label="Buy on Zepto">
            <img src="/figma/zepto.png" alt="" />
          </a>
          <a className="hdr-shop hdr-shop-blink" href={SHOPS.blinkit.href} {...shopLinkProps} aria-label="Buy on Blinkit">
            <img src="/figma/blinkit.png" alt="" />
          </a>
        </div>
      </div>
    </header>
  );
}
