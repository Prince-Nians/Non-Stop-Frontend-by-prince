const SOCIALS = [
  { name: "Facebook", icon: "icon-facebook", cls: "fb" },
  { name: "YouTube", icon: "icon-youtube", cls: "yt" },
  { name: "LinkedIn", icon: "icon-linkedin", cls: "in" },
  { name: "Twitter", icon: "icon-twitter", cls: "tw" },
];

export default function Footer() {
  return (
    <footer className="ftr" id="contact">
      <div className="ftr-canvas">
        <nav className="ftr-quick" aria-label="Quick links">
          <h2 className="ftr-h">Quick Links</h2>
          <i className="ftr-accent" />
          <ul className="ftr-links">
            <li className="l1"><a href="#top">Home</a></li>
            <li className="l2"><a href="#blogs">Blogs</a></li>
            <li className="l3"><a href="#about">About us</a></li>
            <li className="l4"><a href="#partner">Partnerships</a></li>
            <li className="l5"><a href="#products">Products</a></li>
            <li className="l6"><a href="#contact">contact us</a></li>
            <li className="l7"><a href="#events">Events</a></li>
          </ul>
        </nav>

        <div className="ftr-contact">
          <h2 className="ftr-h">Contact Us</h2>
          <i className="ftr-accent" />
          <p className="ftr-c ftr-c-phone">
            <img src="/figma/icon-phone.svg" alt="" aria-hidden />
            <a href="tel:+910000000000">Contact No.</a>
          </p>
          <p className="ftr-c ftr-c-mail">
            <img src="/figma/icon-email.svg" alt="" aria-hidden />
            <a href="mailto:info@nonstop.example">Email</a>
          </p>
        </div>

        <div className="ftr-follow">
          <h2 className="ftr-h ftr-h-sm">Follow us</h2>
          <i className="ftr-accent" />
          <ul className="ftr-social">
            {SOCIALS.map((s) => (
              <li key={s.name} className={s.cls}>
                <a href="#top" aria-label={s.name}>
                  <img className="ftr-circle" src="/figma/social-circle.svg" alt="" aria-hidden />
                  <img className="ftr-ico" src={`/figma/${s.icon}.svg`} alt="" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img className="ftr-line" src="/figma/footer-line.svg" alt="" aria-hidden />
        <p className="ftr-copy">© 2026 NON Stop. All Rights Reserved </p>
        <p className="ftr-legal">
          <a href="#top">Disclaimer</a>
          <span>|</span>
          <a href="#top">Privacy Policy</a>
          <span>|</span>
          <a href="#top">Site Map</a>
        </p>
      </div>
    </footer>
  );
}
