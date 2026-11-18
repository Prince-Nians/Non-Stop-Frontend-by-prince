"use client";

import { useEffect, useRef, useState } from "react";
import type { EventItem } from "@/lib/content";

// The Figma design has three event slots; one card is expanded at a time.
const SLOT_CLASS = ["ev-1", "ev-2", "ev-3"];
const AUTO_MS = 4500; // time each card stays expanded
const HOLD_MS = 9000; // how long the automatic slider waits after someone interacts

/**
 * Automatic slider: the expanded card changes by itself every few seconds, with no visible controls.
 * Hovering (mouse) or tapping a card expands that card and pauses the slider for a while.
 * On touch screens the first tap expands a card and a second tap follows its link.
 */
export default function EventList({ events }: { events: EventItem[] }) {
  const items = events.slice(0, SLOT_CLASS.length);
  const [active, setActive] = useState(0);
  const holdUntil = useRef(0);
  const hovering = useRef(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const id = window.setInterval(() => {
      if (reduceMotion.current || hovering.current || document.hidden || Date.now() < holdUntil.current) return;
      setActive((a) => (a + 1) % items.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  const choose = (i: number) => {
    holdUntil.current = Date.now() + HOLD_MS;
    setActive(i);
  };

  return (
    <ul
      className="ev-list"
      data-active={active + 1}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => {
        hovering.current = false;
        holdUntil.current = Date.now() + 1500;
      }}
    >
      {items.map((e, i) => (
        <li key={e.slug} className={`ev ${SLOT_CLASS[i]}${i === active ? " is-active" : ""}`} onMouseEnter={() => choose(i)}>
          <a
            href="#events"
            aria-label={e.title}
            onFocus={() => choose(i)}
            onClick={(ev) => {
              if (i !== active && window.matchMedia("(hover: none)").matches) {
                ev.preventDefault();
                choose(i);
              }
            }}
          >
            {e.image && <img className="ev-img" src={e.image} alt="" />}
            <span className="ev-fade" aria-hidden />
            <span className="ev-text">{e.title}</span>
            <img className="ev-arrow" src="/figma/arrow-right.svg" alt="" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
