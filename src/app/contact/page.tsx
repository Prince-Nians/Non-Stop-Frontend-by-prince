import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import Faq from "@/components/contact/Faq";
import { assetSrc } from "@/lib/assets";
import { getHome } from "@/lib/content";
import { makeLabels } from "@/lib/labels";

export async function generateMetadata(): Promise<Metadata> {
  const { sections, settings } = await getHome();
  return { title: `${sections.contact_hero?.title ?? "Contact Us"} — ${settings.site_name}` };
}

export default async function ContactPage() {
  const home = await getHome();
  const labels = makeLabels(home.sections.labels?.extra);
  const { sections, settings, assets } = home;
  const hero = sections.contact_hero;
  const info = sections.contact_info;
  const form = sections.contact_form;
  const faq = sections.faq;
  const phrases = (sections.marquee?.extra?.phrases ?? "").split("|").map((s) => s.trim()).filter(Boolean);
  const faqs = home.faqs ?? [];
  const overlay = Math.max(0, Math.min(100, Number(hero?.extra?.overlay_percent ?? 0) || 0));

  return (
    <div className="page" id="top">
      <Header settings={settings} nav={home.nav.header} shops={home.shops} labels={labels} />
      <main>
        <section className="c-hero" aria-labelledby="contact-title" style={{ "--shade": overlay / 100 } as React.CSSProperties}>
          <img className="c-hero-bg" src={hero?.image ?? "/figma/contact-hero.png"} alt="" />
          <div className="c-hero-shade" aria-hidden />
          <h1 id="contact-title" className="c-hero-title">
            {hero?.title ?? "CONTACT US"}
          </h1>
        </section>

        <Marquee phrases={phrases} />

        <section className="c-body" aria-label={info?.title ?? "Contact information"}>
          <div className="c-body-canvas">
            {info && <ContactInfo section={info} settings={settings} />}
            <ContactForm texts={form?.extra ?? {}} buttonLabel={form?.button?.label ?? "Submit Now"} />
          </div>
          <img className="c-checker" src={assetSrc(assets, "strip_hero")} alt="" aria-hidden />
        </section>

        {faqs.length > 0 && (
          <section className="c-faq" aria-labelledby="faq-title">
            <img className="c-faq-bg" src={assets?.faq_pattern?.image ?? "/figma/blogs-bg.png"} alt="" aria-hidden />
            <div className="c-faq-canvas">
              <h2 id="faq-title" className="c-faq-title">
                {faq?.title ?? "Frequently Asked Questions"}
              </h2>
              {faq?.description && <p className="c-faq-sub">{faq.description}</p>}
              <Faq items={faqs} />
            </div>
          </section>
        )}

        <Marquee phrases={phrases} />
      </main>
      <Footer settings={settings} footer={home.nav.footer} legal={home.nav.legal} texts={sections.footer?.extra} labels={labels} />
    </div>
  );
}
