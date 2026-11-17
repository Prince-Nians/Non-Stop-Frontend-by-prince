"use client";

import { useEffect } from "react";

/**
 * Phones and tablets have no "hover", so the hover animations never play there.
 * On touch screens this makes each section's items rise / pop in, one after another, as they scroll into view.
 * Desktop (mouse) keeps its hover animations and is left untouched. Off for "reduce motion".
 */
const GROUPS: { sel: string; move?: boolean }[] = [
  { sel: ".sec-title", move: true },
  { sel: ".prod-desc, .events-desc, .social-desc, .about-desc, .blogs-desc", move: true },
  { sel: ".prod-card" },
  { sel: ".band-shop", move: true },
  { sel: ".band-btn, .about-btn, .social-btn, .events-btn", move: true },
  { sel: ".about-point", move: true },
  { sel: ".sp" },
  { sel: ".ev", move: true },
  { sel: ".blog-main, .blog-row", move: true },
];

export default function TouchReveal() {
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new Set<Element>();
    const items: HTMLElement[] = [];
    for (const g of GROUPS) {
      document.querySelectorAll<HTMLElement>(g.sel).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Stagger siblings that appear together (max 4 steps so nothing waits long).
        const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(g.sel)) : [];
        el.style.setProperty("--rv-i", String(Math.min(Math.max(sibs.indexOf(el), 0), 4)));
        el.classList.add("rv");
        if (g.move) el.classList.add("rv-move");
        items.push(el);
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("rv-in");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      items.forEach((el) => el.classList.remove("rv", "rv-move", "rv-in"));
    };
  }, []);

  return null;
}
