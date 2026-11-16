"use client";

import { useEffect } from "react";

/**
 * A light parallax: section backgrounds drift slower than the page, and a few foreground
 * layers (hero cans, product cards, social cards) move slightly faster, each at its own speed.
 *
 * It uses the independent CSS `translate` property, so it never clashes with the existing
 * `transform`s (tilts, hovers) and never affects layout. Off for "reduce motion".
 */
type Layer = {
  sel: string; // elements to move
  anchor: string; // stable ancestor used to measure scroll position (never moved itself)
  k: number; // + = moves faster than the page, - = slower (backgrounds)
  max: number; // largest shift in px
  bg?: boolean; // backgrounds are enlarged slightly so the shift never shows an edge
};

const LAYERS: Layer[] = [
  // The stadium photo itself is deliberately left still so the artwork keeps its exact framing.
  { sel: ".band-bg", anchor: ".band", k: -0.06, max: 22, bg: true },
  { sel: ".social-bg", anchor: ".social", k: -0.06, max: 26, bg: true },
  { sel: ".blogs-bg", anchor: ".blogs", k: -0.06, max: 26, bg: true },
  { sel: ".hero-cluster-l", anchor: ".hero", k: 0.05, max: 22 },
  { sel: ".hero-cluster-r", anchor: ".hero", k: 0.075, max: 34 },
  { sel: ".sp-1", anchor: ".social", k: 0.03, max: 16 },
  { sel: ".sp-2", anchor: ".social", k: 0.05, max: 24 },
  { sel: ".sp-3", anchor: ".social", k: 0.075, max: 32 },
  { sel: ".prod-card.p-blue, .prod-card.p-purple", anchor: ".prod", k: 0.03, max: 16 },
  { sel: ".prod-card.p-green, .prod-card.p-zero", anchor: ".prod", k: 0.05, max: 24 },
];

const BG_SCALE = 1.08;

export default function ParallaxScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = LAYERS.flatMap((l) =>
      Array.from(document.querySelectorAll<HTMLElement>(l.sel)).map((el) => ({
        el,
        l,
        anchor: el.closest<HTMLElement>(l.anchor),
      })),
    ).filter((i) => i.anchor);

    items.forEach(({ el, l }) => {
      if (l.bg) el.style.scale = String(BG_SCALE);
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const gentle = window.innerWidth < 768 ? 0.6 : 1; // calmer on phones
      for (const { el, l, anchor } of items) {
        const r = anchor!.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) continue; // far off screen
        const offset = r.top + r.height / 2 - vh / 2; // 0 when the section is centred
        // Backgrounds may only move as far as their enlargement allows.
        const limit = Math.min(l.max, l.bg ? r.height * ((BG_SCALE - 1) / 2) - 1 : l.max) * gentle;
        const y = Math.max(-limit, Math.min(limit, offset * l.k * gentle));
        el.style.translate = `0 ${y.toFixed(1)}px`;
      }
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (raf) cancelAnimationFrame(raf);
      items.forEach(({ el }) => {
        el.style.translate = "";
        el.style.scale = "";
      });
    };
  }, []);

  return null;
}
