"use client";

import { useState } from "react";
import type { EventItem } from "@/lib/content";

// The Figma design has three event slots. The first starts expanded.
// With a mouse, hovering a card expands it (pure CSS). On touch screens there is no hover, so the first tap expands a card
// and a second tap follows its link.
const SLOT_CLASS = ["ev-1", "ev-2", "ev-3"];

export default function EventList({ events }: { events: EventItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <ul className="ev-list" data-active={active + 1}>
      {events.slice(0, SLOT_CLASS.length).map((e, i) => (
        <li key={e.slug} className={`ev ${SLOT_CLASS[i]}${i === active ? " is-active" : ""}`}>
          <a
            href="#events"
            aria-label={e.title}
            onClick={(ev) => {
              if (i !== active && window.matchMedia("(hover: none)").matches) {
                ev.preventDefault();
                setActive(i);
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
