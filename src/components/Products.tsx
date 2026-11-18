import type { Product, Section } from "@/lib/content";
import { Lines } from "@/lib/format";
import ProductsReveal from "./ProductsReveal";

// Card slots in the Figma layout (left → right). The design has room for four.
const SLOT_CLASS = ["p-blue", "p-green", "p-purple", "p-zero"];

export default function Products({ section, products }: { section: Section; products: Product[] }) {
  return (
    <section className="prod" id="products" aria-labelledby="products-title">
      <div className="prod-canvas">
        <h2 id="products-title" className="sec-title prod-title">
          {section.title}
        </h2>
        <p className="prod-desc">
          <Lines text={section.description} />
        </p>

        <ul className="prod-cards">
          {products.slice(0, SLOT_CLASS.length).map((f, i) => (
            <li key={f.slug} className={`prod-card ${SLOT_CLASS[i]}`} style={{ "--bc": f.border_color } as React.CSSProperties}>
              {f.background_image && <img className="prod-card-bg" src={f.background_image} alt="" />}
              {f.can_image && <img className="prod-card-can" src={f.can_image} alt={`NON STOP ${f.name} can`} />}
              <a href={f.button.url ?? "#products"} className="prod-btn" style={{ background: f.color }}>
                {f.button.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={section.button?.url ?? "#about"} className="prod-more">
          {section.button?.label ?? "Learn More"}
        </a>
      </div>
      <ProductsReveal />
    </section>
  );
}
