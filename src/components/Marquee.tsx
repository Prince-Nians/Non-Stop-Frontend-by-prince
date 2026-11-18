import XMark from "./XMark";

/** The lime scrolling strip ("MAXIMUM EFFECT ⊗ NONSTOP ENERGY ⊗ …"). Purely decorative, so it is hidden from screen readers. */
export default function Marquee({ phrases }: { phrases: string[] }) {
  const words = phrases.length ? phrases : ["MAXIMUM EFFECT", "NONSTOP ENERGY"];
  // One block is wider than any screen; the track holds two identical blocks and slides by exactly one.
  const block = (suffix: string) => (
    <div className="mq-block" key={suffix}>
      {Array.from({ length: 6 }).flatMap((_, r) =>
        words.map((w, i) => (
          <span className="mq-unit" key={`${suffix}-${r}-${i}`}>
            <span className="mq-text">{w}</span>
            <XMark />
          </span>
        )),
      )}
    </div>
  );

  return (
    <section className="marquee" aria-hidden>
      <div className="mq-track">
        {block("a")}
        {block("b")}
      </div>
    </section>
  );
}
