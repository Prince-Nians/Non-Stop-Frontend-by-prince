const FLAVOURS = [
  { name: "Classic", color: "#053588", border: "#74c5e3", bg: "blue-bg", can: "blue-can", cls: "p-blue" },
  { name: "Jungle", color: "#9dc96c", border: "#9dc96c", bg: "green-bg", can: "green-can", cls: "p-green" },
  { name: "Boost", color: "#7566ff", border: "#872062", bg: "purple-bg", can: "purple-can", cls: "p-purple" },
  { name: "Zero Sugar", color: "#007eb9", border: "#83cfe3", bg: "zero-sugar-bg", can: "zero-sugar-can", cls: "p-zero" },
];

// Figma card order (left → right): blue, green, purple, zero sugar.
const ORDER = [0, 1, 2, 3];

export default function Products() {
  return (
    <section className="prod" id="products" aria-labelledby="products-title">
      <div className="prod-canvas">
        <h2 id="products-title" className="sec-title prod-title">
          Our Products
        </h2>
        <p className="prod-desc">
          {" "}
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
          rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. consequat massa
          quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </p>

        <ul className="prod-cards">
          {ORDER.map((i) => {
            const f = FLAVOURS[i];
            return (
              <li key={f.name} className={`prod-card ${f.cls}`} style={{ "--bc": f.border } as React.CSSProperties}>
                <img className="prod-card-bg" src={`/figma/${f.bg}.png`} alt="" />
                <img className="prod-card-can" src={`/figma/${f.can}.png`} alt={`NON STOP ${f.name} can`} />
                <a href="#products" className="prod-btn" style={{ background: f.color }}>
                  Explore Flavour
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
