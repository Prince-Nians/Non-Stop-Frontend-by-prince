import { shopLinkProps } from "@/lib/shops";
import type { Section, Shop } from "@/lib/content";

const SHOP_CLASS: Record<string, string> = { jiomart: "band-shop-jio", zepto: "band-shop-zepto", blinkit: "band-shop-blinkit" };

export default function PartnerBand({ section, shops }: { section: Section; shops: Shop[] }) {
  return (
    <section className="band" id="partner" aria-label="Buy now and partner program">
      <div className="px-clip">
        <img className="band-bg" src={section.image ?? "/figma/products-bg.png"} alt="" />
      </div>
      <div className="band-canvas">
        <div className="band-col band-buy">
          <div className="band-frame band-frame-l">
            <img src="/figma/partner-frame-left.svg" alt="" aria-hidden />
          </div>
          <h2 className="band-buy-title">{section.extra.buy_now_title ?? "BUY NOW"}</h2>
          <ul className="band-shops">
            {shops
              .filter((shop) => SHOP_CLASS[shop.slug])
              .map((shop) => (
                <li key={shop.slug} className={`band-shop ${SHOP_CLASS[shop.slug]}`}>
                  <a href={shop.url} {...shopLinkProps} aria-label={`Buy on ${shop.name}`}>
                    {shop.logo && <img src={shop.logo} alt="" />}
                  </a>
                </li>
              ))}
          </ul>
          <img className="band-vec" src="/figma/partner-vec-3.svg" alt="" aria-hidden />
        </div>

        <div className="band-col band-partner">
          <div className="band-frame band-frame-r">
            <img src="/figma/partner-frame-right.svg" alt="" aria-hidden />
          </div>
          <p className="band-eyebrow">{section.subtitle}</p>
          <h2 className="band-partner-title">{section.title}</h2>
          <p className="band-partner-copy">{section.description}</p>
          {section.button && (
            <a href={section.button.url ?? "#partner"} className="band-btn">
              {section.button.label}
            </a>
          )}
        </div>
      </div>
      <img className="strip strip-band" src="/figma/checker-products.svg" alt="" aria-hidden />
    </section>
  );
}
