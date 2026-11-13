import type { Section } from "@/lib/content";

const RIBBON_A = [
  { x: -127.56, y: 2233.91 },
  { x: 173.21, y: 2264.32 },
  { x: 473.98, y: 2294.73 },
  { x: 774.75, y: 2325.13 },
  { x: 1075.52, y: 2355.54 },
  { x: 1376.29, y: 2385.94 },
];

const RIBBON_B = [
  { x: -103.64, y: 2447.4, w: 206.03, h: 78.93 },
  { x: 194.39, y: 2396.74, w: 206.03, h: 78.93 },
  { x: 492.42, y: 2346.08, w: 206.03, h: 78.93 },
  { x: 790.45, y: 2295.43, w: 206.03, h: 78.93 },
  { x: 1088.48, y: 2254.78, w: 147.11, h: 68.92 },
  { x: 1386.5, y: 2194.11, w: 206.03, h: 78.93 },
];

// Section top in the Figma frame — used to turn frame coordinates into section-relative ones.
const TOP = 1888;

export default function About({ section, points }: { section: Section; points: { title: string; body: string | null }[] }) {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-canvas">
        <h2 id="about-title" className="sec-title about-title">
          {section.title}
        </h2>
        <p className="about-desc">{section.description}</p>

        <div className="about-art">
        <div className="about-stage">
        <div className="ribbons" aria-hidden>
          <div className="ribbon ribbon-a">
            <div className="ribbon-bar ribbon-bar-a" />
          </div>
          {RIBBON_A.map((t, i) => (
            <div
              key={`a${i}`}
              className="ribbon-txt ribbon-txt-a"
              style={{ "--x": t.x, "--y": t.y - TOP } as React.CSSProperties}
            >
              <p>NON STOP</p>
            </div>
          ))}
          <div className="ribbon ribbon-b">
            <div className="ribbon-bar ribbon-bar-b" />
          </div>
          {RIBBON_B.map((t, i) => (
            <div
              key={`b${i}`}
              className="ribbon-txt ribbon-txt-b"
              style={{ "--x": t.x, "--y": t.y - TOP, "--w": t.w, "--h": t.h } as React.CSSProperties}
            >
              <p>NON STOP</p>
            </div>
          ))}
        </div>

        <div className="about-can">
          <div>
            <img src={section.image ?? "/figma/about-can.png"} alt="NON STOP Classic can" />
          </div>
        </div>
        </div>
        </div>

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
      <img className="strip strip-about" src="/figma/checker-social.svg" alt="" aria-hidden />
    </section>
  );
}
