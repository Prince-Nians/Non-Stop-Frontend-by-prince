import type { EventItem, Section } from "@/lib/content";
import { Lines } from "@/lib/format";

// The Figma design has three event slots; only the first shows a caption over the photo.
const SLOT_CLASS = ["ev-1", "ev-2", "ev-3"];

export default function Events({ section, events }: { section: Section; events: EventItem[] }) {
  return (
    <section className="events" id="events" aria-labelledby="events-title">
      <div className="events-canvas">
        <h2 id="events-title" className="sec-title events-title">
          {section.title}
        </h2>
        <p className="events-desc">
          <Lines text={section.description} />
        </p>

        <ul className="ev-list">
          {events.slice(0, SLOT_CLASS.length).map((e, i) => (
            <li key={e.slug} className={`ev ${SLOT_CLASS[i]}`}>
              <a href="#events" aria-label={e.title}>
                {e.image && <img className="ev-img" src={e.image} alt="" />}
                {i === 0 && <span className="ev-fade" aria-hidden />}
                {i === 0 && <span className="ev-text">{e.title}</span>}
                <img className="ev-arrow" src="/figma/arrow-right.svg" alt="" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        {section.button && (
          <a href={section.button.url ?? "#events"} className="events-btn">
            {section.button.label}
          </a>
        )}
      </div>
    </section>
  );
}
