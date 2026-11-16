import type { Section } from "@/lib/content";
import SocialPhotos from "./SocialPhotos";

export default function Social({
  section,
  photos,
}: {
  section: Section;
  photos: { image: string | null; alt: string | null; url: string | null; instagram_url: string | null; video: string | null }[];
}) {
  return (
    <section className="social" id="social" aria-labelledby="social-title">
      <img className="social-bg" src={section.image ?? "/figma/social-bg.png"} alt="" />
      <div className="social-canvas">
        <h2 id="social-title" className="sec-title social-title">
          {section.title}
        </h2>
        <p className="social-desc">{section.description}</p>

        <SocialPhotos photos={photos} />

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
