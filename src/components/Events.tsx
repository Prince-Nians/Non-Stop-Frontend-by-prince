import type { EventItem, Section } from "@/lib/content";
import EventList from "./EventList";
import { Lines } from "@/lib/format";

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

        <EventList events={events} />

        {section.button && (
          <a href={section.button.url ?? "#events"} className="events-btn">
            {section.button.label}
          </a>
        )}
      </div>
    </section>
  );
}
