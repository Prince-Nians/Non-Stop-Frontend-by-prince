"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { HeroSlide } from "@/lib/content";
import { fmt, type Labels } from "@/lib/labels";

const AUTOPLAY_MS = 3500;

/**
 * Main banner: a slider of flat banner images plus the built-in stadium artwork
 * (the slide with kind "stadium", whose markup is passed in as `stadium`).
 */
export default function HeroSlider({
  slides,
  title,
  stadium,
  stripSrc,
  labels,
}: {
  slides: HeroSlide[];
  title: string;
  stadium: ReactNode;
  stripSrc: string;
  labels: Labels;
}) {
  // With no slides from the CMS, show the stadium artwork alone.
  const list: HeroSlide[] = slides.length
    ? slides
    : [{ kind: "stadium", name: "Stadium", image: null, mobile_image: null, alt: null, url: null }];
  const count = list.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const autoplay = count > 1 && !paused && !reduceMotion;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, count, index]);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={title}
      // Keeps moving while the mouse is over it; only keyboard focus pauses it so tabbing through stays usable.
      onFocus={(e) => setPaused(e.target.matches(":focus-visible"))}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <h1 className="sr-only">{title}</h1>

      {list.map((s, n) => {
        const active = n === index;
        const img =
          s.kind === "banner" && s.image ? (
            <picture>
              {s.mobile_image && <source media="(max-width: 767px)" srcSet={s.mobile_image} />}
              <img
                className="hero-banner"
                src={s.image}
                alt={s.alt ?? s.name}
                loading={n === 0 ? "eager" : "lazy"}
                fetchPriority={n === 0 ? "high" : "auto"}
                draggable={false}
              />
            </picture>
          ) : null;
        return (
          <div
            key={`${s.kind}-${s.name}-${n}`}
            className={`hero-slide hero-slide-${s.kind}${active ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={fmt(labels.slide_of, { n: n + 1, count, name: s.name })}
            aria-hidden={!active}
          >
            {s.kind === "stadium" ? stadium : s.url ? <a href={s.url} tabIndex={active ? 0 : -1}>{img}</a> : img}
          </div>
        );
      })}

      {count > 1 && (
        <>
          <button type="button" className="hero-arrow hero-arrow-prev" aria-label={labels.previous_slide} onClick={() => go(index - 1)}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="hero-arrow hero-arrow-next" aria-label={labels.next_slide} onClick={() => go(index + 1)}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="hero-dots" role="group" aria-label={labels.choose_slide}>
            {list.map((s, n) => (
              <button
                key={`${s.name}-${n}`}
                type="button"
                className={`hero-dot${n === index ? " is-active" : ""}`}
                aria-label={fmt(labels.show_slide, { name: s.name })}
                aria-current={n === index}
                onClick={() => go(n)}
              />
            ))}
          </div>
        </>
      )}
      <p className="sr-only" aria-live="polite">
        {autoplay ? "" : fmt(labels.showing_slide, { n: index + 1, count, name: list[index].name })}
      </p>

      <img className="strip strip-hero" src={stripSrc} alt="" aria-hidden />
    </section>
  );
}
