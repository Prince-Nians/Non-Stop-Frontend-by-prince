export default function PartnerBand() {
  return (
    <section className="band" id="partner" aria-label="Buy now and partner program">
      <img className="band-bg" src="/figma/products-bg.png" alt="" />
      <div className="band-canvas">
        <div className="band-col band-buy">
          <div className="band-frame band-frame-l">
            <img src="/figma/partner-frame-left.svg" alt="" aria-hidden />
          </div>
          <h2 className="band-buy-title">BUY NOW</h2>
          <ul className="band-shops">
            <li className="band-shop band-shop-jio">
              <img src="/figma/jiomart.png" alt="JioMart" />
            </li>
            <li className="band-shop band-shop-zepto">
              <img src="/figma/zepto.png" alt="Zepto" />
            </li>
            <li className="band-shop band-shop-blinkit">
              <img src="/figma/blinkit.png" alt="Blinkit" />
            </li>
          </ul>
          <img className="band-vec" src="/figma/partner-vec-3.svg" alt="" aria-hidden />
        </div>

        <div className="band-col band-partner">
          <div className="band-frame band-frame-r">
            <img src="/figma/partner-frame-right.svg" alt="" aria-hidden />
          </div>
          <p className="band-eyebrow">PARTNER PROGRAM</p>
          <h2 className="band-partner-title">BECOME A PARTNER</h2>
          <p className="band-partner-copy">
            Lorem ipsum dolor sit amet consectetur. A eleifend turpis sed orci est amet Urna nulla ut nunc in fusce a.
            Lacinia nulla sapien malesuada
          </p>
          <a href="#partner" className="band-btn">
            Know More
          </a>
        </div>
      </div>
      <img className="strip strip-band" src="/figma/checker-products.svg" alt="" aria-hidden />
    </section>
  );
}
