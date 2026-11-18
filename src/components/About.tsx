"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AboutSlide, Section } from "@/lib/content";
import { assetSrc, type Assets } from "@/lib/assets";
import { fmt, type Labels } from "@/lib/labels";
import XMark from "./XMark";

// "NON STOP" labels sit close together along each ribbon (three clearly visible at once), with a circled ✕ halfway between them. They sit on an even grid along the
// ribbon and glide along it (see .ribbon-track); extra copies on each side let the loop restart without a visible jump.
const PITCH = 285; // horizontal distance between two labels (design pixels)
const COUNT = 9;
const SLOPE_A = 30.41 / 300.77; // ribbon A rises this much per pixel to the right
const SLOPE_B = 50.66 / 298.03; // ribbon B falls this much per pixel to the right
const ICON = 40; // icon box size
const RIBBON_A = Array.from({ length: COUNT }, (_, i) => ({ x: -127.56 + (i - 1) * PITCH, y: 2233.91 + (i - 1) * PITCH * SLOPE_A }));
const RIBBON_B = Array.from({ length: COUNT }, (_, i) => ({
  x: -103.64 + (i - 1) * PITCH,
  y: 2447.4 - (i - 1) * PITCH * SLOPE_B,
  w: 206.03,
  h: 78.93,
}));
// Centre of an icon = halfway between the centres of two neighbouring labels.
const iconA = (t: { x: number; y: number }) => ({ x: t.x + 204.781 / 2 + PITCH / 2 - ICON / 2, y: t.y + 65.87 / 2 + (PITCH / 2) * SLOPE_A - ICON / 2 });
const iconB = (t: { x: number; y: number; w: number; h: number }) => ({ x: t.x + t.w / 2 + PITCH / 2 - ICON / 2, y: t.y + t.h / 2 - (PITCH / 2) * SLOPE_B - ICON / 2 });

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
  assets,
  labels,
}: {
  section: Section;
  points: { title: string; body: string | null }[];
  slides: AboutSlide[];
  assets?: Assets;
  labels: Labels;
}) {
  const ribbonText = section.extra?.ribbon_text || "NON STOP";
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
          aria-label={labels.flavours}
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
                    <p>{ribbonText}</p>
                  </div>
                ))}
                {RIBBON_A.map((t, i) => {
                  const c = iconA(t);
                  return <XMark key={`ax${i}`} className="ribbon-x ribbon-x-a" style={{ "--x": c.x, "--y": c.y - TOP } as React.CSSProperties} />;
                })}
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
                    <p>{ribbonText}</p>
                  </div>
                ))}
                {RIBBON_B.map((t, i) => {
                  const c = iconB(t);
                  return <XMark key={`bx${i}`} className="ribbon-x ribbon-x-b" style={{ "--x": c.x, "--y": c.y - TOP } as React.CSSProperties} />;
                })}
              </div>
            </div>

            {list.map((s, n) => (
              <div
                key={s.name}
                className={`about-can about-can-${n + 1}${n === index ? " is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={fmt(labels.slide_of, { n: n + 1, count, name: s.name })}
                aria-hidden={n !== index}
              >
                <div>{s.can_image && <img src={s.can_image} alt={`NON STOP ${s.name} can`} />}</div>
              </div>
            ))}
          </div>

          {count > 1 && (
            <>
              <button type="button" className="about-arrow about-arrow-prev" aria-label={labels.previous_flavour} onClick={() => go(index - 1)}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button type="button" className="about-arrow about-arrow-next" aria-label={labels.next_flavour} onClick={() => go(index + 1)}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="about-dots" role="group" aria-label={labels.choose_flavour}>
            {list.map((s, n) => (
              <button
                key={s.name}
                type="button"
                className={`about-dot${n === index ? " is-active" : ""}`}
                aria-label={fmt(labels.show_flavour, { name: s.name })}
                aria-current={n === index}
                onClick={() => go(n)}
              />
            ))}
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {autoplay ? "" : fmt(labels.showing_flavour, { name: list[index].name })}
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
      <img className="strip strip-about" src={assetSrc(assets, "strip_about")} alt="" aria-hidden />
    </section>
  );
}
