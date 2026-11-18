"use client";

import { useEffect } from "react";

/**
 * Plays the Our Products entrance when the section scrolls into view: the cards flip up one after another
 * and each can pops in. Works on every device; off for "reduce motion".
 */
export default function ProductsReveal() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".prod");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.6 && r.bottom > 0) return; // already on screen at load: no animation, no flash
    el.classList.add("rv-wait");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.remove("rv-wait");
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("rv-wait", "is-in");
    };
  }, []);

  return null;
}
