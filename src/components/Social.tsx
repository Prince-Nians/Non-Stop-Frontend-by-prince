export default function Social() {
  return (
    <section className="social" id="social" aria-labelledby="social-title">
      <img className="social-bg" src="/figma/social-bg.png" alt="" />
      <div className="social-canvas">
        <h2 id="social-title" className="sec-title social-title">
          Social Media Handle
        </h2>
        <p className="social-desc">
          {" "}
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
          rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </p>

        <div className="social-photos">
          <div className="sp sp-1">
            <div>
              <img src="/figma/social-photo-1.png" alt="NON STOP community photo" />
            </div>
          </div>
          <div className="sp sp-2">
            <div>
              <img src="/figma/social-photo-2.png" alt="NON STOP community photo" />
            </div>
          </div>
          <div className="sp sp-3">
            <div>
              <img src="/figma/social-photo-3.png" alt="NON STOP community photo" />
            </div>
          </div>
        </div>

        <p className="social-copy">
          Lorem ipsum dolor sit amet consectetur. A eleifend turpis sed orci est amet. Urna nulla ut nunc in fusce a.
          Lacinia nulla sapien malesuada amet tortor cras ut sapien. Metus nibh facilisis sed pellentesque adipiscing
          venenatis faucibus nisi pellentesque adipiscing venenatis faucibus nisi
        </p>
        <a href="#social" className="social-btn">
          Read More
        </a>
      </div>
    </section>
  );
}
