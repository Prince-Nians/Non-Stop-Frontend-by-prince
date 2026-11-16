import type { HomeContent, Link } from "@/lib/content";
import type { Labels } from "@/lib/labels";

const SOCIALS = [
  { name: "Facebook", key: "facebook", icon: "icon-facebook", cls: "fb" },
  { name: "YouTube", key: "youtube", icon: "icon-youtube", cls: "yt" },
  { name: "LinkedIn", key: "linkedin", icon: "icon-linkedin", cls: "in" },
  { name: "X", key: "twitter", icon: "icon-x", cls: "tw" },
] as const;

export default function Footer({
  settings,
  footer,
  legal,
  texts,
  labels,
}: {
  settings: HomeContent["settings"];
  footer: Link[];
  legal: Link[];
  texts?: Record<string, string>;
  labels: Labels;
}) {
  return (
    <footer className="ftr" id="contact">
      <div className="ftr-canvas">
        <nav className="ftr-quick" aria-label={labels.quick_links_nav}>
          <h2 className="ftr-h">{texts?.quick_links_title ?? "Quick Links"}</h2>
          <i className="ftr-accent" />
          <ul className="ftr-links">
            {footer.slice(0, 7).map((l, i) => (
              <li key={l.label} className={`l${i + 1}`}>
                <a href={l.url}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ftr-contact">
          <h2 className="ftr-h">{texts?.contact_title ?? "Contact Us"}</h2>
          <i className="ftr-accent" />
          <p className="ftr-c ftr-c-phone">
            <img src="/figma/icon-phone.svg" alt="" aria-hidden />
            <a href={`tel:${(settings.phone ?? "").replace(/[^+\d]/g, "")}`}>{settings.phone ?? "Contact No."}</a>
          </p>
          <p className="ftr-c ftr-c-mail">
            <img src="/figma/icon-email.svg" alt="" aria-hidden />
            <a href={`mailto:${settings.email ?? ""}`}>{settings.email ?? "Email"}</a>
          </p>
        </div>

        <div className="ftr-follow">
          <h2 className="ftr-h ftr-h-sm">{texts?.follow_title ?? "Follow us"}</h2>
          <i className="ftr-accent" />
          <ul className="ftr-social">
            {SOCIALS.map((s) => (
              <li key={s.name} className={s.cls}>
                <a href={settings.social[s.key] || "#top"} aria-label={s.name}>
                  <img className="ftr-circle" src="/figma/social-circle.svg" alt="" aria-hidden />
                  <img className="ftr-ico" src={`/figma/${s.icon}.svg`} alt="" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img className="ftr-line" src="/figma/footer-line.svg" alt="" aria-hidden />
        <p className="ftr-copy">{settings.copyright}</p>
        <p className="ftr-legal">
          {legal.map((l, i) => (
            <span key={l.label} style={{ display: "contents" }}>
              {i > 0 && <span>|</span>}
              <a href={l.url}>{l.label}</a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
