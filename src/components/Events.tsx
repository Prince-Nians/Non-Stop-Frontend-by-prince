const EVENTS = [
  { cls: "ev-1", img: "event-1", text: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus", fade: true },
  { cls: "ev-2", img: "event-2", text: "", fade: false },
  { cls: "ev-3", img: "event-1", text: "", fade: false },
];

export default function Events() {
  return (
    <section className="events" id="events" aria-labelledby="events-title">
      <div className="events-canvas">
        <h2 id="events-title" className="sec-title events-title">
          Event &amp; Webinars
        </h2>
        <p className="events-desc">
          {" "}
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
          rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium consequat massa
          quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium
        </p>

        <ul className="ev-list">
          {EVENTS.map((e) => (
            <li key={e.cls} className={`ev ${e.cls}`}>
              <a href="#events" aria-label="Open event">
                <img className="ev-img" src={`/figma/${e.img}.png`} alt="" />
                {e.fade && <span className="ev-fade" aria-hidden />}
                {e.text && <span className="ev-text">{e.text}</span>}
                <img className="ev-arrow" src="/figma/arrow-right.svg" alt="" aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        <a href="#events" className="events-btn">
          Read More
        </a>
      </div>
    </section>
  );
}
