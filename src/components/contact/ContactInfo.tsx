import type { HomeContent, Section } from "@/lib/content";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="c-ico" aria-hidden>
      <svg viewBox="0 0 24 24">{children}</svg>
    </span>
  );
}

/** Left column of the blue section: heading, intro and the email / phone / address card. */
export default function ContactInfo({ section, settings }: { section: Section; settings: HomeContent["settings"] }) {
  const x = section.extra ?? {};
  const tel = (settings.phone ?? "").replace(/[^+\d]/g, "");
  return (
    <div className="c-info">
      <h2 className="c-info-title">{section.title}</h2>
      <p className="c-info-text">{section.description}</p>

      <ul className="c-card">
        <li className="c-row">
          <Icon>
            <path d="M3 6.5A1.5 1.5 0 014.5 5h15A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11zm2.2.5l6.8 5.1L18.8 7H5.2z" />
          </Icon>
          <span className="c-row-text">
            <span className="c-row-label">{x.email_label ?? "Email:"}</span>
            <a className="c-row-value" href={`mailto:${settings.email ?? ""}`}>
              {settings.email ?? ""}
            </a>
          </span>
        </li>
        <li className="c-row">
          <Icon>
            <path d="M6.6 3.5l2.6.4a1 1 0 01.8.7l.8 2.6a1 1 0 01-.3 1l-1.5 1.3a12 12 0 005.5 5.5l1.3-1.5a1 1 0 011-.3l2.6.8a1 1 0 01.7.8l.4 2.6a1 1 0 01-1 1.2C10.6 19 5 13.4 5.4 4.5a1 1 0 011.2-1z" />
          </Icon>
          <span className="c-row-text">
            <span className="c-row-label">{x.phone_label ?? "Phone number:"}</span>
            <a className="c-row-value" href={`tel:${tel}`}>
              {settings.phone ?? ""}
            </a>
          </span>
        </li>
        <li className="c-row">
          <Icon>
            <path d="M12 2.5a7 7 0 00-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </Icon>
          <span className="c-row-text">
            <span className="c-row-label">{x.location_label ?? "Location:"}</span>
            <span className="c-row-value">{settings.address ?? ""}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
