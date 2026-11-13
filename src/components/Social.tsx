import type { Section } from "@/lib/content";

export default function Social({
  section,
  photos,
}: {
  section: Section;
  photos: { image: string | null; alt: string | null; url: string | null }[];
}) {
  return (
    <section className="social" id="social" aria-labelledby="social-title">
      <img className="social-bg" src={section.image ?? "/figma/social-bg.png"} alt="" />
      <div className="social-canvas">
        <h2 id="social-title" className="sec-title social-title">
          {section.title}
        </h2>
        <p className="social-desc">{section.description}</p>

        <div className="social-photos">
          {photos.slice(0, 3).map(
            (p, i) =>
              p.image && (
                <div key={p.image} className={`sp sp-${i + 1}`}>
                  <div>
                    <img src={p.image} alt={p.alt ?? "NON STOP community photo"} />
                  </div>
                </div>
              ),
          )}
        </div>

        <p className="social-copy">{section.extra.copy}</p>
        {section.button && (
          <a href={section.button.url ?? "#social"} className="social-btn">
            {section.button.label}
          </a>
        )}
      </div>
    </section>
  );
}
