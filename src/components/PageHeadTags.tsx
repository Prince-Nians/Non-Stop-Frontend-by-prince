import type { PageSeo } from "@/lib/content";

/**
 * The extra tags an editor added in the CMS "SEO" tab: custom <meta> tags and structured data (JSON-LD).
 * React 19 moves <meta> tags rendered here into the page's <head> automatically.
 */
export default function PageHeadTags({ seo }: { seo?: PageSeo }) {
  if (!seo) return null;
  return (
    <>
      {seo.custom_meta?.map((t, i) => {
        if (t.attr === "property") return <meta key={i} property={t.name} content={t.content} />;
        if (t.attr === "http-equiv") return <meta key={i} httpEquiv={t.name} content={t.content} />;
        return <meta key={i} name={t.name} content={t.content} />;
      })}
      {seo.json_ld && (
        // The API only sends valid JSON; "<" is escaped so the data can never close the script tag early.
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seo.json_ld.replace(/</g, "\\u003c") }} />
      )}
    </>
  );
}
