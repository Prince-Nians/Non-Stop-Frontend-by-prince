"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AboutSlide, Section } from "@/lib/content";

// The "NON STOP" labels sit on an even grid along each ribbon and glide slowly along it (see .ribbon-track).
// One extra label on each side lets the loop restart without a visible jump.
const RIBBON_A = Array.from({ length: 8 }, (_, i) => ({ x: -127.56 + (i - 1) * 300.77, y: 2233.91 + (i - 1) * 30.41 }));
const RIBBON_B = Array.from({ length: 8 }, (_, i) => ({
  x: -103.64 + (i - 1) * 298.03,
  y: 2447.4 - (i - 1) * 50.66,
  w: 206.03,
  h: 78.93,
}));

// Section top in the Figma frame — used to turn frame coordinates into section-relative ones.
const TOP = 1888;

const AUTOPLAY_MS = 5500;

// Used only if the CMS has no slides: the original blue "Classic" look.
const DEFAULT_COLORS: AboutSlide["colors"] = {
  ribbon_a: "#0062a0",
  ribbon_b: "#21306a",
  title: "#053588",
  number: "#0062a0",
  point_title: "#21306a",
  button: "#008240",
};

export default function About({
  section,
  points,
  slides,
}: {
  section: Section;
  points: { title: string; body: string | null }[];
  slides: AboutSlide[];
}) {
  // The Figma has room for four flavours; each has its own can placement.
  const list: AboutSlide[] = slides.length
    ? slides.slice(0, 4)
    : [{ name: "Classic", can_image: section.image, colors: DEFAULT_COLORS }];
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

  const c = list[index].colors;
  const theme = {
    "--about-a": c.ribbon_a,
    "--about-b": c.ribbon_b,
    "--about-title": c.title,
    "--about-num": c.number,
    "--about-pt": c.point_title,
    "--about-btn": c.button,
  } as React.CSSProperties;

  return (
    <section
      className="about"
      id="about"
      aria-labelledby="about-title"
      style={theme}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="about-canvas">
        <h2 id="about-title" className="sec-title about-title">
          {section.title}
        </h2>
        <p className="about-desc">{section.description}</p>

        <div
          className="about-art"
          role="group"
          aria-roledescription="carousel"
          aria-label="NON STOP flavours"
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
          <div className="about-stage">
            <div className="ribbons" aria-hidden>
              <div className="ribbon ribbon-a">
                <div className="ribbon-bar ribbon-bar-a" />
              </div>
              <div className="ribbon-track ribbon-track-a">
                {RIBBON_A.map((t, i) => (
                  <div
                    key={`a${i}`}
                    className="ribbon-txt ribbon-txt-a"
                    style={{ "--x": t.x, "--y": t.y - TOP } as React.CSSProperties}
                  >
                    <p>NON STOP</p>
                  </div>
                ))}
              </div>
              <div className="ribbon ribbon-b">
                <div className="ribbon-bar ribbon-bar-b" />
              </div>
              <div className="ribbon-track ribbon-track-b">
                {RIBBON_B.map((t, i) => (
                  <div
                    key={`b${i}`}
                    className="ribbon-txt ribbon-txt-b"
                    style={{ "--x": t.x, "--y": t.y - TOP, "--w": t.w, "--h": t.h } as React.CSSProperties}
                  >
                    <p>NON STOP</p>
                  </div>
                ))}
              </div>
            </div>

            {list.map((s, n) => (
              <div
                key={s.name}
                className={`about-can about-can-${n + 1}${n === index ? " is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${n + 1} of ${count}: ${s.name}`}
                aria-hidden={n !== index}
              >
                <div>{s.can_image && <img src={s.can_image} alt={`NON STOP ${s.name} can`} />}</div>
              </div>
            ))}
          </div>

          {count > 1 && (
            <>
              <button type="button" className="about-arrow about-arrow-prev" aria-label="Previous flavour" onClick={() => go(index - 1)}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" className="about-arrow about-arrow-next" aria-label="Next flavour" onClick={() => go(index + 1)}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="about-dots" role="group" aria-label="Choose flavour">
            {list.map((s, n) => (
              <button
                key={s.name}
                type="button"
                className={`about-dot${n === index ? " is-active" : ""}`}
                aria-label={`Show ${s.name}`}
                aria-current={n === index}
                onClick={() => go(n)}
              />
            ))}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {autoplay ? "" : `Showing ${list[index].name}`}
        </p>

        <ol className="about-points">
          {points.slice(0, 4).map((p, i) => (
            <li key={p.title} className={`about-point about-point-${i + 1}`}>
              <span className="about-num">{String(i + 1).padStart(2, "0")}</span>
              <img className="about-rule" src="/figma/about-line.svg" alt="" aria-hidden />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>

        {section.button && (
          <a href={section.button.url ?? "#partner"} className="about-btn">
            {section.button.label}
          </a>
        )}
      </div>
      <img className="strip strip-about" src="/figma/checker-social.svg" alt="" aria-hidden />
    </section>
  );
}
