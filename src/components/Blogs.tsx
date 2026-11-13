const POSTS = [
  { title: "Flavor & Product Launches" },
  { title: "Market Trends" },
  { title: "Health & Safety" },
  { title: "Regional Guides" },
];

export default function Blogs() {
  return (
    <section className="blogs" id="blogs" aria-labelledby="blogs-title">
      <img className="blogs-bg" src="/figma/blogs-bg.png" alt="" />
      <div className="blogs-canvas">
        <h2 id="blogs-title" className="sec-title blogs-title">
          Blogs
        </h2>
        <p className="blogs-desc">
          {" "}
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
          rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. at massa quis
          enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
        </p>

        <article className="blog-main">
          <img className="blog-main-img" src="/figma/blog-main.png" alt="" />
          <p className="blog-main-date">Published Date</p>
          <h3 className="blog-main-title">Ingredient Breakdowns</h3>
          <p className="blog-main-copy">
            Lorem ipsum dolor sit amet consectetur. A eleifend turpis sed orci est amet. Urna nulla ut nunc in fusce a
          </p>
        </article>

        <ul className="blog-list">
          {POSTS.map((p, i) => (
            <li key={p.title} className={`blog-row blog-row-${i + 1}`}>
              <a href="#blogs">
                <span className="blog-thumb">
                  <img src="/figma/blog-thumb.png" alt="" />
                </span>
                <span className="blog-tag">Blog</span>
                <span className="blog-title">{p.title}</span>
                <span className="blog-excerpt">
                  Lorem ipsum dolor sit amet consectetur. A eleifend turpis sed orci
                  <br />
                  est amet. Urna nulla ut nunc in fusce a.
                </span>
                <span className="blog-date">Published Date</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <img className="strip strip-blogs" src="/figma/checker-blogs.svg" alt="" aria-hidden />
    </section>
  );
}
