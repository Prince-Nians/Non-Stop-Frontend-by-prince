"use client";

import { useId, useState } from "react";

/** FAQ accordion: one answer open at a time, the first one open on load. */
export default function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="c-faq-list">
      {items.map((it, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={i} className={`c-faq-item${isOpen ? " is-open" : ""}`}>
            <h3 className="c-faq-q">
              <button type="button" aria-expanded={isOpen} aria-controls={`${id}-a`} id={`${id}-q`} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="c-faq-qtext">
                  {i + 1}. {it.question}
                </span>
                <span className="c-faq-icon" aria-hidden />
              </button>
            </h3>
            <div className="c-faq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
              <div className="c-faq-a-in">
                <p>{it.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
