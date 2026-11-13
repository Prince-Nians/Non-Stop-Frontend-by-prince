import type { Post, Section } from "@/lib/content";
import { Lines, formatDate } from "@/lib/format";

export default function Blogs({ section, posts }: { section: Section; posts: Post[] }) {
  const main = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== main).slice(0, 4);

  return (
    <section className="blogs" id="blogs" aria-labelledby="blogs-title">
      <img className="blogs-bg" src={section.image ?? "/figma/blogs-bg.png"} alt="" />
      <div className="blogs-canvas">
        <h2 id="blogs-title" className="sec-title blogs-title">
          {section.title}
        </h2>
        <p className="blogs-desc">{section.description}</p>

        {main && (
          <article className="blog-main">
            {main.image && <img className="blog-main-img" src={main.image} alt="" />}
            <p className="blog-main-date">{formatDate(main.published_at)}</p>
            <h3 className="blog-main-title">{main.title}</h3>
            <p className="blog-main-copy">{main.excerpt}</p>
          </article>
        )}

        <ul className="blog-list">
          {rest.map((p, i) => (
            <li key={p.slug} className={`blog-row blog-row-${i + 1}`}>
              <a href="#blogs">
                <span className="blog-thumb">{p.thumbnail && <img src={p.thumbnail} alt="" />}</span>
                <span className="blog-tag">{p.tag ?? "Blog"}</span>
                <span className="blog-title">{p.title}</span>
                <span className="blog-excerpt">
                  <Lines text={p.excerpt} className="" />
                </span>
                <span className="blog-date">{formatDate(p.published_at)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <img className="strip strip-blogs" src="/figma/checker-blogs.svg" alt="" aria-hidden />
    </section>
  );
}
