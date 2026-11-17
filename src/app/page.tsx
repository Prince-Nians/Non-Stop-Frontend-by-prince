import { getHome } from "@/lib/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import PartnerBand from "@/components/PartnerBand";
import About from "@/components/About";
import Social from "@/components/Social";
import Events from "@/components/Events";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import ParallaxScroll from "@/components/ParallaxScroll";
import TouchReveal from "@/components/TouchReveal";
import { makeLabels } from "@/lib/labels";

export default async function Home() {
  const home = await getHome();
  const labels = makeLabels(home.sections.labels?.extra);
  const assets = home.assets;
  return (
    <div className="page" id="top">
      <Header settings={home.settings} nav={home.nav.header} shops={home.shops} products={home.products} labels={labels} />
      <main>
        <Hero section={home.sections.hero} slides={home.hero_slides ?? []} assets={assets} labels={labels} />
        <Products section={home.sections.products} products={home.products} />
        <PartnerBand section={home.sections.partner} shops={home.shops} assets={assets} labels={labels} />
        <About section={home.sections.about} points={home.about_points} slides={home.about_slides ?? []} assets={assets} labels={labels} />
        <Social section={home.sections.social} photos={home.social_photos} labels={labels} />
        <Events section={home.sections.events} events={home.events} />
        <Blogs section={home.sections.blogs} posts={home.blogs} assets={assets} />
      </main>
      <ParallaxScroll />
      <TouchReveal />
      <Footer settings={home.settings} footer={home.nav.footer} legal={home.nav.legal} texts={home.sections.footer?.extra} labels={labels} />
    </div>
  );
}
